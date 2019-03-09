package admin

import (
	"github.com/cazinge/playroll/services/gqltag"

	"github.com/cazinge/playroll/services/models"
)

type RollMethods struct {
	GetRoll    *gqltag.Query    `gql:"roll(id: ID!): Roll"`
	ListRolls  *gqltag.Query    `gql:"listRolls(offset: Int, count: Int): [Roll]"`
	CreateRoll *gqltag.Mutation `gql:"createRoll(input: RollInput!): Roll"`
	UpdateRoll *gqltag.Mutation `gql:"updateRoll(id: ID!, input: RollInput!): Roll"`
	DeleteRoll *gqltag.Mutation `gql:"deleteRoll(id: ID!): Roll"`
}

var getRoll = gqltag.Method{
	Description: `[Get Roll Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.Roll{}),
}

var listRolls = gqltag.Method{
	Description: `[List Rolls Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.Roll{}),
}

var createRoll = gqltag.Method{
	Description: `[Create Roll Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.Roll{}, &models.RollInput{}),
}

var updateRoll = gqltag.Method{
	Description: `[Update Roll Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.Roll{}, &models.RollInput{}),
}

var deleteRoll = gqltag.Method{
	Description: `[Delete Roll Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.Roll{}),
}

var LinkedRollMethods = RollMethods{
	GetRoll:    gqltag.LinkQuery(getRoll),
	ListRolls:  gqltag.LinkQuery(listRolls),
	CreateRoll: gqltag.LinkMutation(createRoll),
	UpdateRoll: gqltag.LinkMutation(updateRoll),
	DeleteRoll: gqltag.LinkMutation(deleteRoll),
}
