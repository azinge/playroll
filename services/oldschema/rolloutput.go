package schema

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/cazinge/playroll/services/utils/pagination"
	"github.com/cazinge/playroll/services/utils/search"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	"github.com/mitchellh/mapstructure"
)

type RollOutput struct {
	utils.Model  `gql:"MODEL"`
	MusicSources []MusicSource
	Tracklists   []Tracklist
	TracklistID  uint
	Order        string `gql:"order: String"`
}

type RollOutputMethods struct {
	GetRollOutput     *utils.Query    `gql:"rollOutput(id: ID!): RollOutput"`
	SearchRollOutputs *utils.Query    `gql:"searchRollOutputs(options: SearchInput!): [RollOutput]"`
	ListRollOutputs   *utils.Query    `gql:"listRollOutputs(options: PaginationInput!): [RollOutput]"`
	CreateRollOutput  *utils.Mutation `gql:"createRollOutput(rollOutput: CreateRollOutputInput!): RollOutput"`
	DeleteRollOutput  *utils.Mutation `gql:"deleteRollOutput(id: ID!): RollOutput"`
}

func getRollOutput(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var rollOutput RollOutput
	if err := utils.HandleGetSingularModel(params, db, &rollOutput); err != nil {
		return nil, err
	}
	return rollOutput, nil
}

func searchRollOutputs(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var rollOutputs []RollOutput
	if err := search.Query(params, db, &rollOutputs); err != nil {
		return nil, err
	}
	return rollOutputs, nil
}

func listRollOutputs(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var rollOutputs []RollOutput
	pagination.HandlePagination(params, db, &rollOutputs)
	return rollOutputs, nil
}

type CreateRollOutputInput struct {
	MusicSources []MusicSource `gql:"musicSources: [MusicSourceInput]"`
	Order        string        `gql:"order: String"`
	TracklistID  string        `gql:"tracklistID: String"`
}

func createRollOutput(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var tracklist Tracklist
	musicSources, ok := params.Args["rollOutput"].(map[string]interface{})["musicSources"].([]interface{})
	if !ok {
		return nil, utils.HandleTypeAssertionError("musicSources")
	}

	order, ok := params.Args["rollOutput"].(map[string]interface{})["order"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("order")
	}

	tracklistID, ok := params.Args["rollOutput"].(map[string]interface{})["tracklistID"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("tracklistID")
	}

	ms := []MusicSource{}
	mapstructure.Decode(musicSources, &ms)

	if err := db.Preload("RollOutputs").First(&tracklist, "id = ?", tracklistID).Error; err != nil {
		fmt.Println("error preloading RollOutputs for tracklist: " + err.Error())
		return nil, err
	}

	rollOutput := &RollOutput{
		MusicSources: ms,
		Order:        order,
	}
	db.Model(&tracklist).Association("RollOutputs").Append(rollOutput)
	return tracklist, nil
}

func deleteRollOutput(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	rollOutput := &RollOutput{}
	id, ok := params.Args["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	if err := db.Where("id = ?", id).First(&rollOutput).Error; err != nil {
		fmt.Println("Error deleting rollOutput: " + err.Error())
		return nil, err
	}

	associationsToRemove := []string{"MusicSources", "Tracklists"}
	utils.HandleRemoveAssociationReferences(db, rollOutput, associationsToRemove)
	db.Delete(&rollOutput)
	return rollOutput, nil
}

var RollOutputInputType = &utils.Type{Name: "RollOutputInput", IsInput: true, Model: &RollOutput{}}

var RollOutputEntity = &utils.Entity{
	Name:  "RollOutput",
	Model: &RollOutput{},
	Methods: &RollOutputMethods{
		GetRollOutput:     &utils.Query{Request: getRollOutput, Scope: "Public"},
		SearchRollOutputs: &utils.Query{Request: searchRollOutputs, Scope: "Public"},
		ListRollOutputs:   &utils.Query{Request: listRollOutputs, Scope: "Admin"},
		CreateRollOutput:  &utils.Mutation{Request: createRollOutput, Scope: "Public"},
		DeleteRollOutput:  &utils.Mutation{Request: deleteRollOutput, Scope: "Admin"},
	},
	Types: &[]*utils.Type{
		&utils.Type{Name: "CreateRollOutputInput", IsInput: true, Model: &CreateRollOutputInput{}},
	},
}
