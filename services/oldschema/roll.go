package oldschema

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/cazinge/playroll/services/utils/pagination"
	"github.com/cazinge/playroll/services/utils/search"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	"github.com/mitchellh/mapstructure"
)

type Roll struct {
	utils.Model  `gql:"MODEL"`
	MusicSources []MusicSource `gql:"musicSources: [MusicSource]" gorm:"type: jsonb[];"`
	Filters      RollFilter    `gql:"filters: RollFilter" gorm:"type: jsonb;"`
	Length       RollLength    `gql:"length: RollLength" gorm:"type: jsonb;"`
	Playroll     Playroll
	PlayrollID   uint   `gql:"playrollID: ID"`
	Order        string `gql:"order: String"`
}

type RollMethods struct {
	GetRoll     *utils.Query    `gql:"roll(id: ID!): Roll"`
	SearchRolls *utils.Query    `gql:"searchRolls(options: SearchInput!): [Roll]"`
	ListRolls   *utils.Query    `gql:"listRolls(options: PaginationInput!): [Roll]"`
	CreateRoll  *utils.Mutation `gql:"createRoll(roll: CreateRollInput!): Roll"`
	UpdateRoll  *utils.Mutation `gql:"updateRoll(roll: UpdateRollInput!): Roll"`
	DeleteRoll  *utils.Mutation `gql:"deleteRoll(id: ID!): Roll"`
}

func getRoll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var roll Roll
	if err := utils.HandleGetSingularModel(params, db, &roll); err != nil {
		return nil, err
	}
	return roll, nil
}

func searchRolls(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var rolls []Roll
	if err := search.Query(params, db, &rolls); err != nil {
		return nil, err
	}
	return rolls, nil
}

func listRolls(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var rolls []Roll
	pagination.HandlePagination(params, db, &rolls)
	return rolls, nil
}

type CreateRollInput struct {
	MusicSources []MusicSource `gql:"musicSources: [MusicSourceInput]" json: source`
	Filters      RollFilter    `gql:"filters: RollFilterInput" json: filters`
	Length       RollLength    `gql:"length: RollLengthInput" json: length`
	PlayrollID   string        `gql:"playrollID: ID!"`
	Order        string        `gql:"order: String"`
}

func createRoll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var playroll Playroll
	playrollID, ok := params.Args["roll"].(map[string]interface{})["playrollID"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("playrollID")
	}

	musicSources, ok := params.Args["roll"].(map[string]interface{})["musicSources"].([]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("musicSources")
	}

	rollFilters, ok := params.Args["roll"].(map[string]interface{})["filters"].(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("filters")
	}

	rollLength, ok := params.Args["roll"].(map[string]interface{})["length"].(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("length")
	}

	order, ok := params.Args["roll"].(map[string]interface{})["order"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("order")
	}

	ms := []MusicSource{}
	rf := RollFilter{}
	rl := RollLength{}
	mapstructure.Decode(musicSources, &ms)
	mapstructure.Decode(rollFilters, &rf)
	mapstructure.Decode(rollLength, &rl)

	if err := db.Preload("Rolls").First(&playroll, "id = ?", playrollID).Error; err != nil {
		fmt.Println("error preloading Rolls for playroll: " + err.Error())
		return nil, err
	}

	roll := &Roll{
		MusicSources: ms,
		Filters:      rf,
		Length:       rl,
		Order:        order,
	}
	db.Model(&playroll).Association("Rolls").Append(roll)
	return roll, nil
}

type UpdateRollInput struct {
	ID           string        `gql:"id: ID!"`
	MusicSources []MusicSource `gql:"musicSources: [MusicSourceInput]" json: source`
	Filters      RollFilter    `gql:"filters: RollFilterInput" json: filters`
	Length       RollLength    `gql:"length: RollLengthInput" json: length`
	PlayrollID   string        `gql:"playrollID: ID!"`
	Order        string        `gql:"order: String"`
}

func updateRoll(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	roll := &Roll{}
	id, ok := params.Args["roll"].(map[string]interface{})["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	playrollID, ok := params.Args["roll"].(map[string]interface{})["playrollID"].(uint)
	if !ok {
		return nil, utils.HandleTypeAssertionError("playrollID")
	}

	musicSources, ok := params.Args["roll"].(map[string]interface{})["musicSources"].([]map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("musicSources")
	}

	rollFilters, ok := params.Args["roll"].(map[string]interface{})["filters"].(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("rollFilters")
	}

	rollLength, ok := params.Args["roll"].(map[string]interface{})["length"].(map[string]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("rollLength")
	}

	order, ok := params.Args["roll"].(map[string]interface{})["order"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("order")
	}

	ms := []MusicSource{}
	rf := RollFilter{}
	rl := RollLength{}
	mapstructure.Decode(musicSources, &ms)
	mapstructure.Decode(rollFilters, &rf)
	mapstructure.Decode(rollLength, &rl)

	if err := db.Where("id = ?", id).First(&roll).Error; err != nil {
		fmt.Println("getting roll to update: " + err.Error())
		return nil, err
	}

	roll.MusicSources = ms
	roll.Filters = rf
	roll.Length = rl
	roll.PlayrollID = playrollID
	roll.Order = order
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

	associationsToRemove := []string{"MusicSources"}
	utils.HandleRemoveAssociationReferences(db, roll, associationsToRemove)
	db.Delete(&roll)
	return roll, nil
}

type RollInput struct {
	MusicSources []MusicSource `gql:"musicSources: [MusicSourceInput]" gorm:"type: jsonb[];not null"`
	Filters      RollFilter    `gql:"filters: RollFilterInput" gorm:"type: jsonb;not null"`
	Length       RollLength    `gql:"length: RollLengthInput" gorm:"type: jsonb;not null"`
	Playroll     Playroll
	PlayrollID   uint   `gql:"playrollID: ID"`
	Order        string `gql:"order: String"`
}

var RollInputType = &utils.Type{Name: "RollInput", IsInput: true, Model: &RollInput{}}

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
