package schema

import (
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type Song struct {
	utils.Model `gql:"MODEL"`
	Name        string `gql:"name: String"`
	// MusicSource MusicSource `gql:"musicSource: MusicSource"`
	// Album       Album       `gql:"album: String!"`
	// Genre       Genre       `gql:"genre: String!"`
	// Songlist    Songlist    `gql:"songlist: String!"` // many to many relationship
}

type SongMethods struct {
	GetSong     *utils.Query    `gql:"song: Song"`
	SearchSongs *utils.Query    `gql:"searchSongs: [Song]"`
	ListSongs   *utils.Query    `gql:"listSongs: [Song]"`
	CreateSong  *utils.Mutation `gql:"createSong: Song"`
	UpdateSong  *utils.Mutation `gql:"updateSong: Song"`
	DeleteSong  *utils.Mutation `gql:"deleteSong: Song"`
}

func getSong(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Song{}, nil
}

func searchSongs(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Song{&Song{}, &Song{}}, nil
}

func listSongs(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Song{&Song{}, &Song{}}, nil
}

func createSong(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Song{}, nil
}

func updateSong(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Song{}, nil
}

func deleteSong(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Song{}, nil
}

var SongEntity = &utils.Entity{
	Name:  "Song",
	Model: &Song{},
	Methods: &SongMethods{
		GetSong:     &utils.Query{Request: getSong, Scope: "Public"},
		SearchSongs: &utils.Query{Request: searchSongs, Scope: "Public"},
		ListSongs:   &utils.Query{Request: listSongs, Scope: "Admin"},
		CreateSong:  &utils.Mutation{Request: createSong, Scope: "Admin"},
		UpdateSong:  &utils.Mutation{Request: updateSong, Scope: "Admin"},
		DeleteSong:  &utils.Mutation{Request: deleteSong, Scope: "Admin"},
	},
}
