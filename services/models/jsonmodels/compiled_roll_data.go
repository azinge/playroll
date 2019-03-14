package jsonmodels

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

type CompiledRollData struct {
	Tracks []byte `json:"tracks" gorm:"type: jsonb"`
}

type CompiledRollDataInput struct {
	Tracks []MusicSource `gql:"tracks: [MusicSourceInput]" json:"tracks"`
}

type CompiledRollDataOutput struct {
	Tracks []MusicSource `gql:"tracks: [MusicSource]" json:"tracks"`
}

func (crdi *CompiledRollDataInput) ToModel() (*CompiledRollData, error) {
	tracks, err := json.Marshal(crdi.Tracks)
	if err != nil {
		fmt.Println("error trying to Marshal CompiledRollData Tracks: " + err.Error())
		return nil, err
	}
	model := &CompiledRollData{}
	model.Tracks = tracks
	return model, nil
}

func (crd CompiledRollData) ToOutput() (*CompiledRollDataOutput, error) {
	output := &CompiledRollDataOutput{}
	if crd.Tracks != nil {
		if err := json.Unmarshal(crd.Tracks, &output.Tracks); err != nil {
			fmt.Println("error trying to Unmarshal CompiledRollData Tracks: " + err.Error())
			return nil, err
		}
	}

	return output, nil
}

func (crd CompiledRollData) Value() (driver.Value, error) {
	value, err := json.Marshal(crd)
	if err != nil {
		fmt.Println("error trying to Marshal CompiledRollData: " + err.Error())
		return nil, err
	}
	return string(value), nil
}

func (crd *CompiledRollData) Scan(value interface{}) error {
	if err := json.Unmarshal(value.([]byte), &crd); err != nil {
		fmt.Println("error trying to Unmarshal CompiledRollData: " + err.Error())
		return err
	}
	return nil
}
