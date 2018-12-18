package methods

import (
	"encoding/json"
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
	GeneratePlaylist        *gqltag.Mutation `gql:"generatePlaylist(tracklistID: ID, playlistName: String): [String]"`
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

		if params.Query == "" {
			return []jsonmodels.MusicSource{}, nil
		}

		ec := &models.ExternalCredential{}
		if err = db.Where(&models.ExternalCredential{Provider: "Spotify", UserID: 1}).Last(ec).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}
		eco, err := ec.ToOutput()
		if err != nil {
			fmt.Println("Error creating output object for External Credential: ", err.Error())
			return nil, err
		}
		token := &eco.Token

		redirectURL := "http://localhost:8888/callback"
		spotifyScopes := []string{
			spotify.ScopeUserReadPrivate,
			spotify.ScopeUserLibraryRead,
			spotify.ScopeUserReadEmail,
			spotify.ScopePlaylistModifyPublic,
			spotify.ScopePlaylistModifyPrivate,
		}

		client := spotify.NewAuthenticator(redirectURL, spotifyScopes...).NewClient(token)
		token, err = client.Token()
		if err != nil {
			fmt.Println("Error fetching token: ", err.Error())
			return nil, err
		}

		ec2 := models.InitExternalCredentialDAO(db)
		ec.Token, err = json.Marshal(token)

		ec2.Update(ec)

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
					Type:       "Artist",
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

		if params.Code == "" {
			return nil, fmt.Errorf(fmt.Sprintf("Please log in: " + url))
		}

		oauthToken, err := spotify.NewAuthenticator(redirectURL, spotifyScopes...).Exchange(params.Code)

		fmt.Printf("Recieved Token: %#v\n", oauthToken)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		t2 := &oauth2.Token{}

		b, e := json.Marshal(oauthToken)
		fmt.Println(e)
		json.Unmarshal(b, t2)
		fmt.Printf("Translated Token: %#v\n", t2)

		ec := models.InitExternalCredentialDAO(db)
		externalCredential := &models.ExternalCredential{
			Provider: "Spotify",
			UserID:   utils.StringIDToNumber(params.UserID),
			Token:    b,
		}

		fmt.Printf("Saved Token: %#v\n", externalCredential)

		rawExternalCredential, err := ec.Create(externalCredential)
		if err != nil {
			return nil, err
		}
		return models.FormatExternalCredential(rawExternalCredential)
	},
}

var generatePlaylist = gqltag.Method{
	Description: `[Generate Playlist Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		type generatePlaylistParams struct {
			TracklistID  string
			PlaylistName string
		}
		params := &generatePlaylistParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.TracklistID)
		compiledRolls := []models.CompiledRoll{}
		if err = db.Where(&models.CompiledRoll{TracklistID: id}).Find(&compiledRolls).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		tracks := []jsonmodels.MusicSource{}
		for _, compiledRoll := range compiledRolls {
			compiledRollOutput, err := compiledRoll.ToOutput()
			if err != nil {
				fmt.Println(err)
				return nil, err
			}
			tracks = append(tracks, compiledRollOutput.Data.Tracks...)
		}

		trackIDs := []spotify.ID{}
		for _, track := range tracks {
			trackIDs = append(trackIDs, spotify.ID(track.ProviderID))
		}

		ec := &models.ExternalCredential{}
		if err = db.Where(&models.ExternalCredential{Provider: "Spotify", UserID: 1}).Last(ec).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}
		eco, err := ec.ToOutput()
		if err != nil {
			fmt.Println("Error fetching token: ", err.Error())
			return nil, err
		}
		client := spotify.NewAuthenticator("").NewClient(&eco.Token)
		token, err := client.Token()
		if err != nil {
			fmt.Println("Error fetching token: ", err.Error())
			return nil, err
		}

		ec2 := models.InitExternalCredentialDAO(db)
		ec.Token, err = json.Marshal(token)

		ec2.Update(ec)

		user, err := client.CurrentUser()
		if err != nil {
			fmt.Println("Error fetching user: ", err.Error())
			return nil, err
		}
		playlist, err := client.CreatePlaylistForUser(user.ID, "Playroll: "+params.PlaylistName, "", true)
		if err != nil {
			fmt.Println("Error creating playlist for user: ", err.Error())
			return nil, err
		}
		_, err = client.AddTracksToPlaylist(playlist.ID, trackIDs...)
		if err != nil {
			fmt.Println("Error adding songs for user: ", err.Error())
			return nil, err
		}
		return trackIDs, nil
	},
}

var LinkedSpotifyMethods = SpotifyMethods{
	SearchSpotify:           gqltag.LinkQuery(searchSpotify),
	RegisterSpotifyAuthCode: gqltag.LinkMutation(registerSpotifyAuthCode),
	GeneratePlaylist:        gqltag.LinkMutation(generatePlaylist),
}
