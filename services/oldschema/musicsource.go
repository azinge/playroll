package schema

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/cazinge/playroll/services/utils/pagination"
	"github.com/cazinge/playroll/services/utils/search"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type SourceType string

const (
	SongType   SourceType = "Song"
	AlbumType  SourceType = "Album"
	ArtistType SourceType = "Artist"
)

type ProviderType string

const (
	SpotifyType    ProviderType = "Spotify"
	AppleMusicType ProviderType = "AppleMusic"
)

type MusicSource struct {
	utils.Model  `gql:"MODEL"`
	Type         SourceType   `gql:"type: String" json:"type"`
	Name         string       `gql:"name: String" json:"name"`
	Provider     ProviderType `gql:"provider: String" json:"provider"`
	ProviderID   string       `gql:"providerID: String" json:"providerID"`
	Roll         Roll
	RollID       uint
	RollOutput   RollOutput
	RollOutputID uint
}

type MusicSourceMethods struct {
	GetMusicSource     *utils.Query    `gql:"musicSource(id: ID!): MusicSource"`
	SearchMusicSources *utils.Query    `gql:"searchMusicSources(options: SearchInput!): [MusicSource]"`
	ListMusicSources   *utils.Query    `gql:"listMusicSources(options: PaginationInput!): [MusicSource]"`
	DeleteMusicSource  *utils.Mutation `gql:"deleteMusicSource(id: ID!): MusicSource"`
}

func getMusicSource(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var musicSource MusicSource
	if err := utils.HandleGetSingularModel(params, db, &musicSource); err != nil {
		return nil, err
	}
	return musicSource, nil
}

func searchMusicSources(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var musicSources []MusicSource
	if err := search.Query(params, db, &musicSources); err != nil {
		return nil, err
	}
	return musicSources, nil
}

func listMusicSources(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var musicSources []MusicSource
	pagination.HandlePagination(params, db, &musicSources)
	return musicSources, nil
}

func deleteMusicSource(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	musicSource := &MusicSource{}
	id, ok := params.Args["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	if err := db.Where("id = ?", id).First(&musicSource).Error; err != nil {
		fmt.Println("error deleting musicSource: " + err.Error())
		return nil, err
	}

	associationsToRemove := []string{"Roll", "RollOutput"}
	utils.HandleRemoveAssociationReferences(db, musicSource, associationsToRemove)
	db.Delete(&musicSource)
	return musicSource, nil
}

var MusicSourceInputType = &utils.Type{Name: "MusicSourceInput", IsInput: true, Model: &MusicSource{}}

var MusicSourceEntity = &utils.Entity{
	Name:  "MusicSource",
	Model: &MusicSource{},
	Methods: &MusicSourceMethods{
		GetMusicSource:     &utils.Query{Request: getMusicSource, Scope: "User"},
		SearchMusicSources: &utils.Query{Request: searchMusicSources, Scope: "User"},
		ListMusicSources:   &utils.Query{Request: listMusicSources, Scope: "User"},
		DeleteMusicSource:  &utils.Mutation{Request: deleteMusicSource, Scope: "User"},
	},
}
