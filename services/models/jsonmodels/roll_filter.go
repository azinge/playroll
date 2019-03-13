package jsonmodels

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"fmt"

	"github.com/lib/pq"
)

type RollFilter struct {
	Type          string         `json:"type"`
	Name          string         `json:"name"`
	Modifications pq.StringArray `json:"modifications"`
}

type RollFilterInput struct {
	Type          string   `gql:"type: String" json:"type"`
	Name          string   `gql:"name: String" json:"name"`
	Modifications []string `gql:"modifications: [String]" json:"modifications"`
}

type RollFilterOutput struct {
	Type          string   `gql:"type: String" json:"type"`
	Name          string   `gql:"name: String" json:"name"`
	Modifications []string `gql:"modifications: [String]" json:"modifications"`
}

func (rfi *RollFilterInput) ToModel() (*RollFilter, error) {
	rf := &RollFilter{}
	rf.Type = rfi.Type
	rf.Name = rfi.Name
	rf.Modifications = rfi.Modifications
	return rf, nil
}

func (rf *RollFilter) ToOutput() (*RollFilterOutput, error) {
	rfo := &RollFilterOutput{}
	rfo.Type = rf.Type
	rfo.Name = rf.Name
	rfo.Modifications = rf.Modifications
	return rfo, nil
}

func (rf RollFilter) Value() (driver.Value, error) {
	value, err := json.Marshal(rf)
	if err != nil {
		printError := fmt.Sprintf("Error trying to Marshal RollFilter: " + err.Error())
		fmt.Println(printError)
		return nil, errors.New(printError)
	}
	return string(value), nil
}

func (rf *RollFilter) Scan(value interface{}) error {
	if err := json.Unmarshal(value.([]byte), &rf); err != nil {
		printError := fmt.Sprintf("Error trying to Unmarshal RollFilter: " + err.Error())
		fmt.Println(printError)
		return errors.New(printError)
	}
	return nil
}
