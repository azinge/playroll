package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type Relationship struct {
	Model
}

type RelationshipInput struct {
	Placeholder string `gql:"placeholder: String"`
}

type RelationshipOutput struct {
	Model `gql:"MODEL"`
}

// Entity Specific Methods

func RelationshipInputToModel(ri *RelationshipInput) (*Relationship, error) {
	r := &Relationship{}
	// ADD METHODS TO ENCODE PROPERTIES HERE
	return r, nil
}

func RelationshipOutputToModel(r *RelationshipOutput) (*Relationship, error) {
	return nil, fmt.Errorf("RelationshipOutputToModel Not Implemented")
}

func RelationshipModelToOutput(r *Relationship) (*RelationshipOutput, error) {
	ro := &RelationshipOutput{}
	ro.Model = r.Model
	// ADD METHODS TO DECODE PROPERTIES HERE
	return ro, nil
}

func InitRelationshipDAO(db *gorm.DB) Entity {
	dao := &Relationship{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatRelationship(val interface{}) (*RelationshipOutput, error) {
	r, ok := val.(*Relationship)
	if !ok {
		return nil, fmt.Errorf("error converting to Relationship")
	}
	return RelationshipModelToOutput(r)
}

func FormatRelationshipSlice(val interface{}) ([]RelationshipOutput, error) {
	rs, ok := val.(*[]Relationship)
	if !ok {
		return nil, fmt.Errorf("error converting to Relationship Slice")
	}
	output := []RelationshipOutput{}
	for _, r := range *rs {
		ro, err := RelationshipModelToOutput(&r)
		if err != nil {
			return nil, err
		}
		output = append(output, *ro)
	}
	return output, nil
}

// Interface Generalization Methods

func (ri *RelationshipInput) ToModel() (Entity, error) {
	return RelationshipInputToModel(ri)
}

func (ro *RelationshipOutput) ToModel() (Entity, error) {
	return RelationshipOutputToModel(ro)
}

func (r *Relationship) ToOutput() (EntityOutput, error) {
	return RelationshipModelToOutput(r)
}

func (_ *Relationship) InitDAO(db *gorm.DB) Entity {
	return InitRelationshipDAO(db)
}

func (_ *Relationship) Format(val interface{}) (EntityOutput, error) {
	return FormatRelationship(val)
}

func (_ *Relationship) FormatSlice(val interface{}) (interface{}, error) {
	return FormatRelationshipSlice(val)
}
