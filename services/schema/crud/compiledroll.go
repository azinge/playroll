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

var getCompiledRoll = gqltag.Method{
	Description: `[Get CompiledRoll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		cr := models.InitCompiledRollDAO(db)
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

		rawCompiledRoll, err := cr.Get(id)
		if err != nil {
			return nil, err
		}
		return cr.Format(rawCompiledRoll)
	},
}

var listCompiledRolls = gqltag.Method{
	Description: `[List CompiledRolls Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		cr := models.InitCompiledRollDAO(db)
		type listCompiledRollsParams struct {
			Offset uint
			Count  uint
		}

		params := &listCompiledRollsParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			return nil, err
		}

		rawCompiledRolls, err := cr.List()
		if err != nil {
			return nil, err
		}
		return cr.FormatSlice(rawCompiledRolls)
	},
}

var createCompiledRoll = gqltag.Method{
	Description: `[Create CompiledRoll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		cr := models.InitCompiledRollDAO(db)
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

		rawCompiledRoll, err := cr.Create(compiledRoll)
		if err != nil {
			return nil, err
		}
		return cr.Format(rawCompiledRoll)
	},
}

var updateCompiledRoll = gqltag.Method{
	Description: `[Update CompiledRoll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		cr := models.InitCompiledRollDAO(db)
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

		rawCompiledRoll, err := cr.Update(compiledRoll)
		if err != nil {
			return nil, err
		}
		return cr.Format(rawCompiledRoll)
	},
}

var deleteCompiledRoll = gqltag.Method{
	Description: `[Delete CompiledRoll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		cr := models.InitCompiledRollDAO(db)
		type deleteCompiledRollParams struct {
			ID string
		}

		params := &deleteCompiledRollParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)

		rawCompiledRoll, err := cr.Delete(id)
		if err != nil {
			return nil, err
		}
		return cr.Format(rawCompiledRoll)
	},
}

var LinkedCompiledRollMethods = CompiledRollMethods{
	GetCompiledRoll:    gqltag.LinkQuery(getCompiledRoll),
	ListCompiledRolls:  gqltag.LinkQuery(listCompiledRolls),
	CreateCompiledRoll: gqltag.LinkMutation(createCompiledRoll),
	UpdateCompiledRoll: gqltag.LinkMutation(updateCompiledRoll),
	DeleteCompiledRoll: gqltag.LinkMutation(deleteCompiledRoll),
}
