package methods

import (
	"fmt"

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
	SearchSpotify           *gqltag.Query    `gql:"searchSpotify(query: String): [MusicSource]"`
	RegisterSpotifyAuthCode *gqltag.Mutation `gql:"registerSpotifyAuthCode(userID: ID, code: String): ExternalCredential"`
}

var searchSpotify = gqltag.Method{
	Description: `[Search Spotify Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		return nil, nil
	},
}

func initExternalCredential(db *gorm.DB) *models.ExternalCredential {
	ec := &models.ExternalCredential{}
	ec.SetEntity(ec)
	ec.SetDB(db)
	return ec
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
