package admin

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"

	spotifyhelpers "github.com/cazinge/playroll/services/music_services/spotify"
)

type SpotifyMethods struct {
	RegisterSpotifyAuthCodeForUser *gqltag.Mutation `gql:"registerSpotifyAuthCodeForUser(userID: ID, code: String, devMode: Boolean): MusicServiceCredential"`
}

var registerSpotifyAuthCodeForUser = gqltag.Method{
	Description: `[Register Spotify Auth Code For User Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		type registerSpotifyAuthCodeParams struct {
			UserID  string
			Code    string
			DevMode bool
		}
		params := &registerSpotifyAuthCodeParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		userID := utils.StringIDToNumber(params.UserID)

		ec, err := spotifyhelpers.RegisterSpotifyAuthCodeForUser(userID, params.Code, mctx.DB, params.DevMode)
		if err != nil {
			fmt.Println("Error Registering Spotify Auth Code for User: ", err.Error())
			return nil, err
		}
		return ec, nil
	},
}

var LinkedSpotifyMethods = SpotifyMethods{
	RegisterSpotifyAuthCodeForUser: gqltag.LinkMutation(registerSpotifyAuthCodeForUser),
}
