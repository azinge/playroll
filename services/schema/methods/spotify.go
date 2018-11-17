package methods

import (
	"fmt"

	"golang.org/x/oauth2"

	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/cazinge/playroll/services/utils"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	"github.com/mitchellh/mapstructure"
	"github.com/zmb3/spotify"
)

type SpotifyMethods struct {
	SearchSpotify           *gqltag.Query    `gql:"searchSpotify(query: String, searchType: String): [MusicSource]"`
	RegisterSpotifyAuthCode *gqltag.Mutation `gql:"registerSpotifyAuthCode(userID: ID, code: String): ExternalCredential"`
}

func initExternalCredential(db *gorm.DB) *models.ExternalCredential {
	ec := &models.ExternalCredential{}
	ec.SetEntity(ec)
	ec.SetDB(db)
	return ec
}

var searchSpotify = gqltag.Method{
	Description: `[Search Spotify Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		type searchSpotifyParams struct {
			Query      string
			SearchType string
		}
		params := &searchSpotifyParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		ec := &models.ExternalCredential{}
		if err = db.Where(&models.ExternalCredential{Provider: "Spotify", UserID: 1}).Last(ec).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}
		token := &oauth2.Token{}
		mapstructure.Decode(ec.Token, &token)
		client := spotify.NewAuthenticator("").NewClient(token)
		var searchResult *spotify.SearchResult
		switch params.SearchType {
		case "Track":
			searchResult, err = client.Search(params.Query, spotify.SearchTypeTrack)
		case "Album":
			searchResult, err = client.Search(params.Query, spotify.SearchTypeAlbum)
		case "Artist":
			searchResult, err = client.Search(params.Query, spotify.SearchTypeArtist)
		default:
			return nil, fmt.Errorf("Search Type Not Found")
		}
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		output := []jsonmodels.MusicSource{}
		switch params.SearchType {
		case "Track":
			for _, track := range searchResult.Tracks.Tracks {
				cover := "https://www.unesale.com/ProductImages/Large/notfound.png"
				if images := track.Album.Images; len(images) > 0 {
					cover = images[0].URL
				}
				ms := jsonmodels.MusicSource{
					Type:       "Track",
					Name:       fmt.Sprintf("%s - %s", track.Name, track.Artists[0].Name),
					Cover:      cover,
					Provider:   "Spotify",
					ProviderID: string(track.ID),
				}
				output = append(output, ms)
			}
		case "Album":
			for _, album := range searchResult.Albums.Albums {
				cover := "https://www.unesale.com/ProductImages/Large/notfound.png"
				if images := album.Images; len(images) > 0 {
					cover = images[0].URL
				}
				ms := jsonmodels.MusicSource{
					Type:       "Album",
					Name:       fmt.Sprintf("%s - %s", album.Name, album.Artists[0].Name),
					Cover:      cover,
					Provider:   "Spotify",
					ProviderID: string(album.ID),
				}
				output = append(output, ms)
			}
		case "Artist":
			for _, artist := range searchResult.Artists.Artists {
				cover := "https://www.unesale.com/ProductImages/Large/notfound.png"
				if images := artist.Images; len(images) > 0 {
					cover = images[0].URL
				}
				ms := jsonmodels.MusicSource{
					Type:       "Track",
					Name:       artist.Name,
					Cover:      cover,
					Provider:   "Spotify",
					ProviderID: string(artist.ID),
				}
				output = append(output, ms)
			}
		default:
			return nil, fmt.Errorf("Search Type Not Found")
		}
		return output, nil
	},
}

func formatExternalCredential(val interface{}, err error) (*models.ExternalCredentialOutput, error) {
	if err != nil {
		return nil, err
	}
	ec, ok := val.(*models.ExternalCredential)
	if !ok {
		return nil, fmt.Errorf("error converting to ExternalCredential")
	}
	return ec.ToOutput()
}

var registerSpotifyAuthCode = gqltag.Method{
	Description: `[Register Spotify Auth Code Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		type registerSpotifyAuthCodeParams struct {
			UserID string
			Code   string
		}
		params := &registerSpotifyAuthCodeParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		// TEMPORARY
		redirectURL := "http://localhost:8888/callback"
		spotifyScopes := []string{
			spotify.ScopeUserReadPrivate,
			spotify.ScopeUserLibraryRead,
			spotify.ScopeUserReadEmail,
			spotify.ScopePlaylistModifyPublic,
			spotify.ScopePlaylistModifyPrivate,
		}

		auth := spotify.NewAuthenticator(redirectURL, spotifyScopes...)
		url := auth.AuthURL("")
		fmt.Println(url)
		// TEMPORARY

		oauthToken, err := spotify.NewAuthenticator(redirectURL, spotifyScopes...).Exchange(params.Code)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		ec := initExternalCredential(db)
		externalCredential := &models.ExternalCredential{
			Provider: "Spotify",
			UserID:   utils.StringIDToNumber(params.UserID),
			Token: jsonmodels.Token{
				AccessToken:  oauthToken.AccessToken,
				RefreshToken: oauthToken.RefreshToken,
				TokenType:    oauthToken.TokenType,
				Expiry:       oauthToken.Expiry,
			},
		}
		return formatExternalCredential(ec.Create(externalCredential))
	},
}

var LinkedSpotifyMethods = SpotifyMethods{
	SearchSpotify:           gqltag.LinkQuery(searchSpotify),
	RegisterSpotifyAuthCode: gqltag.LinkMutation(registerSpotifyAuthCode),
}
