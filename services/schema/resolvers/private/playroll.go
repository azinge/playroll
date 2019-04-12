package private

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

type PlayrollMethods struct {
	GetCurrentUserPlayroll    *gqltag.Query    `gql:"currentUserPlayroll(id: ID): Playroll"`
	ListCurrentUserPlayrolls  *gqltag.Query    `gql:"listCurrentUserPlayrolls(offset: Int, count: Int): [Playroll]"`
	ListUserPlayrolls         *gqltag.Query    `gql:"listUserPlayrolls(userID: ID, offset: Int, count: Int): [Playroll]"`
	CreateCurrentUserPlayroll *gqltag.Mutation `gql:"createCurrentUserPlayroll(input: PlayrollInput): Playroll"`
	UpdateCurrentUserPlayroll *gqltag.Mutation `gql:"updateCurrentUserPlayroll(id: ID, input: PlayrollInput): Playroll"`
	DeleteCurrentUserPlayroll *gqltag.Mutation `gql:"deleteCurrentUserPlayroll(id: ID): Playroll"`
}

var getCurrentUserPlayroll = gqltag.Method{
	Description: `[Get Current User's Playroll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type getCurrentUserPlayrollParams struct {
			ID string
		}
		params := &getCurrentUserPlayrollParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)
		playrollModel := &models.Playroll{}

		db := mctx.DB.Preload("Rolls").Preload("Tracklists")
		if err := db.Where(&models.Playroll{UserID: user.ID}).First(playrollModel, id).Error; err != nil {
			return nil, err
		}

		playroll, err := models.FormatPlayroll(playrollModel)
		if err != nil {
			return nil, err
		}

		return playroll, nil
	},
}

var createCurrentUserPlayroll = gqltag.Method{
	Description: `[Create Current User's Playroll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type createCurrentUserPlayrollParams struct {
			Input models.PlayrollInput
		}
		params := &createCurrentUserPlayrollParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		playrollModel, err := models.PlayrollInputToModel(&params.Input)
		if err != nil {
			return nil, err
		}
		playrollModel.UserID = user.ID

		if err := mctx.DB.Create(playrollModel).Error; err != nil {
			fmt.Printf("error creating playroll: %s", err.Error())
			return nil, err
		}

		playroll, err := models.FormatPlayroll(playrollModel)
		if err != nil {
			return nil, err
		}

		return playroll, nil
	},
}

var updateCurrentUserPlayroll = gqltag.Method{
	Description: `[Update Current User's Playroll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type updateCurrentUserPlayrollParams struct {
			ID    string
			Input models.PlayrollInput
		}
		params := &updateCurrentUserPlayrollParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		playrollModel, err := models.PlayrollInputToModel(&params.Input)
		if err != nil {
			return nil, err
		}
		id := utils.StringIDToNumber(params.ID)
		playrollModel.SetID(id)
		playrollModel.UserID = user.ID

		if err := mctx.DB.Model(playrollModel).Where(&models.Playroll{UserID: user.ID}).Updates(playrollModel).Error; err != nil {
			return nil, err
		}

		playroll, err := models.FormatPlayroll(playrollModel)
		if err != nil {
			return nil, err
		}

		return playroll, nil
	},
}

var deleteCurrentUserPlayroll = gqltag.Method{
	Description: `[Delete Current User's Playroll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type deleteCurrentUserPlayrollParams struct {
			ID string
		}
		params := &deleteCurrentUserPlayrollParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)
		playrollModel := &models.Playroll{}

		if err := mctx.DB.Where(&models.Playroll{UserID: user.ID}).First(playrollModel, id).Error; err != nil {
			return nil, err
		}
		mctx.DB.Delete(playrollModel)

		playroll, err := models.FormatPlayroll(playrollModel)
		if err != nil {
			return nil, err
		}

		return playroll, nil
	},
}

var listCurrentUserPlayrolls = gqltag.Method{
	Description: `[List Current User's Playrolls Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type listCurrentUserPlayrollsParams struct {
			Offset uint
			Count  uint
		}
		params := &listCurrentUserPlayrollsParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		return models.GetPlayrollsByUserID(user.ID, mctx.DB)
	},
}

var listUserPlayrolls = gqltag.Method{
	Description: `[List User's Playrolls Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		_, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type listCurrentUserPlayrollsParams struct {
			UserID string
			Offset uint
			Count  uint
		}
		params := &listCurrentUserPlayrollsParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.UserID)
		return models.GetPlayrollsByUserID(id, mctx.DB)
	},
}

var LinkedPlayrollMethods = PlayrollMethods{
	GetCurrentUserPlayroll:    gqltag.LinkQuery(getCurrentUserPlayroll),
	ListCurrentUserPlayrolls:  gqltag.LinkQuery(listCurrentUserPlayrolls),
	ListUserPlayrolls:         gqltag.LinkQuery(listUserPlayrolls),
	CreateCurrentUserPlayroll: gqltag.LinkMutation(createCurrentUserPlayroll),
	UpdateCurrentUserPlayroll: gqltag.LinkMutation(updateCurrentUserPlayroll),
	DeleteCurrentUserPlayroll: gqltag.LinkMutation(deleteCurrentUserPlayroll),
}
