package admin

import (
	"github.com/cazinge/playroll/services/gqltag"

	"github.com/cazinge/playroll/services/models"
)

type PlayrollMethods struct {
	GetPlayroll    *gqltag.Query    `gql:"playroll(id: ID!): Playroll"`
	ListPlayrolls  *gqltag.Query    `gql:"listPlayrolls(offset: Int, count: Int): [Playroll]"`
	CreatePlayroll *gqltag.Mutation `gql:"createPlayroll(input: PlayrollInput!): Playroll"`
	UpdatePlayroll *gqltag.Mutation `gql:"updatePlayroll(id: ID!, input: PlayrollInput!): Playroll"`
	DeletePlayroll *gqltag.Mutation `gql:"deletePlayroll(id: ID!): Playroll"`
}

var getPlayroll = gqltag.Method{
	Description: `[Get Playroll Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.Playroll{}),
}

var listPlayrolls = gqltag.Method{
	Description: `[List Playrolls Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.Playroll{}),
}

var createPlayroll = gqltag.Method{
	Description: `[Create Playroll Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.Playroll{}, &models.PlayrollInput{}),
}

var updatePlayroll = gqltag.Method{
	Description: `[Update Playroll Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.Playroll{}, &models.PlayrollInput{}),
}

var deletePlayroll = gqltag.Method{
	Description: `[Delete Playroll Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.Playroll{}),
}

var LinkedPlayrollMethods = PlayrollMethods{
	GetPlayroll:    gqltag.LinkQuery(getPlayroll),
	ListPlayrolls:  gqltag.LinkQuery(listPlayrolls),
	CreatePlayroll: gqltag.LinkMutation(createPlayroll),
	UpdatePlayroll: gqltag.LinkMutation(updatePlayroll),
	DeletePlayroll: gqltag.LinkMutation(deletePlayroll),
}
