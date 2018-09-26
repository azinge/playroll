package main

import (
	"fmt"

	"github.com/graphql-go/graphql"
)

type Playroll struct {
	Model `gql:"MODEL"`
	Name  string `gql:"name: String"`
}

type PlayrollMethods struct {
	GetPlayroll     *Query    `gql:"playroll(id: ID!): Playroll"`
	SearchPlayrolls *Query    `gql:"searchPlayrolls(query: String!): [Playroll]"`
	ListPlayrolls   *Query    `gql:"listPlayrolls(offset: Int, count: Int): [Playroll]"`
	CreatePlayroll  *Mutation `gql:"createPlayroll(playroll: CreatePlayrollInput!): Playroll"`
	UpdatePlayroll  *Mutation `gql:"updatePlayroll(playroll: UpdatePlayrollInput!): Playroll"`
	DeletePlayroll  *Mutation `gql:"deletePlayroll(id: ID!): Playroll"`
}

func getPlayroll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("playroll, args:%+v\n", params.Args)
	return &Playroll{}, nil
}

func searchPlayrolls(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("searchPlayrolls, args:%+v\n", params.Args)
	return []*Playroll{&Playroll{}, &Playroll{}}, nil
}

func listPlayrolls(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("listPlayrolls, args:%+v\n", params.Args)
	return []*Playroll{&Playroll{}, &Playroll{}}, nil
}

type CreatePlayrollInput struct {
	Name string `gql:"name: String"`
}

func createPlayroll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("createPlayroll, args:%+v\n", params.Args)
	return &Playroll{}, nil
}

type UpdatePlayrollInput struct {
	ID   string `gql:"id: ID!"`
	Name string `gql:"name: String"`
}

func updatePlayroll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("updatePlayroll, args:%+v\n", params.Args)
	return &Playroll{}, nil
}

func deletePlayroll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("deletePlayroll, args:%+v\n", params.Args)
	return &Playroll{}, nil
}

var PlayrollEntity = &Entity{
	Name:  "Playroll",
	Model: &Playroll{},
	Methods: &PlayrollMethods{
		GetPlayroll:     &Query{Request: getPlayroll, Scope: "User"},
		SearchPlayrolls: &Query{Request: searchPlayrolls, Scope: "User"},
		ListPlayrolls:   &Query{Request: listPlayrolls, Scope: "User"},
		CreatePlayroll:  &Mutation{Request: createPlayroll, Scope: "User"},
		UpdatePlayroll:  &Mutation{Request: updatePlayroll, Scope: "User"},
		DeletePlayroll:  &Mutation{Request: deletePlayroll, Scope: "User"},
	},
	Types: &[]*Type{
		&Type{Name: "CreatePlayrollInput", IsInput: true, Model: &CreatePlayrollInput{}},
		&Type{Name: "UpdatePlayrollInput", IsInput: true, Model: &UpdatePlayrollInput{}},
	},
}
