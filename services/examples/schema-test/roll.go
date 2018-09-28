package main

import (
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type Roll struct {
	Model `gql:"MODEL"`
	// Source   RollSource `gql:"source: RollSource"`
	// Filters  RollFilter `gql:"filters: [RollFilter]"`
	// Length   RollLength `gql:"length: RollLength"`
	// Playroll Playroll   `gql:"playroll: Playroll"`
}

type RollMethods struct {
	GetRoll     *Query    `gql:"roll: Roll"`
	SearchRolls *Query    `gql:"searchRolls: [Roll]"`
	ListRolls   *Query    `gql:"listRolls: [Roll]"`
	CreateRoll  *Mutation `gql:"createRoll: Roll"`
	UpdateRoll  *Mutation `gql:"updateRoll: Roll"`
	DeleteRoll  *Mutation `gql:"deleteRoll: Roll"`
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

var RollEntity = &Entity{
	Name:  "Roll",
	Model: &Roll{},
	Methods: &RollMethods{
		GetRoll:     &Query{Request: getRoll, Scope: "User"},
		SearchRolls: &Query{Request: searchRolls, Scope: "User"},
		ListRolls:   &Query{Request: listRolls, Scope: "User"},
		CreateRoll:  &Mutation{Request: createRoll, Scope: "User"},
		UpdateRoll:  &Mutation{Request: updateRoll, Scope: "User"},
		DeleteRoll:  &Mutation{Request: deleteRoll, Scope: "User"},
	},
}
