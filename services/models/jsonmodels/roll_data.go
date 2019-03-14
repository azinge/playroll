package jsonmodels

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

type RollData struct {
	Sources []byte `json:"sources" gorm:"type: jsonb"`
	Filters []byte `json:"filters" gorm:"type: jsonb"`
	Length  []byte `json:"length" gorm:"type: jsonb"`
}

type RollDataInput struct {
	Sources []MusicSource `gql:"sources: [MusicSourceInput]" json:"sources"`
	Filters []RollFilter  `gql:"filters: [RollFilterInput]" json:"filters"`
	Length  RollLength    `gql:"length: RollLengthInput" json:"length"`
}

type RollDataOutput struct {
	Sources []MusicSource `gql:"sources: [MusicSource]" json:"sources"`
	Filters []RollFilter  `gql:"filters: [RollFilter]" json:"filters"`
	Length  RollLength    `gql:"length: RollLength" json:"length"`
}

func (rdi *RollDataInput) ToModel() (*RollData, error) {
	sources, err := json.Marshal(rdi.Sources)
	if err != nil {
		fmt.Println("error trying to Marshal RollData Sources: " + err.Error())
		return nil, err
	}
	filters, err := json.Marshal(rdi.Filters)
	if err != nil {
		fmt.Println("error trying to Marshal RollData Filters: " + err.Error())
		return nil, err
	}
	length, err := json.Marshal(rdi.Length)
	if err != nil {
		fmt.Println("error trying to Marshal RollData Length: " + err.Error())
		return nil, err
	}
	model := &RollData{}
	model.Sources = sources
	model.Filters = filters
	model.Length = length
	return model, nil
}

func (rd RollData) ToOutput() (*RollDataOutput, error) {
	sources := []MusicSource{}
	filters := []RollFilter{}
	length := RollLength{}
	if rd.Sources != nil {
		if err := json.Unmarshal(rd.Sources, &sources); err != nil {
			fmt.Println("Error trying to Unmarshal RollData Sources: " + err.Error())
			return nil, err
		}
	}
	if rd.Filters != nil {
		if err := json.Unmarshal(rd.Filters, &filters); err != nil {
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
		Filters: filters,
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
