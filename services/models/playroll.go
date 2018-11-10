package main

import (
	"errors"
	"fmt"

	"github.com/cazinge/playroll/services/schema"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type PlayrollMethods struct {
	GetPlayroll *Query `gql:"playroll(id: ID!): Playroll"`
	// SearchPlayrolls *Query    `gql:"searchPlayrolls(query: String!): [Playroll]"`
	// ListPlayrolls   *Query    `gql:"listPlayrolls(options: ListInput!): [Playroll]"`
	// CreatePlayroll  *Mutation `gql:"createPlayroll(playroll: CreatePlayrollInput!): Playroll"`
	// UpdatePlayroll  *Mutation `gql:"updatePlayroll(playroll: UpdatePlayrollInput!): Playroll"`
	// DeletePlayroll  *Mutation `gql:"deletePlayroll(id: ID!): Playroll"`
}

var getPlayroll = Method{
	Scope: "User",
	Documentation: `
		[Get Playroll Documentation Goes Here]
	`,
	Request: func(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		playroll := schema.Playroll{}
		playroll.DB = db
		id, ok := params.Args["id"].(string)
		if !ok {
			err := fmt.Sprintf("Expected id of type(string) but got type %T", ok)
			fmt.Println(err)
			return nil, errors.New(err)
		}
		return playroll.Get(id)
	},
}

var LinkedPlayrollMethods = PlayrollMethods{
	GetPlayroll: LinkQuery(getPlayroll),
}
