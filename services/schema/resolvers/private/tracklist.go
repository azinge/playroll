package private

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

type TracklistMethods struct {
	GetCurrentUserTracklist *gqltag.Query `gql:"currentUserTracklist(id: ID): Tracklist"`
}

var getCurrentUserTracklist = gqltag.Method{
	Description: `[Get Current User's Tracklist Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type getCurrentUserTracklistParams struct {
			ID string
		}
		params := &getCurrentUserTracklistParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)
		tracklistModel := &models.Tracklist{}

		db := mctx.DB.Preload("CompiledRolls")
		if err := db.Where(&models.Tracklist{OwnerID: user.ID}).First(tracklistModel, id).Error; err != nil {
			return nil, err
		}

		tracklist, err := models.FormatTracklist(tracklistModel)
		if err != nil {
			return nil, err
		}

		return tracklist, nil
	},
}

var LinkedTracklistMethods = TracklistMethods{
	GetCurrentUserTracklist: gqltag.LinkQuery(getCurrentUserTracklist),
}
