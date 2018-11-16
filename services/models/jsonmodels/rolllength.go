package jsonmodels

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"

	"github.com/lib/pq"
)

type RollLength struct {
	Type          string         `gql:"type: String" json:"type"`
	Modifications pq.StringArray `gql:"modifications: [String]" json:"modifications"`
}

type RollLengthInput struct {
	Type          string   `gql:"type: String" json:"type"`
	Modifications []string `gql:"modifications: [String]" json:"modifications"`
}

type RollLengthOutput struct {
	Type          string   `gql:"type: String" json:"type"`
	Modifications []string `gql:"modifications: [String]" json:"modifications"`
}

func (rl RollLength) Value() (driver.Value, error) {
	value, err := json.Marshal(rl)
	if err != nil {
		fmt.Println("Error trying to Marshal RollLength: " + err.Error())
		return nil, err
	}
	return string(value), nil
}

func (rl *RollLength) Scan(value interface{}) error {
	if err := json.Unmarshal(value.([]byte), &rl); err != nil {
		fmt.Println("Error trying to Unmarshal RollLength: " + err.Error())
		return err
	}
	return nil
}
