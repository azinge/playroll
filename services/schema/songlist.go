package schema

import (
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type Songlist struct {
	utils.Model `gql:"MODEL"`
	Starred     bool `gql:"starred: Boolean"`
	Primary     bool `gql:"primary: Boolean"`
	// Playroll Playroll `gql:"playroll: Playroll"`
	// Songs    []Song   `gql:"songs: [Song]"` // many to many relationship
}

type SonglistMethods struct {
	GetSonglist      *utils.Query    `gql:"songlist: Songlist"`
	SearchSonglists  *utils.Query    `gql:"searchSonglists: [Songlist]"`
	ListSonglists    *utils.Query    `gql:"listSonglists: [Songlist]"`
	CreateSonglist   *utils.Mutation `gql:"createSonglist: Songlist"`
	UpdateSonglist   *utils.Mutation `gql:"updateSonglist: Songlist"`
	DeleteSonglist   *utils.Mutation `gql:"deleteSonglist: Songlist"`
	GenerateSonglist *utils.Mutation `gql:"generateSonglist: Songlist"`
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

var SonglistEntity = &utils.Entity{
	Name:  "Songlist",
	Model: &Songlist{},
	Methods: &SonglistMethods{
		GetSonglist:      &utils.Query{Request: getSonglist, Scope: "User"},
		SearchSonglists:  &utils.Query{Request: searchSonglists, Scope: "User"},
		ListSonglists:    &utils.Query{Request: listSonglists, Scope: "User"},
		CreateSonglist:   &utils.Mutation{Request: createSonglist, Scope: "User"},
		UpdateSonglist:   &utils.Mutation{Request: updateSonglist, Scope: "User"},
		DeleteSonglist:   &utils.Mutation{Request: deleteSonglist, Scope: "User"},
		GenerateSonglist: &utils.Mutation{Request: generateSonglist, Scope: "User"},
	},
}
