package schema

import (
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type Roll struct {
	utils.Model `gql:"MODEL"`
	// Source   RollSource `gql:"source: RollSource"`
	// Filters  RollFilter `gql:"filters: [RollFilter]"`
	// Length   RollLength `gql:"length: RollLength"`
	// Playroll Playroll   `gql:"playroll: Playroll"`
}

type RollMethods struct {
	GetRoll     *utils.Query    `gql:"roll: Roll"`
	SearchRolls *utils.Query    `gql:"searchRolls: [Roll]"`
	ListRolls   *utils.Query    `gql:"listRolls: [Roll]"`
	CreateRoll  *utils.Mutation `gql:"createRoll: Roll"`
	UpdateRoll  *utils.Mutation `gql:"updateRoll: Roll"`
	DeleteRoll  *utils.Mutation `gql:"deleteRoll: Roll"`
}

func getRoll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Roll{}, nil
}

func searchRolls(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Roll{&Roll{}, &Roll{}}, nil
}

func listRolls(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Roll{&Roll{}, &Roll{}}, nil
}

func createRoll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Roll{}, nil
}

func updateRoll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Roll{}, nil
}

func deleteRoll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Roll{}, nil
}

var RollEntity = &utils.Entity{
	Name:  "Roll",
	Model: &Roll{},
	Methods: &RollMethods{
		GetRoll:     &utils.Query{Request: getRoll, Scope: "User"},
		SearchRolls: &utils.Query{Request: searchRolls, Scope: "User"},
		ListRolls:   &utils.Query{Request: listRolls, Scope: "User"},
		CreateRoll:  &utils.Mutation{Request: createRoll, Scope: "User"},
		UpdateRoll:  &utils.Mutation{Request: updateRoll, Scope: "User"},
		DeleteRoll:  &utils.Mutation{Request: deleteRoll, Scope: "User"},
	},
}
