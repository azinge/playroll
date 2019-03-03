package methods

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

type PlayrollMethods struct {
	ListCurrentUserPlayrolls *gqltag.Query `gql:"listCurrentUserPlayrolls(offset: Int, count: Int): [Playroll]"`
}

var listCurrentUserPlayrolls = gqltag.Method{
	Description: `[List Current User's Playrolls Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type listCurrentUserPlayrollParams struct {
			Offset uint
			Count  uint
		}
		params := &listCurrentUserPlayrollParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		playrollModels := &[]models.Playroll{}
		db := mctx.DB.Preload("Rolls").Preload("Tracklists")
		if err := db.Where(models.Playroll{UserID: user.ID}).Find(playrollModels).Error; err != nil {
			fmt.Printf("error getting playrolls: %s", err.Error())
			return nil, err
		}

		playrolls, err := models.FormatPlayrollSlice(playrollModels)
		if err != nil {
			return nil, err
		}
		return playrolls, nil
	},
}

var LinkedPlayrollMethods = PlayrollMethods{
	ListCurrentUserPlayrolls: gqltag.LinkQuery(listCurrentUserPlayrolls),
}
