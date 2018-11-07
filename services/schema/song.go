package schema

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	"github.com/mitchellh/mapstructure"
)

type Song struct {
	utils.Model `gql:"MODEL"`
	Name        string `gql:"name: String"`
	MusicSource MusicSource `gql:"musicSource: MusicSource" gorm:"type:jsonb;not null"`
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
		return nil, utils.HandleTypeAssertionError("id")
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
	MusicSource MusicSource `gql:"musicSource: MusicSourceInput" json: musicSource`
}

func createSong(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	name, ok := params.Args["song"].(map[string]interface{})["name"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("name")
	}

	musicSource, ok := params.Args["song"].(map[string]interface{})["musicSource"].
		(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("musicSource")
	}

	ms := MusicSource{}
	mapstructure.Decode(musicSource, &ms)

	song := &Song{
		Name: name,
		MusicSource: ms,
	}
	if err := db.Create(&song).Error; err != nil {
		fmt.Println("error creating song: " + err.Error())
		return nil, err
	}
	return song, nil
}

type UpdateSongInput struct {
	ID   string `gql:"id: ID!"`
	Name string `gql:"name: String"`
	MusicSource MusicSource `gql:"musicSource: MusicSourceInput" json: musicSource`
}

func updateSong(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	song := &Song{}
	id, ok := params.Args["song"].(map[string]interface{})["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	name, ok := params.Args["name"].(map[string]interface{})["name"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("name")
	}

	musicSource, ok := params.Args["song"].(map[string]interface{})["musicSource"].
		(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("musicSource")
	}

	ms := MusicSource{}
	mapstructure.Decode(musicSource, &ms)

	if err := db.Where("id = ?", id).First(&song).Error; err != nil {
		fmt.Println("getting song to update: " + err.Error())
		return nil, err
	}

	song.Name = name
	song.MusicSource = ms
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
		return nil, utils.HandleTypeAssertionError("id")
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
