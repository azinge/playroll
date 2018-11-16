package schema

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/cazinge/playroll/services/utils/pagination"
	"github.com/cazinge/playroll/services/utils/search"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type Playroll struct {
	utils.Model `gql:"MODEL"`
	Rolls       []Roll
	User        User
	UserID      uint
	Name        string `gql:"name: String"`
}

type PlayrollMethods struct {
	GetPlayroll     *utils.Query    `gql:"playroll(id: ID!): Playroll"`
	SearchPlayrolls *utils.Query    `gql:"searchPlayrolls(options: SearchInput!): [Playroll]"`
	ListPlayrolls   *utils.Query    `gql:"listPlayrolls(options: PaginationInput!): [Playroll]"`
	CreatePlayroll  *utils.Mutation `gql:"createPlayroll(playroll: CreatePlayrollInput!): Playroll"`
	UpdatePlayroll  *utils.Mutation `gql:"updatePlayroll(playroll: UpdatePlayrollInput!): Playroll"`
	DeletePlayroll  *utils.Mutation `gql:"deletePlayroll(id: ID!): Playroll"`
}

func getPlayroll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var playroll Playroll
	if err := utils.HandleGetSingularModel(params, db, &playroll); err != nil {
		return nil, err
	}
	return playroll, nil
}

func searchPlayrolls(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var playrolls []Playroll
	if err := search.Query(params, db, &playrolls); err != nil {
		return nil, err
	}
	return playrolls, nil
}

func listPlayrolls(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var playrolls []Playroll
	pagination.HandlePagination(params, db, &playrolls)
	return playrolls, nil
}

type CreatePlayrollInput struct {
	Name string `gql:"name: String"`
}

func createPlayroll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	name, ok := params.Args["playroll"].(map[string]interface{})["name"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("name")
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
		return nil, utils.HandleTypeAssertionError("id")
	}

	name, ok := params.Args["playroll"].(map[string]interface{})["name"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("name")
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
		return nil, utils.HandleTypeAssertionError("id")
	}

	if err := db.Where("id = ?", id).First(&playroll).Error; err != nil {
		fmt.Println("Error deleting playroll: " + err.Error())
		return nil, err
	}

	associationsToRemove := []string{"User", "Rolls"}
	utils.HandleRemoveAssociationReferences(db, playroll, associationsToRemove)
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
