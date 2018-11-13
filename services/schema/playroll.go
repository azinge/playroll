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
	Playroll            *gqltag.Output `gql:"Playroll"`
	CreatePlayrollInput *gqltag.Input  `gql:"CreatePlayrollInput"`
	UpdatePlayrollInput *gqltag.Input  `gql:"UpdatePlayrollInput"`
}

var playrollType = gqltag.Type{
	Description: `[Playroll Type Description Goes Here]`,
	Fields:      &models.Playroll{},
}

var createPlayrollInputType = gqltag.Type{
	Description: `[Create Playroll Input Type Description Goes Here]`,
	Fields:      &models.CreatePlayrollInput{},
}

var updatePlayrollInputType = gqltag.Type{
	Description: `[Update Playroll Input Type Description Goes Here]`,
	Fields:      &models.UpdatePlayrollInput{},
}

var LinkedPlayrollTypes = PlayrollTypes{
	Playroll:            gqltag.LinkOutput(playrollType),
	CreatePlayrollInput: gqltag.LinkInput(createPlayrollInputType),
	UpdatePlayrollInput: gqltag.LinkInput(updatePlayrollInputType),
}

type PlayrollMethods struct {
	GetPlayroll     *gqltag.Query `gql:"playroll(id: ID!): Playroll"`
	SearchPlayrolls *gqltag.Query `gql:"searchPlayrolls(query: String!): [Playroll]"`
	//TODO: Add ListInput to schema
	// ListPlayrolls   *Query    `gql:"listPlayrolls(options: ListInput!): [Playroll]"`
	CreatePlayroll *gqltag.Mutation `gql:"createPlayroll(playroll: CreatePlayrollInput!): Playroll"`
	UpdatePlayroll *gqltag.Mutation `gql:"updatePlayroll(playroll: UpdatePlayrollInput!): Playroll"`
	DeletePlayroll *gqltag.Mutation `gql:"deletePlayroll(id: ID!): Playroll"`
}

func initPlayroll(db *gorm.DB) *models.Playroll {
	playroll := &models.Playroll{}
	playroll.SetDB(db)
	return playroll
}

var getPlayroll = gqltag.Method{
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

var searchPlayrolls = gqltag.Method{
	Scope:       "User",
	Description: `[Search Playrolls Description Goes Here]`,
	Request: func(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		playroll := initPlayroll(db)
		return playroll.Search()
	},
}

var listPlayrolls = gqltag.Method{
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

var createPlayroll = gqltag.Method{
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

var updatePlayroll = gqltag.Method{
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

var deletePlayroll = gqltag.Method{
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
	GetPlayroll:     gqltag.LinkQuery(getPlayroll),
	SearchPlayrolls: gqltag.LinkQuery(searchPlayrolls),
	// ListPlayrolls:  LinkQuery(listPlayrolls),
	CreatePlayroll: gqltag.LinkMutation(createPlayroll),
	UpdatePlayroll: gqltag.LinkMutation(updatePlayroll),
	DeletePlayroll: gqltag.LinkMutation(deletePlayroll),
}
