package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	"github.com/mitchellh/mapstructure"
)

type Genre struct {
	utils.Model `gql:"MODEL"`
	Name        string      `gql:"name: String"`
	MusicSource MusicSource `gql:"musicSource: MusicSource" gorm:"type:jsonb;not null"`
}

type GenreMethods struct {
	GetGenre     *utils.Query    `gql:"genre(id: ID!): Genre"`
	SearchGenres *utils.Query    `gql:"searchGenres: [Genre]"`
	ListGenres   *utils.Query    `gql:"listGenres: [Genre]"`
	CreateGenre  *utils.Mutation `gql:"createGenre(genre: CreateGenreInput!): Genre"`
	UpdateGenre  *utils.Mutation `gql:"updateGenre(genre: UpdateGenreInput!): Genre"`
	DeleteGenre  *utils.Mutation `gql:"deleteGenre(id: ID!): Genre"`
}

func getGenre(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	genre := &Genre{}
	id, ok := params.Args["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	if err := db.Where("id = ?", id).First(&genre).Error; err != nil {
		fmt.Println("error getting genre: " + err.Error())
		return nil, err
	}
	return genre, nil
}

func searchGenres(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Genre{&Genre{}, &Genre{}}, nil
}

func listGenres(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	genres := []*Genre{}
	if err := db.Find(genres).Error; err != nil {
		fmt.Println("error listing genres: " + err.Error())
		return nil, err
	}
	return genres, nil
}

type CreateGenreInput struct {
	Name        string      `gql:"name: String"`
	MusicSource MusicSource `gql:"musicSource: MusicSourceInput" json: musicSource`
}

func createGenre(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	name, ok := params.Args["genre"].(map[string]interface{})["name"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("name")
	}

	musicSource, ok := params.Args["genre"].(map[string]interface{})["musicSource"].(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("musicSource")
	}

	ms := MusicSource{}
	mapstructure.Decode(musicSource, &ms)

	genre := &Genre{
		Name:        name,
		MusicSource: ms,
	}
	if err := db.Create(&genre).Error; err != nil {
		fmt.Println("error creating genre: " + err.Error())
		return nil, err
	}
	return genre, nil
}

type UpdateGenreInput struct {
	ID          string      `gql:"id: ID!"`
	Name        string      `gql:"name: String"`
	MusicSource MusicSource `gql:"musicSource: MusicSourceInput" json: musicSource`
}

func updateGenre(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	genre := &Genre{}
	id, ok := params.Args["genre"].(map[string]interface{})["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	name, ok := params.Args["genre"].(map[string]interface{})["name"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("name")
	}

	musicSource, ok := params.Args["genre"].(map[string]interface{})["musicSource"].(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("musicSource")
	}

	ms := MusicSource{}
	mapstructure.Decode(musicSource, &ms)

	if err := db.Where("id = ?", id).First(&genre).Error; err != nil {
		fmt.Println("getting genre to update: " + err.Error())
		return nil, err
	}

	genre.Name = name
	genre.MusicSource = ms
	if err := db.Save(&genre).Error; err != nil {
		fmt.Println("error updating genre: " + err.Error())
		return nil, err
	}
	return genre, nil
}

func deleteGenre(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	genre := &Genre{}
	id, ok := params.Args["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	if err := db.Where("id = ?", id).First(&genre).Error; err != nil {
		fmt.Println("Error getting genre: " + err.Error())
		return nil, err
	}
	db.Delete(&genre)
	return genre, nil
}

var GenreEntity = &utils.Entity{
	Name:  "Genre",
	Model: &Genre{},
	Methods: &GenreMethods{
		GetGenre:     &utils.Query{Request: getGenre, Scope: "Public"},
		SearchGenres: &utils.Query{Request: searchGenres, Scope: "Public"},
		ListGenres:   &utils.Query{Request: listGenres, Scope: "Admin"},
		CreateGenre:  &utils.Mutation{Request: createGenre, Scope: "Admin"},
		UpdateGenre:  &utils.Mutation{Request: updateGenre, Scope: "Admin"},
		DeleteGenre:  &utils.Mutation{Request: deleteGenre, Scope: "Admin"},
	},
	Types: &[]*utils.Type{
		&utils.Type{Name: "CreateGenreInput", IsInput: true, Model: &CreateGenreInput{}},
		&utils.Type{Name: "UpdateGenreInput", IsInput: true, Model: &UpdateGenreInput{}},
	},
}
