package schema

import (
	"fmt"
	"errors"
	"time"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type Song struct {
	ID        uint       `gql:"id: ID" gorm:"primary_key"`
	CreatedAt time.Time  `gql:"createdAt: String"`
	UpdatedAt time.Time  `gql:"updatedAt: String"`
	DeletedAt *time.Time `gql:"deletedAt: String"`
	Name        string `gql:"name: String"`
	// MusicSource MusicSource `gql:"musicSource: MusicSource"`
	// Album       Album       `gql:"album: String!"`
	// Genre       Genre       `gql:"genre: String!"`
	// Songlist    Songlist    `gql:"songlist: String!"` // many to many relationship
}

type SongMethods struct {
	GetSong     *utils.Query    `gql:"song(id: ID!): Song"`
	SearchSongs *utils.Query    `gql:"searchSongs: [Song]"`
	ListSongs   *utils.Query    `gql:"listSongs(offset: Int, count: Int): [Song]"`
	CreateSong  *utils.Mutation `gql:"createSong(song: CreateSongInput!): Song"`
	UpdateSong  *utils.Mutation `gql:"updateSong(song: UpdateSongInput!): Song"`
	DeleteSong  *utils.Mutation `gql:"deleteSong(id: ID!): Song"`
}

func getSong(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	song := &Song{}
	id, ok := params.Args["id"].(string)
	if !ok {
		err := fmt.Sprintf("Expected id of type(string) but got type %T", ok);
		fmt.Println(err);
		return nil, errors.New(err)
	}

	if err := db.Where("id = ?", id).First(&song).Error; err != nil {
		fmt.Println("error getting song: " + err.Error())
		return nil, err
	}
	return song, nil
}

func searchSongs(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Song{&Song{}, &Song{}}, nil
}

func listSongs(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	songs := []*Song{}
	if err := db.Find(&songs).Error; err != nil {
		fmt.Println("error listing songs: " + err.Error())
		return nil, err
	}
	return songs, nil
}

type CreateSongInput struct {
	Name string `gql:"name: String"`
}

func createSong(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	name, ok := params.Args["song"].(map[string]interface{})["name"].(string)
	if !ok {
		err := fmt.Sprintf("Expected name of type(string) but got type %T", ok);
		fmt.Println(err);
		return nil, errors.New(err)
	}

	song := &Song{Name: name}
	if err := db.Create(&song).Error; err != nil {
		fmt.Println("error creating song: " + err.Error())
		return nil, err
	}
	return song, nil
}

type UpdateSongInput struct {
	ID string `gql:"id: ID!"`
	Name string `gql:"name: String"`
}

func updateSong(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	song := &Song{}
	id, ok := params.Args["song"].(map[string]interface{})["id"].(string)
	if !ok {
		err := fmt.Sprintf("Expected id of type(string) but got type %T", ok);
		fmt.Println(err);
		return nil, errors.New(err)
	}

	name, ok := params.Args["name"].(map[string]interface{})["name"].(string)
	if !ok {
		err := fmt.Sprintf("Expected name of type(string) but got type %T", ok);
		fmt.Println(err);
		return nil, errors.New(err)
	}

	if err := db.Where("id = ?", id).First(&song).Error; err != nil {
		fmt.Println("getting song to update: " + err.Error())
		return nil, err
	}
	song.Name = name
	if err := db.Save(&song).Error; err != nil {
		fmt.Println("error updating song: " + err.Error())
		return nil, err
	}
	return song, nil
}

func deleteSong(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	song := &Song{}
	id, ok := params.Args["id"].(string)
	if !ok {
		err := fmt.Sprintf("Expected id of type(string) but got type %T", ok);
		fmt.Println(err);
		return nil, errors.New(err)
	}

	if err := db.Where("id = ?", id).First(&song).Error; err != nil {
		fmt.Println("error deleting song: " + err.Error())
		return nil, err
	}
	db.Delete(&song)
	return song, nil
}

var SongEntity = &utils.Entity{
	Name:  "Song",
	Model: &Song{},
	Methods: &SongMethods{
		GetSong:     &utils.Query{Request: getSong, Scope: "Public"},
		SearchSongs: &utils.Query{Request: searchSongs, Scope: "Public"},
		ListSongs:   &utils.Query{Request: listSongs, Scope: "Admin"},
		CreateSong:  &utils.Mutation{Request: createSong, Scope: "Admin"},
		UpdateSong:  &utils.Mutation{Request: updateSong, Scope: "Admin"},
		DeleteSong:  &utils.Mutation{Request: deleteSong, Scope: "Admin"},
	},
	Types: &[]*utils.Type{
		&utils.Type{Name: "CreateSongInput", IsInput: true, Model: &CreateSongInput{}},
		&utils.Type{Name: "UpdateSongInput", IsInput: true, Model: &UpdateSongInput{}},
	},
}
