package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	"github.com/mitchellh/mapstructure"
)

type Roll struct {
	utils.Model `gql:"MODEL"`
	Source      RollSource `gql:"source: RollSource" gorm:"type:jsonb;not null"`
	Filters     RollFilter `gql:"filters: RollFilter" gorm:"type:jsonb;not null"`
	Length      RollLength `gql:"length: RollLength" gorm:"type:jsonb;not null"`
	Playroll    string     `gql:"playroll: ID"`
}

type RollMethods struct {
	GetRoll     *utils.Query    `gql:"roll(id: ID!): Roll"`
	SearchRolls *utils.Query    `gql:"searchRolls: [Roll]"`
	ListRolls   *utils.Query    `gql:"listRolls: [Roll]"`
	CreateRoll  *utils.Mutation `gql:"createRoll(roll: CreateRollInput!): Roll"`
	UpdateRoll  *utils.Mutation `gql:"updateRoll(roll: UpdateRollInput!): Roll"`
	DeleteRoll  *utils.Mutation `gql:"deleteRoll(id: ID!): Roll"`
}

func getRoll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	roll := &Roll{}
	id, ok := params.Args["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	if err := db.Where("id = ?", id).First(&roll).Error; err != nil {
		fmt.Println("error getting roll: " + err.Error())
		return nil, err
	}
	return roll, nil
}

func searchRolls(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*Roll{&Roll{}, &Roll{}}, nil
}

func listRolls(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	rolls := []*Roll{}
	if err := db.Find(&rolls).Error; err != nil {
		fmt.Println("error searching for rolls: " + err.Error())
		return nil, err
	}
	return rolls, nil
}

type CreateRollInput struct {
	Source   RollSource `gql:"source: RollSourceInput" json: source`
	Filters  RollFilter `gql:"filters: RollFilterInput" json: filters`
	Length   RollLength `gql:"length: RollLengthInput" json: length`
	Playroll string     `gql:"playroll: ID!"`
}

func createRoll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	playroll, ok := params.Args["roll"].(map[string]interface{})["playroll"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("playroll")
	}

	rollSource, ok := params.Args["roll"].(map[string]interface{})["source"].(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("rollSource")
	}

	rollFilters, ok := params.Args["roll"].(map[string]interface{})["filters"].(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("rollFilters")
	}

	rollLength, ok := params.Args["roll"].(map[string]interface{})["length"].(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("rollLength")
	}

	rs := RollSource{}
	rf := RollFilter{}
	rl := RollLength{}
	mapstructure.Decode(rollSource, &rs)
	mapstructure.Decode(rollFilters, &rf)
	mapstructure.Decode(rollLength, &rl)

	roll := &Roll{
		Source:   rs,
		Filters:  rf,
		Length:   rl,
		Playroll: playroll,
	}
	if err := db.Create(&roll).Error; err != nil {
		fmt.Println("errror creating roll: " + err.Error())
		return nil, err
	}

	return roll, nil
}

type UpdateRollInput struct {
	ID       string     `gql:"id: ID!"`
	Source   RollSource `gql:"source: RollSourceInput" json: source`
	Filters  RollFilter `gql:"filters: RollFilterInput" json: filters`
	Length   RollLength `gql:"length: RollLengthInput" json: length`
	Playroll string     `gql:"playroll: ID!"`
}

func updateRoll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	roll := &Roll{}
	id, ok := params.Args["roll"].(map[string]interface{})["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	playroll, ok := params.Args["roll"].(map[string]interface{})["playroll"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("playroll")
	}

	rollSource, ok := params.Args["roll"].(map[string]interface{})["source"].(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("rollSource")
	}

	rollFilters, ok := params.Args["roll"].(map[string]interface{})["filters"].(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("rollFilters")
	}

	rollLength, ok := params.Args["roll"].(map[string]interface{})["length"].(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("rollLength")
	}

	rs := RollSource{}
	rf := RollFilter{}
	rl := RollLength{}
	mapstructure.Decode(rollSource, &rs)
	mapstructure.Decode(rollFilters, &rf)
	mapstructure.Decode(rollLength, &rl)

	if err := db.Where("id = ?", id).First(&roll).Error; err != nil {
		fmt.Println("getting roll to update: " + err.Error())
		return nil, err
	}

	roll.Source = rs
	roll.Filters = rf
	roll.Length = rl
	roll.Playroll = playroll
	if err := db.Save(&roll).Error; err != nil {
		fmt.Println("error updating roll: " + err.Error())
		return nil, err
	}

	return roll, nil
}

func deleteRoll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	roll := &Roll{}
	id, ok := params.Args["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	if err := db.Where("id = ?", id).First(&roll).Error; err != nil {
		fmt.Println("error deleting roll: " + err.Error())
		return nil, err
	}
	db.Delete(&roll)
	return roll, nil
}

var RollEntity = &utils.Entity{
	Name:  "Roll",
	Model: &Roll{},
	Methods: &RollMethods{
		GetRoll:     &utils.Query{Request: getRoll, Scope: "User"},
		SearchRolls: &utils.Query{Request: searchRolls, Scope: "User"},
		ListRolls:   &utils.Query{Request: listRolls, Scope: "User"},
		CreateRoll:  &utils.Mutation{Request: createRoll, Scope: "User"},
		UpdateRoll:  &utils.Mutation{Request: updateRoll, Scope: "User"},
		DeleteRoll:  &utils.Mutation{Request: deleteRoll, Scope: "User"},
	},
	Types: &[]*utils.Type{
		&utils.Type{Name: "CreateRollInput", IsInput: true, Model: &CreateRollInput{}},
		&utils.Type{Name: "UpdateRollInput", IsInput: true, Model: &UpdateRollInput{}},
	},
}
