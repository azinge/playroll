package crud

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/utils"
	"github.com/mitchellh/mapstructure"

	"github.com/cazinge/playroll/services/models"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type RollMethods struct {
	GetRoll    *gqltag.Query    `gql:"roll(id: ID!): Roll"`
	ListRolls  *gqltag.Query    `gql:"listRolls(offset: Int, count: Int): [Roll]"`
	CreateRoll *gqltag.Mutation `gql:"createRoll(input: RollInput!): Roll"`
	UpdateRoll *gqltag.Mutation `gql:"updateRoll(id: ID!, input: RollInput!): Roll"`
	DeleteRoll *gqltag.Mutation `gql:"deleteRoll(id: ID!): Roll"`
}

func initRoll(db *gorm.DB) *models.Roll {
	roll := &models.Roll{}
	roll.SetEntity(roll)
	roll.SetDB(db)
	return roll
}

func formatRoll(val interface{}, err error) (*models.RollOutput, error) {
	if err != nil {
		return nil, err
	}
	r, ok := val.(*models.Roll)
	if !ok {
		return nil, fmt.Errorf("error converting to Roll")
	}
	return r.ToOutput()
}

func formatRolls(val interface{}, err error) (*[]models.RollOutput, error) {
	if err != nil {
		return nil, err
	}
	rs, ok := val.(*[]models.Roll)
	if !ok {
		return nil, fmt.Errorf("error converting to Roll Slice")
	}
	output := []models.RollOutput{}
	for _, r := range *rs {
		ro, err := r.ToOutput()
		if err != nil {
			return nil, err
		}
		output = append(output, *ro)
	}
	return &output, nil
}

var getRoll = gqltag.Method{
	Description: `[Get Roll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		r := initRoll(db)
		type getRollParams struct {
			ID string
		}

		params := &getRollParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)
		return formatRoll(r.Get(id))
	},
}

var listRolls = gqltag.Method{
	Description: `[List Rolls Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		r := initRoll(db)
		type listRollsParams struct {
			Offset uint
			Count  uint
		}

		params := &listRollsParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		return formatRolls(r.List())
	},
}

var createRoll = gqltag.Method{
	Description: `[Create Roll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		r := initRoll(db)
		type createRollParams struct {
			Input models.RollInput
		}

		params := &createRollParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			return nil, err
		}

		roll, err := params.Input.ToModel()
		if err != nil {
			return nil, err
		}
		return formatRoll(r.Create(roll))
	},
}

var updateRoll = gqltag.Method{
	Description: `[Update Roll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		r := initRoll(db)
		type updateRollParams struct {
			ID    string
			Input models.RollInput
		}

		params := &updateRollParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		roll, err := params.Input.ToModel()
		if err != nil {
			return nil, err
		}
		roll.ID = utils.StringIDToNumber(params.ID)
		return formatRoll(r.Update(roll))
	},
}

var deleteRoll = gqltag.Method{
	Description: `[Delete Roll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		r := initRoll(db)
		type deleteRollParams struct {
			ID string
		}

		params := &deleteRollParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)
		return formatRoll(r.Delete(id))
	},
}

var LinkedRollMethods = RollMethods{
	GetRoll:    gqltag.LinkQuery(getRoll),
	ListRolls:  gqltag.LinkQuery(listRolls),
	CreateRoll: gqltag.LinkMutation(createRoll),
	UpdateRoll: gqltag.LinkMutation(updateRoll),
	DeleteRoll: gqltag.LinkMutation(deleteRoll),
}
