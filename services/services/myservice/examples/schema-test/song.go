package main

import (
	"fmt"

	"github.com/graphql-go/graphql"
)

type Song struct {
	Model `gql:"MODEL"`
	Name  string `gql:"name: String"`
	// MusicSource MusicSource `gql:"musicSource: MusicSource"`
	// Album       Album       `gql:"album: String!"`
	// Genre       Genre       `gql:"genre: String!"`
	// Songlist    Songlist    `gql:"songlist: String!"` // many to many relationship
}

type SongMethods struct {
	GetSong     *Query    `gql:"song: Song"`
	SearchSongs *Query    `gql:"searchSongs: [Song]"`
	ListSongs   *Query    `gql:"listSongs: [Song]"`
	CreateSong  *Mutation `gql:"createSong: Song"`
	UpdateSong  *Mutation `gql:"updateSong: Song"`
	DeleteSong  *Mutation `gql:"deleteSong: Song"`
}

func getSong(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("song, args:%+v\n", params.Args)
	return &Song{}, nil
}

func searchSongs(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("searchSongs, args:%+v\n", params.Args)
	return []*Song{&Song{}, &Song{}}, nil
}

func listSongs(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("listSongs, args:%+v\n", params.Args)
	return []*Song{&Song{}, &Song{}}, nil
}

func createSong(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("createSong, args:%+v\n", params.Args)
	return &Song{}, nil
}

func updateSong(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("updateSong, args:%+v\n", params.Args)
	return &Song{}, nil
}

func deleteSong(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("deleteSong, args:%+v\n", params.Args)
	return &Song{}, nil
}

var SongEntity = &Entity{
	Name:  "Song",
	Model: &Song{},
	Methods: &SongMethods{
		GetSong:     &Query{Request: getSong, Scope: "Public"},
		SearchSongs: &Query{Request: searchSongs, Scope: "Public"},
		ListSongs:   &Query{Request: listSongs, Scope: "Admin"},
		CreateSong:  &Mutation{Request: createSong, Scope: "Admin"},
		UpdateSong:  &Mutation{Request: updateSong, Scope: "Admin"},
		DeleteSong:  &Mutation{Request: deleteSong, Scope: "Admin"},
	},
}
