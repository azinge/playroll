package main

import (
	"fmt"

	"github.com/graphql-go/graphql"
)

type Album struct {
	Model `gql:"MODEL"`
	Name  string `gql:"name: String"`
	// MusicSource MusicSource `gql:"musicSource: MusicSource"`
	// Artist Artist `gql:"artist:Artist"`
}

type AlbumMethods struct {
	GetAlbum     *Query    `gql:"album: Album"`
	SearchAlbums *Query    `gql:"searchAlbums: [Album]"`
	ListAlbums   *Query    `gql:"listAlbums: [Album]"`
	CreateAlbum  *Mutation `gql:"createAlbum: Album"`
	UpdateAlbum  *Mutation `gql:"updateAlbum: Album"`
	DeleteAlbum  *Mutation `gql:"deleteAlbum: Album"`
}

func getAlbum(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("album, args:%+v\n", params.Args)
	return &Album{}, nil
}

func searchAlbums(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("searchAlbums, args:%+v\n", params.Args)
	return &[]Album{}, nil
}

func listAlbums(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("listAlbums, args:%+v\n", params.Args)
	return &[]Album{}, nil
}

func createAlbum(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("createAlbum, args:%+v\n", params.Args)
	return &Album{}, nil
}

func updateAlbum(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("updateAlbum, args:%+v\n", params.Args)
	return &Album{}, nil
}

func deleteAlbum(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("deleteAlbum, args:%+v\n", params.Args)
	return &Album{}, nil
}

var AlbumEntity = &Entity{
	Name:  "Album",
	Model: &Album{},
	Methods: &AlbumMethods{
		GetAlbum:     &Query{Request: getAlbum, Scope: "Public"},
		SearchAlbums: &Query{Request: searchAlbums, Scope: "Public"},
		ListAlbums:   &Query{Request: listAlbums, Scope: "Admin"},
		CreateAlbum:  &Mutation{Request: createAlbum, Scope: "Admin"},
		UpdateAlbum:  &Mutation{Request: updateAlbum, Scope: "Admin"},
		DeleteAlbum:  &Mutation{Request: deleteAlbum, Scope: "Admin"},
	},
}
