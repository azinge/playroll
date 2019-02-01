package methods

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	"github.com/mitchellh/mapstructure"

	spotifyhelpers "github.com/cazinge/playroll/services/music_services/spotify"
)

type SpotifyMethods struct {
	SearchSpotify           *gqltag.Query    `gql:"searchSpotify(query: String, searchType: String): [MusicSource]"`
	SearchSpotifyFull       *gqltag.Query    `gql:"searchSpotifyFull(query: String): SearchSpotifyOutput"`
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

		client, err := spotifyhelpers.GetSpotifyClientForUser(1, db)
		if err != nil {
			fmt.Println("Error getting spotify client: ", err.Error())
			return nil, err
		}
		output, err := spotifyhelpers.SearchSpotify(params.Query, params.SearchType, client)
		if err != nil {
			fmt.Println("Error searching spotify: ", err.Error())
			return nil, err
		}
		fmt.Println(&output)
		switch params.SearchType {
		case "Track":
			return output.Tracks, nil
		case "Album":
			return output.Albums, nil
		case "Artist":
			return output.Artists, nil
		case "Playlist":
			return output.Playlists, nil
		default:
			return nil, fmt.Errorf("Search Type Not Found")
		}
	},
}

var searchSpotifyFull = gqltag.Method{
	Description: `[Search Spotify (Full) Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		type searchSpotifyParams struct {
			Query string
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

		client, err := spotifyhelpers.GetSpotifyClientForUser(1, db)
		if err != nil {
			fmt.Println("Error getting spotify client: ", err.Error())
			return nil, err
		}
		output, err := spotifyhelpers.SearchSpotify(params.Query, "All", client)
		if err != nil {
			fmt.Println("Error searching spotify: ", err.Error())
			return nil, err
		}

		return *output, nil
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

		userID := utils.StringIDToNumber(params.UserID)

		ec, err := spotifyhelpers.RegisterSpotifyAuthCodeForUser(userID, params.Code, db)
		if err != nil {
			fmt.Println("Error Registering Spotify Auth Code for User: ", err.Error())
			return nil, err
		}
		return ec, nil
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

		tracklistID := utils.StringIDToNumber(params.TracklistID)

		tracks, err := models.GetTracksByTracklistID(tracklistID, db)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		client, err := spotifyhelpers.GetSpotifyClientForUser(1, db)
		if err != nil {
			fmt.Println("Error getting spotify client: ", err.Error())
			return nil, err
		}

		trackIDs, err := spotifyhelpers.CreateSpotifyPlaylistFromTracks(tracks, params.PlaylistName, client, db)
		if err != nil {
			fmt.Println("Error creating playlist for user: ", err.Error())
			return nil, err
		}
		return *trackIDs, nil
	},
}

var LinkedSpotifyMethods = SpotifyMethods{
	SearchSpotify:           gqltag.LinkQuery(searchSpotify),
	SearchSpotifyFull:       gqltag.LinkQuery(searchSpotifyFull),
	RegisterSpotifyAuthCode: gqltag.LinkMutation(registerSpotifyAuthCode),
	GeneratePlaylist:        gqltag.LinkMutation(generatePlaylist),
}
