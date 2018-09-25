package main

import (
	"fmt"

	"github.com/graphql-go/graphql"
)

type Artist struct {
	Model `gql:"MODEL"`
	Title string `gql:"name: String"`
	// MusicSource MusicSource `gql:"musicSource: MusicSource"`
}

type ArtistMethods struct {
	GetArtist     *Query    `gql:"artist: Artist"`
	SearchArtists *Query    `gql:"searchArtists: [Artist]"`
	ListArtists   *Query    `gql:"listArtists: [Artist]"`
	CreateArtist  *Mutation `gql:"createArtist: Artist"`
	UpdateArtist  *Mutation `gql:"updateArtist: Artist"`
	DeleteArtist  *Mutation `gql:"deleteArtist: Artist"`
}

func getArtist(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("artist, args:%+v\n", params.Args)
	return &Artist{}, nil
}

func searchArtists(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("searchArtists, args:%+v\n", params.Args)
	return &[]Artist{}, nil
}

func listArtists(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("listArtists, args:%+v\n", params.Args)
	return &[]Artist{}, nil
}

func createArtist(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("createArtist, args:%+v\n", params.Args)
	return &Artist{}, nil
}

func updateArtist(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("updateArtist, args:%+v\n", params.Args)
	return &Artist{}, nil
}

func deleteArtist(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("deleteArtist, args:%+v\n", params.Args)
	return &Artist{}, nil
}

var ArtistEntity = &Entity{
	Name:  "Artist",
	Model: &Artist{},
	Methods: &ArtistMethods{
		GetArtist:     &Query{Request: getArtist, Scope: "Public"},
		SearchArtists: &Query{Request: searchArtists, Scope: "Public"},
		ListArtists:   &Query{Request: listArtists, Scope: "Admin"},
		CreateArtist:  &Mutation{Request: createArtist, Scope: "Admin"},
		UpdateArtist:  &Mutation{Request: updateArtist, Scope: "Admin"},
		DeleteArtist:  &Mutation{Request: deleteArtist, Scope: "Admin"},
	},
}
