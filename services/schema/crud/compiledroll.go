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

type CompiledRollMethods struct {
	GetCompiledRoll    *gqltag.Query    `gql:"compiledRoll(id: ID!): CompiledRoll"`
	ListCompiledRolls  *gqltag.Query    `gql:"listCompiledRolls(offset: Int, count: Int): [CompiledRoll]"`
	CreateCompiledRoll *gqltag.Mutation `gql:"createCompiledRoll(input: CompiledRollInput!): CompiledRoll"`
	UpdateCompiledRoll *gqltag.Mutation `gql:"updateCompiledRoll(id: ID!, input: CompiledRollInput!): CompiledRoll"`
	DeleteCompiledRoll *gqltag.Mutation `gql:"deleteCompiledRoll(id: ID!): CompiledRoll"`
}

func initCompiledRoll(db *gorm.DB) *models.CompiledRoll {
	compiledRoll := &models.CompiledRoll{}
	compiledRoll.SetEntity(compiledRoll)
	compiledRoll.SetDB(db)
	return compiledRoll
}

func formatCompiledRoll(val interface{}, err error) (*models.CompiledRollOutput, error) {
	if err != nil {
		return nil, err
	}
	cr, ok := val.(*models.CompiledRoll)
	if !ok {
		return nil, fmt.Errorf("error converting to CompiledRoll")
	}
	return cr.ToOutput()
}

func formatCompiledRolls(val interface{}, err error) (*[]models.CompiledRollOutput, error) {
	if err != nil {
		return nil, err
	}
	crs, ok := val.(*[]models.CompiledRoll)
	if !ok {
		return nil, fmt.Errorf("error converting to CompiledRoll Slice")
	}
	output := []models.CompiledRollOutput{}
	for _, cr := range *crs {
		cro, err := cr.ToOutput()
		if err != nil {
			return nil, err
		}
		output = append(output, *cro)
	}
	return &output, nil
}

var getCompiledRoll = gqltag.Method{
	Description: `[Get CompiledRoll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		cr := initCompiledRoll(db)
		type getCompiledRollParams struct {
			ID string
		}

		params := &getCompiledRollParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)

		return formatCompiledRoll(cr.Get(id))
	},
}

var listCompiledRolls = gqltag.Method{
	Description: `[List CompiledRolls Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		cr := initCompiledRoll(db)
		type listCompiledRollsParams struct {
			Offset uint
			Count  uint
		}

		params := &listCompiledRollsParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			return nil, err
		}

		return formatCompiledRolls(cr.List())
	},
}

var createCompiledRoll = gqltag.Method{
	Description: `[Create CompiledRoll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		cr := initCompiledRoll(db)
		type createCompiledRollParams struct {
			Input models.CompiledRollInput
		}

		params := &createCompiledRollParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			return nil, err
		}

		compiledRoll, err := params.Input.ToModel()
		if err != nil {
			return nil, err
		}
		return formatCompiledRoll(cr.Create(compiledRoll))
	},
}

var updateCompiledRoll = gqltag.Method{
	Description: `[Update CompiledRoll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		cr := initCompiledRoll(db)
		type updateCompiledRollParams struct {
			ID    string
			Input models.CompiledRollInput
		}

		params := &updateCompiledRollParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			return nil, err
		}
		compiledRoll, err := params.Input.ToModel()
		if err != nil {
			return nil, err
		}
		compiledRoll.ID = utils.StringIDToNumber(params.ID)
		return formatCompiledRoll(cr.Update(compiledRoll))
	},
}

var deleteCompiledRoll = gqltag.Method{
	Description: `[Delete CompiledRoll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		cr := initCompiledRoll(db)
		type deleteCompiledRollParams struct {
			ID string
		}

		params := &deleteCompiledRollParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)
		return formatCompiledRoll(cr.Delete(id))
	},
}

var LinkedCompiledRollMethods = CompiledRollMethods{
	GetCompiledRoll:    gqltag.LinkQuery(getCompiledRoll),
	ListCompiledRolls:  gqltag.LinkQuery(listCompiledRolls),
	CreateCompiledRoll: gqltag.LinkMutation(createCompiledRoll),
	UpdateCompiledRoll: gqltag.LinkMutation(updateCompiledRoll),
	DeleteCompiledRoll: gqltag.LinkMutation(deleteCompiledRoll),
}
