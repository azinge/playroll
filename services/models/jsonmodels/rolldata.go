package jsonmodels

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

type RollData struct {
	Sources []byte `json:"sources" gorm:"type: jsonb"`
	Filter  []byte `json:"filter" gorm:"type: jsonb"`
	Length  []byte `json:"length" gorm:"type: jsonb"`
}

type RollDataInput struct {
	Sources []MusicSource `gql:"sources: [MusicSourceInput]" json:"sources"`
	Filter  RollFilter    `gql:"filter: RollFilterInput" json:"filter"`
	Length  RollLength    `gql:"length: RollLengthInput" json:"length"`
}

type RollDataOutput struct {
	Sources []MusicSource `gql:"sources: [MusicSource]" json:"sources"`
	Filter  RollFilter    `gql:"filter: RollFilter" json:"filter"`
	Length  RollLength    `gql:"length: RollLength" json:"length"`
}

func (rdi *RollDataInput) ToModel() (*RollData, error) {
	sources, err := json.Marshal(rdi.Sources)
	if err != nil {
		fmt.Println("error trying to Marshal RollData Sources: " + err.Error())
		return nil, err
	}
	filter, err := json.Marshal(rdi.Filter)
	if err != nil {
		fmt.Println("error trying to Marshal RollData Filter: " + err.Error())
		return nil, err
	}
	length, err := json.Marshal(rdi.Length)
	if err != nil {
		fmt.Println("error trying to Marshal RollData Length: " + err.Error())
		return nil, err
	}
	model := &RollData{}
	model.Sources = sources
	model.Filter = filter
	model.Length = length
	return model, nil
}

func (rd RollData) ToOutput() (*RollDataOutput, error) {
	sources := []MusicSource{}
	filter := RollFilter{}
	length := RollLength{}
	if rd.Sources != nil {
		if err := json.Unmarshal(rd.Sources, &sources); err != nil {
			fmt.Println("Error trying to Unmarshal RollData Sources: " + err.Error())
			return nil, err
		}
	}
	if rd.Filter != nil {
		if err := json.Unmarshal(rd.Filter, &filter); err != nil {
			fmt.Println("Error trying to Unmarshal RollData Filter: " + err.Error())
			return nil, err
		}
	}

	if rd.Length != nil {
		if err := json.Unmarshal(rd.Length, &length); err != nil {
			fmt.Println("Error trying to Unmarshal RollData Length: " + err.Error())
			return nil, err
		}
	}

	output := &RollDataOutput{
		Sources: sources,
		Filter:  filter,
		Length:  length,
	}
	return output, nil
}

func (rd RollData) Value() (driver.Value, error) {
	value, err := json.Marshal(rd)
	if err != nil {
		fmt.Println("Error trying to Marshal RollData: " + err.Error())
		return nil, err
	}
	return string(value), nil
}

func (rd *RollData) Scan(value interface{}) error {
	if err := json.Unmarshal(value.([]byte), &rd); err != nil {
		fmt.Println("Error trying to Unmarshal RollData: " + err.Error())
		return err
	}
	return nil
}
