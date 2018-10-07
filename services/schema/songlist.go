package schema

import (
	"fmt"
	"time"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type Songlist struct {
	ID        uint       `gql:"id: ID" gorm:"primary_key"`
	CreatedAt time.Time  `gql:"createdAt: String"`
	UpdatedAt time.Time  `gql:"updatedAt: String"`
	DeletedAt *time.Time `gql:"deletedAt: String"`
	Starred     bool `gql:"starred: Boolean"`
	Primary     bool `gql:"primary: Boolean"`
	// Playroll Playroll `gql:"playroll: Playroll"`
	// Songs    []Song   `gql:"songs: [Song]"` // many to many relationship
}

type SonglistMethods struct {
	GetSonglist      *utils.Query    `gql:"songlist(id: ID!): Songlist"`
	SearchSonglists  *utils.Query    `gql:"searchSonglists: [Songlist]"`
	ListSonglists    *utils.Query    `gql:"listSonglists: [Songlist]"`
	CreateSonglist   *utils.Mutation `gql:"createSonglist(songlist: CreateSonglistInput!): Songlist"`
	UpdateSonglist   *utils.Mutation `gql:"updateSonglist(songlist: UpdateSonglistInput!): Songlist"`
	DeleteSonglist   *utils.Mutation `gql:"deleteSonglist(id: ID!): Songlist"`
	GenerateSonglist *utils.Mutation `gql:"generateSonglist: Songlist"`
}

func getSonglist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	songlist := &Songlist{}
	id, _ := params.Args["id"].(string)
	if err := db.Where("id = ?", id).First(&songlist).Error; err != nil {
		fmt.Println("error getting songlist: " + err.Error())
		return nil, err
	}
	return songlist, nil
}

func searchSonglists(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Songlist{&Songlist{}, &Songlist{}}, nil
}

func listSonglists(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	songlists := []*Songlist{}
	// currently does not handle offset and count
	if err := db.Find(&songlists).Error; err != nil {
		fmt.Println("Error listing songlists: " + err.Error())
		return nil, err
	}
	return songlists, nil
}

type CreateSonglistInput struct {
	Starred bool `gql:"starred: Boolean"`
	Primary bool `gql:"primary: Boolean"`
}

func createSonglist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	starred, _ := params.Args["songlist"].(map[string]interface{})["starred"].(bool)
	primary, _ := params.Args["songlist"].(map[string]interface{})["primary"].(bool)
	songlist := &Songlist{
		Starred: starred,
		Primary: primary,
	}
	if err := db.Create(&songlist).Error; err != nil {
		fmt.Println("error creating Songlist: "+ err.Error())
		return nil, err
	}
	return songlist, nil
}

type UpdateSonglistInput struct {
	ID string `gql:"id: ID!"`
	Starred bool `gql:"starred: Boolean"`
	Primary bool `gql:"primary: Boolean"`
}

func updateSonglist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	songlist := &Songlist{}
	id, _ := params.Args["songlist"].(map[string]interface{})["id"].(string)
	starred, _ := params.Args["songlist"].(map[string]interface{})["starred"].(bool)
	primary, _ := params.Args["songlist"].(map[string]interface{})["primary"].(bool)
	if err := db.Where("id = ?", id).First(&songlist).Error; err != nil {
		fmt.Println("getting songlist to update: " + err.Error())
		return nil, err
	}
	songlist.Starred = starred
	songlist.Primary = primary
	if err := db.Save(&songlist).Error; err != nil {
		fmt.Println("error updating songlist: " + err.Error())
		return nil, err
	}
	return songlist, nil
}

func deleteSonglist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	songlist := &Songlist{}
	id, _ := params.Args["id"]
	if err := db.Where("id = ?", id).First(&songlist).Error; err != nil {
		fmt.Println("error deleting songlist: " + err.Error())
		return nil, err
	}
	db.Delete(&songlist)
	return songlist, nil
}

func generateSonglist(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &Songlist{}, nil
}

var SonglistEntity = &utils.Entity{
	Name:  "Songlist",
	Model: &Songlist{},
	Methods: &SonglistMethods{
		GetSonglist:      &utils.Query{Request: getSonglist, Scope: "User"},
		SearchSonglists:  &utils.Query{Request: searchSonglists, Scope: "User"},
		ListSonglists:    &utils.Query{Request: listSonglists, Scope: "User"},
		CreateSonglist:   &utils.Mutation{Request: createSonglist, Scope: "User"},
		UpdateSonglist:   &utils.Mutation{Request: updateSonglist, Scope: "User"},
		DeleteSonglist:   &utils.Mutation{Request: deleteSonglist, Scope: "User"},
		GenerateSonglist: &utils.Mutation{Request: generateSonglist, Scope: "User"},
	},
	Types: &[]*utils.Type{
		&utils.Type{Name: "CreateSonglistInput", IsInput: true, Model: &CreateSonglistInput{}},
		&utils.Type{Name: "UpdateSonglistInput", IsInput: true, Model: &UpdateSonglistInput{}},
	},
}
