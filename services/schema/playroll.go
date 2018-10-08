package schema

import (
	"errors"
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type Playroll struct {
	utils.Model `gql:"MODEL"`
	Name        string `gql:"name: String"`
}

type PlayrollMethods struct {
	GetPlayroll     *utils.Query    `gql:"playroll(id: ID!): Playroll"`
	SearchPlayrolls *utils.Query    `gql:"searchPlayrolls(query: String!): [Playroll]"`
	ListPlayrolls   *utils.Query    `gql:"listPlayrolls(offset: Int, count: Int): [Playroll]"`
	CreatePlayroll  *utils.Mutation `gql:"createPlayroll(playroll: CreatePlayrollInput!): Playroll"`
	UpdatePlayroll  *utils.Mutation `gql:"updatePlayroll(playroll: UpdatePlayrollInput!): Playroll"`
	DeletePlayroll  *utils.Mutation `gql:"deletePlayroll(id: ID!): Playroll"`
}

func getPlayroll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	playroll := &Playroll{}
	id, ok := params.Args["id"].(string)
	if !ok {
		err := fmt.Sprintf("Expected id of type(string) but got type %T", ok)
		fmt.Println(err)
		return nil, errors.New(err)
	}

	if err := db.Where("id = ?", id).First(&playroll).Error; err != nil {
		fmt.Println("Error getting playroll: " + err.Error())
		return nil, err
	}
	return playroll, nil
}

func searchPlayrolls(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Playroll{&Playroll{}, &Playroll{}}, nil
}

//TODO: offset(from the start of the array) count(how much entries to return from offset)
func listPlayrolls(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	playrolls := []*Playroll{}
	// currently does not handle offset and count
	if err := db.Find(&playrolls).Error; err != nil {
		fmt.Println("Error listing playrolls: " + err.Error())
		return nil, err
	}
	return playrolls, nil
}

type CreatePlayrollInput struct {
	Name string `gql:"name: String"`
}

func createPlayroll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	name, ok := params.Args["playroll"].(map[string]interface{})["name"].(string)
	if !ok {
		err := fmt.Sprintf("Expected name of type(string) but got type %T", ok)
		fmt.Println(err)
		return nil, errors.New(err)
	}

	playRoll := &Playroll{Name: name}
	if err := db.Create(&playRoll).Error; err != nil {
		fmt.Println("Error creating playroll: " + err.Error())
		return nil, err
	}
	return playRoll, nil
}

type UpdatePlayrollInput struct {
	ID   string `gql:"id: ID!"`
	Name string `gql:"name: String"`
}

func updatePlayroll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	playroll := &Playroll{}
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

	if err := db.Where("id = ?", id).First(&playroll).Error; err != nil {
		fmt.Println("getting playroll to update: " + err.Error())
		return nil, err
	}
	playroll.Name = name
	if err := db.Save(&playroll).Error; err != nil {
		fmt.Println("error updating playroll: " + err.Error())
		return nil, err
	}
	return playroll, nil
}

func deletePlayroll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	playroll := &Playroll{}
	id, ok := params.Args["id"].(string)
	if !ok {
		err := fmt.Sprintf("Expected id of type(string) but got type %T", ok)
		fmt.Println(err)
		return nil, errors.New(err)
	}

	if err := db.Where("id = ?", id).First(&playroll).Error; err != nil {
		fmt.Println("Error deleting playroll: " + err.Error())
		return nil, err
	}
	db.Delete(&playroll)
	return playroll, nil
}

var PlayrollEntity = &utils.Entity{
	Name:  "Playroll",
	Model: &Playroll{},
	Methods: &PlayrollMethods{
		GetPlayroll:     &utils.Query{Request: getPlayroll, Scope: "User"},
		SearchPlayrolls: &utils.Query{Request: searchPlayrolls, Scope: "User"},
		ListPlayrolls:   &utils.Query{Request: listPlayrolls, Scope: "User"},
		CreatePlayroll:  &utils.Mutation{Request: createPlayroll, Scope: "User"},
		UpdatePlayroll:  &utils.Mutation{Request: updatePlayroll, Scope: "User"},
		DeletePlayroll:  &utils.Mutation{Request: deletePlayroll, Scope: "User"},
	},
	Types: &[]*utils.Type{
		&utils.Type{Name: "CreatePlayrollInput", IsInput: true, Model: &CreatePlayrollInput{}},
		&utils.Type{Name: "UpdatePlayrollInput", IsInput: true, Model: &UpdatePlayrollInput{}},
	},
}
