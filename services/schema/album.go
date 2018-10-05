package schema

import (
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type Album struct {
	utils.Model `gql:"MODEL"`
	Name        string `gql:"name: String"`
	// MusicSource MusicSource `gql:"musicSource: MusicSource"`
	// Artist Artist `gql:"artist:Artist"`
}

type AlbumMethods struct {
	GetAlbum     *utils.Query    `gql:"album: Album"`
	SearchAlbums *utils.Query    `gql:"searchAlbums: [Album]"`
	ListAlbums   *utils.Query    `gql:"listAlbums: [Album]"`
	CreateAlbum  *utils.Mutation `gql:"createAlbum: Album"`
	UpdateAlbum  *utils.Mutation `gql:"updateAlbum: Album"`
	DeleteAlbum  *utils.Mutation `gql:"deleteAlbum: Album"`
}

func getAlbum(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Album{}, nil
}

func searchAlbums(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Album{&Album{}, &Album{}}, nil
}

func listAlbums(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Album{&Album{}, &Album{}}, nil
}

func createAlbum(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Album{}, nil
}

func updateAlbum(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Album{}, nil
}

func deleteAlbum(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Album{}, nil
}

var AlbumEntity = &utils.Entity{
	Name:  "Album",
	Model: &Album{},
	Methods: &AlbumMethods{
		GetAlbum:     &utils.Query{Request: getAlbum, Scope: "Public"},
		SearchAlbums: &utils.Query{Request: searchAlbums, Scope: "Public"},
		ListAlbums:   &utils.Query{Request: listAlbums, Scope: "Admin"},
		CreateAlbum:  &utils.Mutation{Request: createAlbum, Scope: "Admin"},
		UpdateAlbum:  &utils.Mutation{Request: updateAlbum, Scope: "Admin"},
		DeleteAlbum:  &utils.Mutation{Request: deleteAlbum, Scope: "Admin"},
	},
}
