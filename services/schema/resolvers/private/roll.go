package private

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/schema/resolvers/admin"
)

type RollMethods struct {
	GetCurrentUserRoll    *gqltag.Query    `gql:"currentUserRoll(id: ID): Roll"`
	CreateCurrentUserRoll *gqltag.Mutation `gql:"createCurrentUserRoll(input: RollInput): Roll"`
	UpdateCurrentUserRoll *gqltag.Mutation `gql:"updateCurrentUserRoll(id: ID, input: RollInput): Roll"`
	DeleteCurrentUserRoll *gqltag.Mutation `gql:"deleteCurrentUserRoll(id: ID): Roll"`
}

// TODO(cazinge): Switch to using Authenticated style

var getCurrentUserRoll = gqltag.Method{
	Description: `[Get Current User Roll Description Goes Here]`,
	Request:     admin.GenerateGetEntityMethod(&models.Roll{}),
}

var createCurrentUserRoll = gqltag.Method{
	Description: `[Create Current User Roll Description Goes Here]`,
	Request:     admin.GenerateCreateEntityMethod(&models.Roll{}, &models.RollInput{}),
}

var updateCurrentUserRoll = gqltag.Method{
	Description: `[Update Current User Roll Description Goes Here]`,
	Request:     admin.GenerateUpdateEntityMethod(&models.Roll{}, &models.RollInput{}),
}

var deleteCurrentUserRoll = gqltag.Method{
	Description: `[Delete Current User Roll Description Goes Here]`,
	Request:     admin.GenerateDeleteEntityMethod(&models.Roll{}),
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
