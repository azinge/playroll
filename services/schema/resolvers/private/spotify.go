package private

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"

	spotifyhelpers "github.com/cazinge/playroll/services/music_services/spotify"
)

type SpotifyMethods struct {
	CurrentUserSpotifyStatus  *gqltag.Query    `gql:"currentUserSpotifyStatus: String"`
	ListSpotifyPlaylists      *gqltag.Query    `gql:"listSpotifyPlaylists(offset: Int, count: Int): [MusicSource]"`
	ListSpotifyPlaylistTracks *gqltag.Query    `gql:"listSpotifyPlaylistTracks(playlistID: String, offset: Int, count: Int): [MusicSource]"`
	ListSpotifySavedTracks    *gqltag.Query    `gql:"listSpotifySavedTracks(offset: Int, count: Int): [MusicSource]"`
	SearchSpotify             *gqltag.Query    `gql:"searchSpotify(query: String, searchType: String): [MusicSource]"`
	SearchSpotifyFull         *gqltag.Query    `gql:"searchSpotifyFull(query: String): SearchSpotifyOutput"`
	RegisterSpotifyAuthCode   *gqltag.Mutation `gql:"registerSpotifyAuthCode(code: String): MusicServiceCredential"`
	GeneratePlaylist          *gqltag.Mutation `gql:"generatePlaylist(tracklistID: ID, playlistName: String): [String]"`
}

var currentUserSpotifyStatus = gqltag.Method{
	Description: `[Current User Spotify Status Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		_, err = spotifyhelpers.GetSpotifyClientForUser(user.ID, mctx.DB)
		if err != nil {
			fmt.Println("Error getting spotify client: ", err.Error())
			return nil, err
		}
		return "authenticated", nil
	},
}

var listSpotifyPlaylists = gqltag.Method{
	Description: `[Search Spotify Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type listSpotifyPlaylistsParams struct {
			Offset uint
			Count  uint
		}
		params := &listSpotifyPlaylistsParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		client, err := spotifyhelpers.GetSpotifyClientForUser(user.ID, mctx.DB)
		if err != nil {
			fmt.Println("Error getting spotify client: ", err.Error())
			return nil, err
		}

		// TODO (dmoini): double check offset, count
		if params.Count == 0 {
			params.Count = 0
		}
		if params.Offset == 0 {
			params.Offset = 20
		}
		db := mctx.DB.Offset(params.Offset).Limit(params.Count)

		mss, err := spotifyhelpers.ListPlaylistsFromClient(client, db)
		if err != nil {
			fmt.Println("Error searching spotify: ", err.Error())
			return nil, err
		}
		return *mss, nil
	},
}

var listSpotifyPlaylistTracks = gqltag.Method{
	Description: `[List Spotify Playlist Tracks Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type listSpotifyPlaylistTracksParams struct {
			PlaylistID string
			Offset     uint
			Count      uint
		}
		params := &listSpotifyPlaylistTracksParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		client, err := spotifyhelpers.GetSpotifyClientForUser(user.ID, mctx.DB)
		if err != nil {
			fmt.Println("Error getting spotify client: ", err.Error())
			return nil, err
		}

		// TODO (dmoini): double check offset, count
		if params.Count == 0 {
			params.Count = 0
		}
		if params.Offset == 0 {
			params.Offset = 20
		}
		db := mctx.DB.Offset(params.Offset).Limit(params.Count)

		output, err := spotifyhelpers.ListPlaylistTracksFromClient(params.PlaylistID, client, db)
		if err != nil {
			fmt.Println("Error searching spotify: ", err.Error())
			return nil, err
		}
		return output, nil
	},
}

var listSpotifySavedTracks = gqltag.Method{
	Description: `[List Spotify Saved Tracks Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type listSpotifySavedTracksParams struct {
			Offset uint
			Count  uint
		}
		params := &listSpotifySavedTracksParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		client, err := spotifyhelpers.GetSpotifyClientForUser(user.ID, mctx.DB)
		if err != nil {
			fmt.Println("Error getting spotify client: ", err.Error())
			return nil, err
		}

		// TODO (dmoini): double check offset, count
		if params.Count == 0 {
			params.Count = 0
		}
		if params.Offset == 0 {
			params.Offset = 20
		}
		db := mctx.DB.Offset(params.Offset).Limit(params.Count)

		output, err := spotifyhelpers.ListSavedTracksFromClient(client, db)
		if err != nil {
			fmt.Println("Error searching spotify: ", err.Error())
			return nil, err
		}
		return output, nil
	},
}

var searchSpotify = gqltag.Method{
	Description: `[Search Spotify Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
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

		client, err := spotifyhelpers.GetSpotifyClientForUser(1, mctx.DB)
		if err != nil {
			fmt.Println("Error getting spotify client: ", err.Error())
			return nil, err
		}
		output, err := spotifyhelpers.SearchSpotify(params.Query, params.SearchType, client)
		if err != nil {
			fmt.Println("Error searching spotify: ", err.Error())
			return nil, err
		}
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
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
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

		client, err := spotifyhelpers.GetSpotifyClientForUser(1, mctx.DB)
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
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type registerSpotifyAuthCodeParams struct {
			Code string
		}
		params := &registerSpotifyAuthCodeParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		ec, err := spotifyhelpers.RegisterSpotifyAuthCodeForUser(user.ID, params.Code, mctx.DB)
		if err != nil {
			fmt.Println("Error Registering Spotify Auth Code for User: ", err.Error())
			return nil, err
		}
		return ec, nil
	},
}

var generatePlaylist = gqltag.Method{
	Description: `[Generate Playlist Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type generatePlaylistParams struct {
			TracklistID  string
			PlaylistName string
		}
		params := &generatePlaylistParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		tracklistID := utils.StringIDToNumber(params.TracklistID)

		tracks, err := models.GetTracksByTracklistID(tracklistID, mctx.DB)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		client, err := spotifyhelpers.GetSpotifyClientForUser(user.ID, mctx.DB)
		if err != nil {
			fmt.Println("Error getting spotify client: ", err.Error())
			return nil, err
		}

		trackIDs, err := spotifyhelpers.CreateSpotifyPlaylistFromTracks(tracks, params.PlaylistName, client, mctx.DB)
		if err != nil {
			fmt.Println("Error creating playlist for user: ", err.Error())
			return nil, err
		}
		return *trackIDs, nil
	},
}

var LinkedSpotifyMethods = SpotifyMethods{
	CurrentUserSpotifyStatus:  gqltag.LinkQuery(currentUserSpotifyStatus),
	ListSpotifyPlaylists:      gqltag.LinkQuery(listSpotifyPlaylists),
	ListSpotifyPlaylistTracks: gqltag.LinkQuery(listSpotifyPlaylistTracks),
	ListSpotifySavedTracks:    gqltag.LinkQuery(listSpotifySavedTracks),
	SearchSpotify:             gqltag.LinkQuery(searchSpotify),
	SearchSpotifyFull:         gqltag.LinkQuery(searchSpotifyFull),
	RegisterSpotifyAuthCode:   gqltag.LinkMutation(registerSpotifyAuthCode),
	GeneratePlaylist:          gqltag.LinkMutation(generatePlaylist),
}
