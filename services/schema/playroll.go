package schema

import (
	"errors"
	"fmt"

	"github.com/cazinge/playroll/services/pagination"

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
	GetPlayroll     *Query    `gql:"playroll(id: ID!): Playroll"`
	SearchPlayrolls *Query    `gql:"searchPlayrolls(query: String!): [Playroll]"`
	ListPlayrolls   *Query    `gql:"listPlayrolls(options: ListInput!): [Playroll]"`
	CreatePlayroll  *Mutation `gql:"createPlayroll(playroll: CreatePlayrollInput!): Playroll"`
	UpdatePlayroll  *Mutation `gql:"updatePlayroll(playroll: UpdatePlayrollInput!): Playroll"`
	DeletePlayroll  *Mutation `gql:"deletePlayroll(id: ID!): Playroll"`
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

var searchPlayrolls = Method{
	Scope:       "User",
	Description: `[Search Playrolls Description Goes Here]`,
	Request: func(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		playroll := initPlayroll(db)
		return playroll.Search()
	},
}

var listPlayrolls = Method{
	Scope:       "User",
	Description: `[List Playrolls Description Goes Here]`,
	Request: func(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		playroll := initPlayroll(db)
		page := params.Args["options"].(map[string]interface{})["page"].(int)
		limit := params.Args["options"].(map[string]interface{})["limit"].(int)
		orderBy := params.Args["options"].(map[string]interface{})["orderBy"].([]interface{})
		return playroll.List(pagination.Options{Page: page, Limit: limit, OrderBy: orderBy})
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

var updatePlayroll = Method{
	Scope:       "User",
	Description: `[Update Playroll Description Goes Here]`,
	Request: func(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		playroll := initPlayroll(db)
		id, ok := params.Args["playroll"].(map[string]interface{})["id"].(string)
		if !ok {
			err := fmt.Sprintf("Expected id of type(string) but got type %T", ok)
			fmt.Println(err)
			return nil, errors.New(err)
		}

		name, ok := params.Args["playroll"].(map[string]interface{})["name"].(string)
		if !ok {
			err := fmt.Sprintf("Expected name of type(string) but got type %T", ok)
			fmt.Println(err)
			return nil, errors.New(err)
		}
		input := models.UpdatePlayrollInput{ID: id, Name: name}
		return playroll.Update(input)
	},
}

var deletePlayroll = Method{
	Scope:       "User",
	Description: `[Delete Playroll Description Goes Here]`,
	Request: func(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		playroll := initPlayroll(db)
		id, ok := params.Args["id"].(string)
		if !ok {
			err := fmt.Sprintf("Expected id of type(string) but got type %T", ok)
			fmt.Println(err)
			return nil, errors.New(err)
		}
		return playroll.Delete(id)
	},
}

var LinkedPlayrollMethods = PlayrollMethods{
	GetPlayroll:     LinkQuery(getPlayroll),
	SearchPlayrolls: LinkQuery(searchPlayrolls),
	ListPlayrolls:   LinkQuery(listPlayrolls),
	CreatePlayroll:  LinkMutation(createPlayroll),
	UpdatePlayroll:  LinkMutation(updatePlayroll),
	DeletePlayroll:  LinkMutation(deletePlayroll),
}
