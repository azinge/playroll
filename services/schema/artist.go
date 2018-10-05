package schema

import (
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type Artist struct {
	utils.Model `gql:"MODEL"`
	Title       string `gql:"name: String"`
	// MusicSource MusicSource `gql:"musicSource: MusicSource"`
}

type ArtistMethods struct {
	GetArtist     *utils.Query    `gql:"artist: Artist"`
	SearchArtists *utils.Query    `gql:"searchArtists: [Artist]"`
	ListArtists   *utils.Query    `gql:"listArtists: [Artist]"`
	CreateArtist  *utils.Mutation `gql:"createArtist: Artist"`
	UpdateArtist  *utils.Mutation `gql:"updateArtist: Artist"`
	DeleteArtist  *utils.Mutation `gql:"deleteArtist: Artist"`
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

var ArtistEntity = &utils.Entity{
	Name:  "Artist",
	Model: &Artist{},
	Methods: &ArtistMethods{
		GetArtist:     &utils.Query{Request: getArtist, Scope: "Public"},
		SearchArtists: &utils.Query{Request: searchArtists, Scope: "Public"},
		ListArtists:   &utils.Query{Request: listArtists, Scope: "Admin"},
		CreateArtist:  &utils.Mutation{Request: createArtist, Scope: "Admin"},
		UpdateArtist:  &utils.Mutation{Request: updateArtist, Scope: "Admin"},
		DeleteArtist:  &utils.Mutation{Request: deleteArtist, Scope: "Admin"},
	},
}
