package main

import (
	"fmt"

	"github.com/graphql-go/graphql"
)

type Songlist struct {
	Model   `gql:"MODEL"`
	Starred bool `json:"starred" gql:"starred: Boolean"`
	Primary bool `json:"primary" gql:"primary: Boolean"`
	// Playroll Playroll `json:"playroll" gql:"playroll: Playroll"`
	// Songs    []Song   `json:"songs" gql:"songs: [Song]"` // many to many relationship
}

type SonglistMethods struct {
	GetSonglist     *Query    `gql:"songlist: Songlist"`
	SearchSonglists *Query    `gql:"searchSonglists: Songlist"`
	ListSonglists   *Query    `gql:"listSonglists: Songlist"`
	CreateSonglist  *Mutation `gql:"createSonglist: Songlist"`
	UpdateSonglist  *Mutation `gql:"updateSonglist: Songlist"`
	DeleteSonglist  *Mutation `gql:"deleteSonglist: Songlist"`
}

func getSonglist(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("songlist, args:%+v\n", params.Args)
	return nil, nil
}

func searchSonglists(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("searchSonglists, args:%+v\n", params.Args)
	return nil, nil
}

func listSonglists(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("listSonglists, args:%+v\n", params.Args)
	return nil, nil
}

func createSonglist(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("createSonglist, args:%+v\n", params.Args)
	return nil, nil
}

func updateSonglist(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("updateSonglist, args:%+v\n", params.Args)
	return nil, nil
}

func deleteSonglist(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("deleteSonglist, args:%+v\n", params.Args)
	return nil, nil
}

var SonglistEntity = &Entity{
	Name:  "Songlist",
	Model: &Songlist{},
	Queries: &SonglistMethods{
		GetSonglist:     &Query{Request: getSonglist, Scope: "User"},
		SearchSonglists: &Query{Request: searchSonglists, Scope: "User"},
		ListSonglists:   &Query{Request: listSonglists, Scope: "User"},
		CreateSonglist:  &Mutation{Request: createSonglist, Scope: "User"},
		UpdateSonglist:  &Mutation{Request: updateSonglist, Scope: "User"},
		DeleteSonglist:  &Mutation{Request: deleteSonglist, Scope: "User"},
	},
}
