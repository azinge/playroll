package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	"github.com/mitchellh/mapstructure"
)

type Album struct {
	utils.Model `gql:"MODEL"`
	Name        string      `gql:"name: String"`
	MusicSource MusicSource `gql:"musicSource: MusicSource" gorm:"type:jsonb;not null"`
	// Artist Artist `gql:"artist:Artist"`
}

type AlbumMethods struct {
	GetAlbum     *utils.Query    `gql:"album(id: ID!): Album"`
	SearchAlbums *utils.Query    `gql:"searchAlbums: [Album]"`
	ListAlbums   *utils.Query    `gql:"listAlbums: [Album]"`
	CreateAlbum  *utils.Mutation `gql:"createAlbum(album: CreateAlbumInput!): Album"`
	UpdateAlbum  *utils.Mutation `gql:"updateAlbum(album: UpdateAlbumInput!): Album"`
	DeleteAlbum  *utils.Mutation `gql:"deleteAlbum(id: ID!): Album"`
}

func getAlbum(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	album := &Album{}
	id, ok := params.Args["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	if err := db.Where("id = ?", id).First(album).Error; err != nil {
		fmt.Println("Error getting album: " + err.Error())
		return nil, err
	}
	return album, nil
}

func searchAlbums(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Album{&Album{}, &Album{}}, nil
}

func listAlbums(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	albums := []*Album{}
	// currently does not handle offset and count
	if err := db.Find(&albums).Error; err != nil {
		fmt.Println("Error listing albums: " + err.Error())
		return nil, err
	}
	return albums, nil
}

type CreateAlbumInput struct {
	Name        string      `gql:"name: String"`
	MusicSource MusicSource `gql:"musicSource: MusicSourceInput" json: musicSource`
}

func createAlbum(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	name, ok := params.Args["album"].(map[string]interface{})["name"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("name")
	}

	musicSource, ok := params.Args["album"].(map[string]interface{})["musicSource"].(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("musicSource")
	}

	ms := MusicSource{}
	mapstructure.Decode(musicSource, &ms)

	album := &Album{
		Name:        name,
		MusicSource: ms,
	}
	if err := db.Create(album).Error; err != nil {
		fmt.Println("Error creating playroll: " + err.Error())
		return nil, err
	}
	return album, nil
}

type UpdateAlbumInput struct {
	ID          string      `gql:"id: ID!"`
	MusicSource MusicSource `gql:"musicSource: MusicSourceInput" json: musicSource`
	Name        string      `gql:"name: String"`
}

func updateAlbum(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	album := &Album{}
	id, ok := params.Args["album"].(map[string]interface{})["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	name, ok := params.Args["album"].(map[string]interface{})["name"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("name")
	}

	musicSource, ok := params.Args["album"].(map[string]interface{})["musicSource"].(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("musicSource")
	}

	ms := MusicSource{}
	mapstructure.Decode(musicSource, &ms)

	if err := db.Where("id = ?", id).First(album).Error; err != nil {
		fmt.Println("getting album to update: " + err.Error())
		return nil, err
	}
	album.Name = name
	album.MusicSource = ms
	if err := db.Save(album).Error; err != nil {
		fmt.Println("error updating album: " + err.Error())
		return nil, err
	}
	return album, nil
}

func deleteAlbum(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	album := &Album{}
	id, ok := params.Args["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	if err := db.Where("id = ?", id).First(album).Error; err != nil {
		fmt.Println("Error deleting album: " + err.Error())
		return nil, err
	}
	db.Delete(album)
	return album, nil
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
	Types: &[]*utils.Type{
		&utils.Type{Name: "CreateAlbumInput", IsInput: true, Model: &CreateAlbumInput{}},
		&utils.Type{Name: "UpdateAlbumInput", IsInput: true, Model: &UpdateAlbumInput{}},
	},
}
