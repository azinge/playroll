package admin

import (
	"github.com/cazinge/playroll/services/gqltag"

	"github.com/cazinge/playroll/services/models"
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
	Request:     GenerateGetEntityMethod(&models.CompiledRoll{}),
}

var listCompiledRolls = gqltag.Method{
	Description: `[List CompiledRolls Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.CompiledRoll{}),
}

var createCompiledRoll = gqltag.Method{
	Description: `[Create CompiledRoll Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.CompiledRoll{}, &models.CompiledRollInput{}),
}

var updateCompiledRoll = gqltag.Method{
	Description: `[Update CompiledRoll Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.CompiledRoll{}, &models.CompiledRollInput{}),
}

var deleteCompiledRoll = gqltag.Method{
	Description: `[Delete CompiledRoll Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.CompiledRoll{}),
}

var LinkedCompiledRollMethods = CompiledRollMethods{
	GetCompiledRoll:    gqltag.LinkQuery(getCompiledRoll),
	ListCompiledRolls:  gqltag.LinkQuery(listCompiledRolls),
	CreateCompiledRoll: gqltag.LinkMutation(createCompiledRoll),
	UpdateCompiledRoll: gqltag.LinkMutation(updateCompiledRoll),
	DeleteCompiledRoll: gqltag.LinkMutation(deleteCompiledRoll),
}
