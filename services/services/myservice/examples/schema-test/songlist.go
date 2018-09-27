package main

import (
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type Songlist struct {
	Model   `gql:"MODEL"`
	Starred bool `gql:"starred: Boolean"`
	Primary bool `gql:"primary: Boolean"`
	// Playroll Playroll `gql:"playroll: Playroll"`
	// Songs    []Song   `gql:"songs: [Song]"` // many to many relationship
}

type SonglistMethods struct {
	GetSonglist      *Query    `gql:"songlist: Songlist"`
	SearchSonglists  *Query    `gql:"searchSonglists: [Songlist]"`
	ListSonglists    *Query    `gql:"listSonglists: [Songlist]"`
	CreateSonglist   *Mutation `gql:"createSonglist: Songlist"`
	UpdateSonglist   *Mutation `gql:"updateSonglist: Songlist"`
	DeleteSonglist   *Mutation `gql:"deleteSonglist: Songlist"`
	GenerateSonglist *Mutation `gql:"generateSonglist: Songlist"`
}

func getSonglist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Songlist{}, nil
}

func searchSonglists(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Songlist{&Songlist{}, &Songlist{}}, nil
}

func listSonglists(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Songlist{&Songlist{}, &Songlist{}}, nil
}

func createSonglist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Songlist{}, nil
}

func updateSonglist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Songlist{}, nil
}

func deleteSonglist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Songlist{}, nil
}

func generateSonglist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Songlist{}, nil
}

var SonglistEntity = &Entity{
	Name:  "Songlist",
	Model: &Songlist{},
	Methods: &SonglistMethods{
		GetSonglist:      &Query{Request: getSonglist, Scope: "User"},
		SearchSonglists:  &Query{Request: searchSonglists, Scope: "User"},
		ListSonglists:    &Query{Request: listSonglists, Scope: "User"},
		CreateSonglist:   &Mutation{Request: createSonglist, Scope: "User"},
		UpdateSonglist:   &Mutation{Request: updateSonglist, Scope: "User"},
		DeleteSonglist:   &Mutation{Request: deleteSonglist, Scope: "User"},
		GenerateSonglist: &Mutation{Request: generateSonglist, Scope: "User"},
	},
}
