package schema

import (
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type Genre struct {
	utils.Model `gql:"MODEL"`
	Name        string `gql:"name: String"`
	// MusicSource MusicSource `gql:"musicSource: MusicSource"`
}

type GenreMethods struct {
	GetGenre     *utils.Query    `gql:"genre: Genre"`
	SearchGenres *utils.Query    `gql:"searchGenres: [Genre]"`
	ListGenres   *utils.Query    `gql:"listGenres: [Genre]"`
	CreateGenre  *utils.Mutation `gql:"createGenre: Genre"`
	UpdateGenre  *utils.Mutation `gql:"updateGenre: Genre"`
	DeleteGenre  *utils.Mutation `gql:"deleteGenre: Genre"`
}

func getGenre(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Genre{}, nil
}

func searchGenres(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Genre{&Genre{}, &Genre{}}, nil
}

func listGenres(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Genre{&Genre{}, &Genre{}}, nil
}

func createGenre(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Genre{}, nil
}

func updateGenre(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Genre{}, nil
}

func deleteGenre(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Genre{}, nil
}

var GenreEntity = &utils.Entity{
	Name:  "Genre",
	Model: &Genre{},
	Methods: &GenreMethods{
		GetGenre:     &utils.Query{Request: getGenre, Scope: "Public"},
		SearchGenres: &utils.Query{Request: searchGenres, Scope: "Public"},
		ListGenres:   &utils.Query{Request: listGenres, Scope: "Admin"},
		CreateGenre:  &utils.Mutation{Request: createGenre, Scope: "Admin"},
		UpdateGenre:  &utils.Mutation{Request: updateGenre, Scope: "Admin"},
		DeleteGenre:  &utils.Mutation{Request: deleteGenre, Scope: "Admin"},
	},
}
