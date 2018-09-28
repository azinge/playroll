package main

import (
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
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

func getArtist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Artist{}, nil
}

func searchArtists(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Artist{&Artist{}, &Artist{}}, nil
}

func listArtists(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Artist{&Artist{}, &Artist{}}, nil
}

func createArtist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Artist{}, nil
}

func updateArtist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Artist{}, nil
}

func deleteArtist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
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
