package schema

import (
	"errors"
	"fmt"

	"github.com/cazinge/playroll/services/models"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type PlayrollTypes struct {
	Playroll            *Output `gql:"Playroll"`
	CreatePlayrollInput *Input  `gql:"CreatePlayrollInput"`
}

var playrollType = Type{
	Description: `[Playroll Type Description Goes Here]`,
	Fields:      &models.Playroll{},
}

var createPlayrollInputType = Type{
	Description: `[Create Playroll Input Type Description Goes Here]`,
	Fields:      &models.CreatePlayrollInput{},
}

var LinkedPlayrollTypes = PlayrollTypes{
	Playroll:            LinkOutput(playrollType),
	CreatePlayrollInput: LinkInput(createPlayrollInputType),
}

type PlayrollMethods struct {
	GetPlayroll *Query `gql:"playroll(id: ID!): Playroll"`
	// SearchPlayrolls *Query    `gql:"searchPlayrolls(query: String!): [Playroll]"`
	// ListPlayrolls   *Query    `gql:"listPlayrolls(options: ListInput!): [Playroll]"`
	CreatePlayroll *Mutation `gql:"createPlayroll(playroll: CreatePlayrollInput!): Playroll"`
	// UpdatePlayroll  *Mutation `gql:"updatePlayroll(playroll: UpdatePlayrollInput!): Playroll"`
	// DeletePlayroll  *Mutation `gql:"deletePlayroll(id: ID!): Playroll"`
}

func initPlayroll(db *gorm.DB) *models.Playroll {
	playroll := &models.Playroll{}
	playroll.SetDB(db)
	return playroll
}

var getPlayroll = Method{
	Scope:       "User",
	Description: `[Get Playroll Description Goes Here]`,
	Request: func(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		playroll := initPlayroll(db)
		id, ok := params.Args["id"].(string)
		if !ok {
			err := fmt.Sprintf("Expected id of type(string) but got type %T", ok)
			fmt.Println(err)
			return nil, errors.New(err)
		}
		return playroll.Get(id)
	},
}

var createPlayroll = Method{
	Scope:       "User",
	Description: `[Create Playroll Description Goes Here]`,
	Request: func(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		playroll := initPlayroll(db)
		name, ok := params.Args["playroll"].(map[string]interface{})["name"].(string)
		if !ok {
			err := fmt.Sprintf("Expected name of type(string) but got type %T", ok)
			fmt.Println(err)
			return nil, errors.New(err)
		}
		input := models.CreatePlayrollInput{Name: name}
		return playroll.Create(input)
	},
}

var LinkedPlayrollMethods = PlayrollMethods{
	GetPlayroll:    LinkQuery(getPlayroll),
	CreatePlayroll: LinkMutation(createPlayroll),
}
