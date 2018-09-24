package main

import (
	"fmt"

	"github.com/graphql-go/graphql"
)

type Roll struct {
	Model `gql:"MODEL"`
	// Source   RollSource `json:"source" gql:"source: RollSource"`
	// Filters  RollFilter `json:"filters" gql:"filters: [RollFilter]"`
	// Length   RollLength `json:"length" gql:"length: RollLength"`
	// Playroll Playroll   `json:"playroll" gql:"playroll: Playroll"`
}

type RollMethods struct {
	GetRoll     *Query    `gql:"roll: Roll"`
	SearchRolls *Query    `gql:"searchRolls: [Roll]"`
	ListRolls   *Query    `gql:"listRolls: [Roll]"`
	CreateRoll  *Mutation `gql:"createRoll: Roll"`
	UpdateRoll  *Mutation `gql:"updateRoll: Roll"`
	DeleteRoll  *Mutation `gql:"deleteRoll: Roll"`
}

func getRoll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("roll, args:%+v\n", params.Args)
	return &Roll{}, nil
}

func searchRolls(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("searchRolls, args:%+v\n", params.Args)
	return &[]Roll{}, nil
}

func listRolls(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("listRolls, args:%+v\n", params.Args)
	return &[]Roll{}, nil
}

func createRoll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("createRoll, args:%+v\n", params.Args)
	return &Roll{}, nil
}

func updateRoll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("updateRoll, args:%+v\n", params.Args)
	return &Roll{}, nil
}

func deleteRoll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("deleteRoll, args:%+v\n", params.Args)
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
