package main

import (
	"fmt"

	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type Genre struct {
	Model `gql:"MODEL"`
	Name  string `gql:"name: String"`
	// MusicSource MusicSource `gql:"musicSource: MusicSource"`
}

type GenreMethods struct {
	GetGenre     *Query    `gql:"genre: Genre"`
	SearchGenres *Query    `gql:"searchGenres: [Genre]"`
	ListGenres   *Query    `gql:"listGenres: [Genre]"`
	CreateGenre  *Mutation `gql:"createGenre: Genre"`
	UpdateGenre  *Mutation `gql:"updateGenre: Genre"`
	DeleteGenre  *Mutation `gql:"deleteGenre: Genre"`
}

func getGenre(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	fmt.Printf("genre, args:%+v\n", params.Args)
	return &Genre{}, nil
}

func searchGenres(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	fmt.Printf("searchGenres, args:%+v\n", params.Args)
	return []*Genre{&Genre{}, &Genre{}}, nil
}

func listGenres(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	fmt.Printf("listGenres, args:%+v\n", params.Args)
	return []*Genre{&Genre{}, &Genre{}}, nil
}

func createGenre(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	fmt.Printf("createGenre, args:%+v\n", params.Args)
	return &Genre{}, nil
}

func updateGenre(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	fmt.Printf("updateGenre, args:%+v\n", params.Args)
	return &Genre{}, nil
}

func deleteGenre(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	fmt.Printf("deleteGenre, args:%+v\n", params.Args)
	return &Genre{}, nil
}

var GenreEntity = &Entity{
	Name:  "Genre",
	Model: &Genre{},
	Methods: &GenreMethods{
		GetGenre:     &Query{Request: getGenre, Scope: "Public"},
		SearchGenres: &Query{Request: searchGenres, Scope: "Public"},
		ListGenres:   &Query{Request: listGenres, Scope: "Admin"},
		CreateGenre:  &Mutation{Request: createGenre, Scope: "Admin"},
		UpdateGenre:  &Mutation{Request: updateGenre, Scope: "Admin"},
		DeleteGenre:  &Mutation{Request: deleteGenre, Scope: "Admin"},
	},
}
