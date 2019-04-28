package private

import (
	"fmt"

	"github.com/cazinge/playroll/services/schema/resolvers/admin"
	"github.com/jinzhu/gorm"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

type PlayrollMethods struct {
	GetCurrentUserPlayroll    *gqltag.Query    `gql:"currentUserPlayroll(id: ID): Playroll"`
	GetPlayroll               *gqltag.Query    `gql:"playroll(id: ID): Playroll"`
	ListCurrentUserPlayrolls  *gqltag.Query    `gql:"listCurrentUserPlayrolls(offset: Int, count: Int): [Playroll]"`
	ListUserPlayrolls         *gqltag.Query    `gql:"listUserPlayrolls(userID: ID, offset: Int, count: Int): [Playroll]"`
	CreateCurrentUserPlayroll *gqltag.Mutation `gql:"createCurrentUserPlayroll(input: PlayrollInput): Playroll"`
	CopyPlayroll              *gqltag.Mutation `gql:"copyPlayroll(playrollID: ID): Playroll"`
	UpdateCurrentUserPlayroll *gqltag.Mutation `gql:"updateCurrentUserPlayroll(id: ID, input: PlayrollInput): Playroll"`
	DeleteCurrentUserPlayroll *gqltag.Mutation `gql:"deleteCurrentUserPlayroll(id: ID): Playroll"`
	ReorderPlayroll           *gqltag.Mutation `gql:"reorderPlayroll(playrollID: ID!, rollIDs: [ID]!, orders: [Int]!): Playroll"`

	ListFeaturedPlayrolls   *gqltag.Query `gql:"listFeaturedPlayrolls(offset: Int, count: Int): [Playroll]"`
	ListPopularPlayrolls    *gqltag.Query `gql:"listPopularPlayrolls(offset: Int, count: Int): [Playroll]"`
	ListNewReleasePlayrolls *gqltag.Query `gql:"listNewReleasePlayrolls(offset: Int, count: Int): [Playroll]"`
	ListFriendsPlayrolls    *gqltag.Query `gql:"listFriendsPlayrolls(offset: Int, count: Int): [Playroll]"`
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

		db := mctx.DB.Preload("Rolls", func(db *gorm.DB) *gorm.DB {
			return db.Order("order")
		})
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

var getPlayroll = gqltag.Method{
	Description: `[Get Playroll Description Goes Here]`,
	Request:     admin.GenerateGetEntityMethod(&models.Playroll{}),
}

var copyPlayroll = gqltag.Method{
	Description: `[Copy Playroll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type copyPlayrollParams struct {
			PlayrollID string
		}
		params := &copyPlayrollParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		playrollModel := &models.Playroll{}
		playrollID := utils.StringIDToNumber(params.PlayrollID)
		if err := mctx.DB.Preload("Rolls", func(db *gorm.DB) *gorm.DB {
			return db.Order("order")
		}).First(playrollModel, playrollID).Error; err != nil {
			return nil, err
		}

		return models.ClonePlayroll(playrollModel, user.ID, mctx.DB)
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

		return models.GetPlayrollByID(playrollModel.ID, mctx.DB)
	},
}

var reorderPlayroll = gqltag.Method{
	Description: `[Update Current User's Playroll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		_, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type reorderPlayrollParams struct {
			PlayrollID string
			RollIDs    []string
			Orders     []uint
		}
		params := &reorderPlayrollParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		tx := mctx.DB.Begin()

		if len(params.RollIDs) != len(params.Orders) {
			return nil, fmt.Errorf("length of rollIDs array does not match length of orders array")
		}

		playrollID := utils.StringIDToNumber(params.PlayrollID)

		for i, rollID := range params.RollIDs {
			fmt.Println(i, rollID)
			id := utils.StringIDToNumber(rollID)
			roll := &models.Roll{}
			if err := tx.First(roll, id).Error; err != nil {
				tx.Rollback()
				return nil, err
			}

			if playrollID != roll.PlayrollID {
				tx.Rollback()
				return nil, fmt.Errorf("can only reorder one playroll at a time")
			}

			if err := tx.Model(roll).Update("order", params.Orders[i]).Error; err != nil {
				tx.Rollback()
				return nil, err
			}
		}

		tx.Commit()

		return models.GetPlayrollByID(playrollID, mctx.DB)
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
			Offset *uint
			Count  *uint
		}
		params := &listCurrentUserPlayrollsParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		offset, count := utils.InitializePaginationVariables(params.Offset, params.Count)
		db := mctx.DB.Offset(offset).Limit(count)

		return models.GetPlayrollsByUserID(user.ID, db)
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
			Offset *uint
			Count  *uint
		}
		params := &listCurrentUserPlayrollsParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.UserID)

		offset, count := utils.InitializePaginationVariables(params.Offset, params.Count)
		db := mctx.DB.Offset(offset).Limit(count)
		return models.GetPlayrollsByUserID(id, db)
	},
}

var listFeaturedPlayrolls = gqltag.Method{
	Description: `[List Featured Playrolls Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		_, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type listFeaturedPlayrollsParams struct {
			Offset uint
			Count  uint
		}
		params := &listFeaturedPlayrollsParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		userModel := &models.User{}
		if err := mctx.DB.Where("account_type = ? AND name = ?", "Managed", "Featured").First(userModel).Error; err != nil {
			fmt.Printf("error finding user: %s", err.Error())
			return nil, err
		}

		return models.GetPlayrollsByUserID(userModel.ID, mctx.DB)
	},
}

var listPopularPlayrolls = gqltag.Method{
	Description: `[List Popular Playrolls Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		_, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type listPopularPlayrollsParams struct {
			Offset uint
			Count  uint
		}
		params := &listPopularPlayrollsParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		userModel := &models.User{}
		if err := mctx.DB.Where("account_type = ? AND name = ?", "Managed", "Popular").First(userModel).Error; err != nil {
			fmt.Printf("error finding user: %s", err.Error())
			return nil, err
		}

		return models.GetPlayrollsByUserID(userModel.ID, mctx.DB)
	},
}

var listNewReleasePlayrolls = gqltag.Method{
	Description: `[List New Release Playrolls Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		_, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type listNewReleasePlayrollsParams struct {
			Offset uint
			Count  uint
		}
		params := &listNewReleasePlayrollsParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		userModel := &models.User{}
		if err := mctx.DB.Where("account_type = ? AND name = ?", "Managed", "NewRelease").First(userModel).Error; err != nil {
			fmt.Printf("error finding user: %s", err.Error())
			return nil, err
		}

		return models.GetPlayrollsByUserID(userModel.ID, mctx.DB)
	},
}

var listFriendsPlayrolls = gqltag.Method{
	Description: `[List Friends Playrolls Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type listFriendsPlayrollsParams struct {
			Offset *uint
			Count  *uint
		}
		params := &listFriendsPlayrollsParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		playrollModels := &[]models.Playroll{}
		db := mctx.DB.
			Joins("JOIN relationships ON CAST(playrolls.user_id AS int) = relationships.user_id").
			Where("relationships.other_user_id = ? AND relationships.status = ?", user.ID, "Friend")
		offset, count := utils.InitializePaginationVariables(params.Offset, params.Count)
		db = db.Preload("Rolls", func(db *gorm.DB) *gorm.DB {
			return db.Order("order")
		}).Preload("User")
		if err := db.Offset(offset).Limit(count).Find(playrollModels).Error; err != nil {
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
	GetCurrentUserPlayroll:    gqltag.LinkQuery(getCurrentUserPlayroll),
	GetPlayroll:               gqltag.LinkQuery(getPlayroll),
	ListCurrentUserPlayrolls:  gqltag.LinkQuery(listCurrentUserPlayrolls),
	ListUserPlayrolls:         gqltag.LinkQuery(listUserPlayrolls),
	CreateCurrentUserPlayroll: gqltag.LinkMutation(createCurrentUserPlayroll),
	CopyPlayroll:              gqltag.LinkMutation(copyPlayroll),
	UpdateCurrentUserPlayroll: gqltag.LinkMutation(updateCurrentUserPlayroll),
	DeleteCurrentUserPlayroll: gqltag.LinkMutation(deleteCurrentUserPlayroll),
	ReorderPlayroll:           gqltag.LinkMutation(reorderPlayroll),

	ListFeaturedPlayrolls:   gqltag.LinkQuery(listFeaturedPlayrolls),
	ListPopularPlayrolls:    gqltag.LinkQuery(listPopularPlayrolls),
	ListNewReleasePlayrolls: gqltag.LinkQuery(listNewReleasePlayrolls),
	ListFriendsPlayrolls:    gqltag.LinkQuery(listFriendsPlayrolls),
}
