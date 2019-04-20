package private

import (
	"fmt"

	"github.com/cazinge/playroll/services/generate"
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"

	spotifyhelpers "github.com/cazinge/playroll/services/music_services/spotify"
)

type GenerateMethods struct {
	GetTracklistSongs            *gqltag.Query    `gql:"tracklistSongs(tracklistID: ID): [MusicSource]"`
	GenerateTracklist            *gqltag.Mutation `gql:"generateTracklist(playrollID: ID): Tracklist"`
	ProgressiveGenerateTracklist *gqltag.Mutation `gql:"progressiveGenerateTracklist(playrollID: ID, tracklistID: ID): ProgressiveGenerateTracklistOutput"`
}

var getTracklistSongs = gqltag.Method{
	Description: `[Get Tracklist Songs Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		type getTracklistSongsParams struct {
			TracklistID string
		}
		params := &getTracklistSongsParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
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
		return *tracks, nil
	},
}

var generateTracklist = gqltag.Method{
	Description: `[Generate Tracklist Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		type generateTracklistParams struct {
			PlayrollID string
		}
		params := &generateTracklistParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		playrollID := utils.StringIDToNumber(params.PlayrollID)

		pDAO := models.InitPlayrollDAO(mctx.DB.Preload("Rolls"))
		rawPlayroll, err := pDAO.Get(playrollID)
		if err != nil {
			fmt.Println("Error getting playroll: ", err.Error())
			return nil, err
		}

		playroll, err := models.FormatPlayroll(rawPlayroll)
		if err != nil {
			fmt.Println("Error formatting playroll: ", err.Error())
			return nil, err
		}

		client, err := spotifyhelpers.GetSpotifyClientForUser(1, mctx.DB)
		if err != nil {
			fmt.Println("Error fetching token: ", err.Error())
			return nil, err
		}

		compiledRolls, err := generate.CompileRolls(&playroll.Rolls, mctx.DB, client)
		if err != nil {
			fmt.Println("Error compiling rolls: ", err.Error())
			return nil, err
		}

		tracklist, err := models.CreateTracklistWithCompiledRolls(compiledRolls, playrollID, playroll.UserID, mctx.DB)
		if err != nil {
			fmt.Println("Error creating tracklist: ", err.Error())
			return nil, err
		}
		return tracklist, nil
	},
}

var progressiveGenerateTracklist = gqltag.Method{
	Description: `[Progressive Generate Tracklist Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println("error authorizing user: ", err.Error())
			return nil, err
		}
		type progressiveGenerateTracklistParams struct {
			PlayrollID  string
			TracklistID *string
		}
		params := &progressiveGenerateTracklistParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		playrollID := utils.StringIDToNumber(params.PlayrollID)

		pDAO := models.InitPlayrollDAO(mctx.DB.Preload("Rolls"))
		rawPlayroll, err := pDAO.Get(playrollID)
		if err != nil {
			fmt.Println("Error getting playroll: ", err.Error())
			return nil, err
		}

		playroll, err := models.FormatPlayroll(rawPlayroll)
		if err != nil {
			fmt.Println("Error formatting playroll: ", err.Error())
			return nil, err
		}

		tracklist := &models.Tracklist{}
		tDAO := models.InitTracklistDAO(mctx.DB)

		if params.TracklistID == nil {
			tracklistInput := models.TracklistInput{IsStarred: false, IsPrimary: true}
			tracklist, err = models.TracklistInputToModel(&tracklistInput)
			if err != nil {
				return nil, err
			}
			tracklist.PlayrollID = playrollID
			tracklist.OwnerID = user.ID
			tracklist.IsComplete = true

			_, err := tDAO.Create(tracklist)
			if err != nil {
				return nil, err
			}
		} else {
			tracklistID := utils.StringIDToNumber(*params.TracklistID)
			if err := mctx.DB.First(tracklist, tracklistID).Error; err != nil {
				fmt.Println("Error getting tracklist: ", err.Error())
				return nil, err
			}
		}

		client, err := spotifyhelpers.GetSpotifyClientForUser(1, mctx.DB)
		if err != nil {
			fmt.Println("Error fetching token: ", err.Error())
			return nil, err
		}

		output, err := generate.ProgressiveGenerateTracklist(playroll, tracklist, mctx, client)
		if err != nil {
			fmt.Println("Error compiling rolls: ", err.Error())
			return nil, err
		}

		return output, nil
	},
}

var LinkedGenerateMethods = GenerateMethods{
	GetTracklistSongs:            gqltag.LinkQuery(getTracklistSongs),
	GenerateTracklist:            gqltag.LinkMutation(generateTracklist),
	ProgressiveGenerateTracklist: gqltag.LinkMutation(progressiveGenerateTracklist),
}
