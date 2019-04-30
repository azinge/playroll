package private

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

type RollMethods struct {
	GetCurrentUserRoll    *gqltag.Query    `gql:"currentUserRoll(id: ID): Playroll"`
	CreateCurrentUserRoll *gqltag.Mutation `gql:"createCurrentUserRoll(input: RollInput): Playroll"`
	UpdateCurrentUserRoll *gqltag.Mutation `gql:"updateCurrentUserRoll(id: ID, input: RollInput): Playroll"`
	DeleteCurrentUserRoll *gqltag.Mutation `gql:"deleteCurrentUserRoll(id: ID): Playroll"`
}

// TODO(cazinge): Switch to using Authenticated style

var getCurrentUserRoll = gqltag.Method{
	Description: `[Get Current User Roll Description Goes Here]`,
	Request: (func(e models.Entity) func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		return func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
			dao := e.InitDAO(mctx.DB)

			type getEntityParams struct {
				ID string
			}
			params := &getEntityParams{}
			err := mapstructure.Decode(resolveParams.Args, params)
			if err != nil {
				fmt.Println(err)
				return nil, err
			}

			id := utils.StringIDToNumber(params.ID)

			rawEntity, err := dao.Get(id)
			if err != nil {
				return nil, err
			}
			roll, err := models.FormatRoll(rawEntity)
			if err != nil {
				return nil, err
			}
			return models.GetPlayrollByID(roll.PlayrollID, mctx.DB)
		}
	})(&models.Roll{}),
}

var createCurrentUserRoll = gqltag.Method{
	Description: `[Create Current User Roll Description Goes Here]`,
	Request: (func(e models.Entity, entityInput models.EntityInput) func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		return func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
			dao := e.InitDAO(mctx.DB)

			type createEntityParams struct {
				Input models.EntityInput
			}
			params := &createEntityParams{Input: entityInput}
			err := mapstructure.Decode(resolveParams.Args, params)
			fmt.Printf("%#v\n", params)
			fmt.Printf("%#v\n", params.Input)

			if err != nil {
				fmt.Println(err)
				return nil, err
			}

			entity, err := params.Input.ToModel()
			if err != nil {
				return nil, err
			}

			rawEntity, err := dao.Create(entity)
			if err != nil {
				return nil, err
			}
			roll, err := models.FormatRoll(rawEntity)
			if err != nil {
				return nil, err
			}
			return models.GetPlayrollByID(roll.PlayrollID, mctx.DB)
		}
	})(&models.Roll{}, &models.RollInput{}),
}

var updateCurrentUserRoll = gqltag.Method{
	Description: `[Update Current User Roll Description Goes Here]`,
	Request: (func(e models.Entity, entityInput models.EntityInput) func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		return func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
			dao := e.InitDAO(mctx.DB)

			type updateEntityParams struct {
				ID    string
				Input models.EntityInput
			}
			params := &updateEntityParams{Input: entityInput}
			err := mapstructure.Decode(resolveParams.Args, params)
			if err != nil {
				fmt.Println(err)
				return nil, err
			}

			entity, err := params.Input.ToModel()
			if err != nil {
				return nil, err
			}
			id := utils.StringIDToNumber(params.ID)
			entity.SetID(id)

			rawEntity, err := dao.Update(entity)
			if err != nil {
				return nil, err
			}
			roll, err := models.FormatRoll(rawEntity)
			if err != nil {
				return nil, err
			}
			return models.GetPlayrollByID(roll.PlayrollID, mctx.DB)
		}
	})(&models.Roll{}, &models.RollInput{}),
}

var deleteCurrentUserRoll = gqltag.Method{
	Description: `[Delete Current User Roll Description Goes Here]`,
	Request: (func(e models.Entity) func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		return func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
			dao := e.InitDAO(mctx.DB)

			type deleteEntityParams struct {
				ID string
			}

			params := &deleteEntityParams{}
			err := mapstructure.Decode(resolveParams.Args, params)
			if err != nil {
				fmt.Println(err)
				return nil, err
			}

			id := utils.StringIDToNumber(params.ID)

			rawEntity, err := dao.Delete(id)
			if err != nil {
				return nil, err
			}
			roll, err := models.FormatRoll(rawEntity)
			if err != nil {
				return nil, err
			}
			return models.GetPlayrollByID(roll.PlayrollID, mctx.DB)
		}
	})(&models.Roll{}),
}

// var getCurrentUserRoll = gqltag.Method{
// 	Description: `[Get Current User's Roll Description Goes Here]`,
// 	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
// 		user, err := models.AuthorizeUser(mctx)
// 		if err != nil {
// 			fmt.Println(err)
// 			return nil, err
// 		}

// 		type getCurrentUserRollParams struct {
// 			ID string
// 		}
// 		params := &getCurrentUserRollParams{}
// 		err = mapstructure.Decode(resolveParams.Args, params)
// 		if err != nil {
// 			fmt.Println(err)
// 			return nil, err
// 		}

// 		id := utils.StringIDToNumber(params.ID)
// 		rollModel := &models.Roll{}

// 		db := mctx.DB.Table("rolls").
// 			Joins("LEFT JOIN playrolls ON playrolls.id = rolls.playroll_id")

// 		if err := db.Where(&models.Playroll{UserID: user.ID}).First(rollModel, id).Error; err != nil {
// 			return nil, err
// 		}

// 		roll, err := models.FormatRoll(rollModel)
// 		if err != nil {
// 			return nil, err
// 		}

// 		return roll, nil
// 	},
// }

// var createCurrentUserRoll = gqltag.Method{
// 	Description: `[Create Current User's Roll Description Goes Here]`,
// 	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
// 		user, err := models.AuthorizeUser(mctx)
// 		if err != nil {
// 			fmt.Println(err)
// 			return nil, err
// 		}

// 		type createCurrentUserRollParams struct {
// 			Input models.RollInput
// 		}
// 		params := &createCurrentUserRollParams{}
// 		err = mapstructure.Decode(resolveParams.Args, params)
// 		if err != nil {
// 			fmt.Println(err)
// 			return nil, err
// 		}

// 		rollModel, err := models.RollInputToModel(&params.Input)
// 		if err != nil {
// 			return nil, err
// 		}

// 		playrollModel := &models.Playroll{}
// 		if err := mctx.DB.Find(playrollModel, rollModel.PlayrollID).Error; err != nil {
// 			fmt.Printf("error creating roll: %s", err.Error())
// 			return nil, err
// 		}

// 		if playrollModel.UserID != user.ID {
// 			return nil, fmt.Errorf("unauthorized roll creation error")
// 		}

// 		if err := mctx.DB.Create(rollModel).Error; err != nil {
// 			fmt.Printf("error creating roll: %s", err.Error())
// 			return nil, err
// 		}

// 		roll, err := models.FormatRoll(rollModel)
// 		if err != nil {
// 			return nil, err
// 		}

// 		return roll, nil
// 	},
// }

// var updateCurrentUserRoll = gqltag.Method{
// 	Description: `[Update Current User's Roll Description Goes Here]`,
// 	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
// 		user, err := models.AuthorizeUser(mctx)
// 		if err != nil {
// 			fmt.Println(err)
// 			return nil, err
// 		}

// 		type updateCurrentUserRollParams struct {
// 			ID    string
// 			Input models.RollInput
// 		}
// 		params := &updateCurrentUserRollParams{}
// 		err = mapstructure.Decode(resolveParams.Args, params)
// 		if err != nil {
// 			fmt.Println(err)
// 			return nil, err
// 		}

// 		rollModel, err := models.RollInputToModel(&params.Input)
// 		if err != nil {
// 			return nil, err
// 		}
// 		id := utils.StringIDToNumber(params.ID)
// 		rollModel.SetID(id)
// 		// rollModel.UserID = user.ID
// 		db := mctx.DB.Table("rolls").
// 			Joins("LEFT JOIN playrolls ON playrolls.id = rolls.playroll_id")

// 		if err := db.Model(rollModel).Where(&models.Playroll{UserID: user.ID}).Updates(rollModel).Error; err != nil {
// 			return nil, err
// 		}

// 		roll, err := models.FormatRoll(rollModel)
// 		if err != nil {
// 			return nil, err
// 		}

// 		return roll, nil
// 	},
// }

// var deleteCurrentUserRoll = gqltag.Method{
// 	Description: `[Delete Current User's Roll Description Goes Here]`,
// 	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
// 		user, err := models.AuthorizeUser(mctx)
// 		if err != nil {
// 			fmt.Println(err)
// 			return nil, err
// 		}

// 		type deleteCurrentUserRollParams struct {
// 			ID string
// 		}
// 		params := &deleteCurrentUserRollParams{}
// 		err = mapstructure.Decode(resolveParams.Args, params)
// 		if err != nil {
// 			fmt.Println(err)
// 			return nil, err
// 		}

// 		id := utils.StringIDToNumber(params.ID)
// 		rollModel := &models.Roll{}

// 		db := mctx.DB.Table("rolls").
// 			Joins("LEFT JOIN playrolls ON playrolls.id = rolls.playroll_id")

// 		if err := db.Where(&models.Playroll{UserID: user.ID}).First(rollModel, id).Error; err != nil {
// 			return nil, err
// 		}
// 		mctx.DB.Delete(rollModel)

// 		roll, err := models.FormatRoll(rollModel)
// 		if err != nil {
// 			return nil, err
// 		}

// 		return roll, nil
// 	},
// }

var LinkedRollMethods = RollMethods{
	GetCurrentUserRoll:    gqltag.LinkQuery(getCurrentUserRoll),
	CreateCurrentUserRoll: gqltag.LinkMutation(createCurrentUserRoll),
	UpdateCurrentUserRoll: gqltag.LinkMutation(updateCurrentUserRoll),
	DeleteCurrentUserRoll: gqltag.LinkMutation(deleteCurrentUserRoll),
}
