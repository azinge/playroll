package main

import (
	"fmt"

	"github.com/graphql-go/graphql"
)

type Playroll struct {
	Model `gql:"MODEL"`
	Name  string `json:"name" gql:"name: String"`
}

type PlayrollMethods struct {
	GetPlayroll      *Query    `gql:"playroll: Playroll"`
	SearchPlayrolls  *Query    `gql:"searchPlayrolls: Playroll"`
	ListPlayrolls    *Query    `gql:"listPlayrolls: Playroll"`
	CreatePlayroll   *Mutation `gql:"createPlayroll: Playroll"`
	UpdatePlayroll   *Mutation `gql:"updatePlayroll: Playroll"`
	DeletePlayroll   *Mutation `gql:"deletePlayroll: Playroll"`
	GenerateSonglist *Mutation `gql:"generateSonglist: Playroll"`
}

func getPlayroll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("playroll, args:%+v\n", params.Args)
	return nil, nil
}

func searchPlayrolls(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("searchPlayrolls, args:%+v\n", params.Args)
	return nil, nil
}

func listPlayrolls(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("listPlayrolls, args:%+v\n", params.Args)
	return nil, nil
}

func createPlayroll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("createPlayroll, args:%+v\n", params.Args)
	return nil, nil
}

func updatePlayroll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("updatePlayroll, args:%+v\n", params.Args)
	return nil, nil
}

func deletePlayroll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("deletePlayroll, args:%+v\n", params.Args)
	return nil, nil
}

func generateSonglist(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("generateSonglist, args:%+v\n", params.Args)
	return nil, nil
}

var PlayrollEntity = &Entity{
	Name:  "Playroll",
	Model: &Playroll{},
	Queries: &PlayrollMethods{
		GetPlayroll:      &Query{Request: getPlayroll, Scope: "User"},
		SearchPlayrolls:  &Query{Request: searchPlayrolls, Scope: "User"},
		ListPlayrolls:    &Query{Request: listPlayrolls, Scope: "User"},
		CreatePlayroll:   &Mutation{Request: createPlayroll, Scope: "User"},
		UpdatePlayroll:   &Mutation{Request: updatePlayroll, Scope: "User"},
		DeletePlayroll:   &Mutation{Request: deletePlayroll, Scope: "User"},
		GenerateSonglist: &Mutation{Request: generateSonglist, Scope: "User"},
	},
}
