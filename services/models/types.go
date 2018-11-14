package models

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/lib/pq"
)

type RollSource struct {
	Type          string         `gql:"type: String" json:"type"`
	Modifications pq.StringArray `gql:"modifications: [String]" json:"modifications"`
}

var RollSourceType = &utils.Type{Name: "RollSource", Model: RollSource{}}
var RollSourceInputType = &utils.Type{Name: "RollSourceInput", IsInput: true, Model: RollSource{}}

func (rs RollSource) Value() (driver.Value, error) {
	value, err := json.Marshal(rs)
	if err != nil {
		fmt.Println("Error trying to Marshal RollSource: " + err.Error())
		return nil, errors.New("Error trying to Marshal RollSource: " + err.Error())
	}
	return string(value), nil
}

func (rs *RollSource) Scan(value interface{}) error {
	if err := json.Unmarshal(value.([]byte), &rs); err != nil {
		fmt.Println("Error trying to Unmarshal RollSource: " + err.Error())
		return err
	}
	return nil
}

type RollFilter struct {
	Type          string         `gql:"type: String" json:"type"`
	Modifications pq.StringArray `gql:"modifications: [String]" json:"modifications"`
}

var RollFilterType = &utils.Type{Name: "RollFilter", Model: RollFilter{}}
var RollFilterInputType = &utils.Type{Name: "RollFilterInput", IsInput: true, Model: RollFilter{}}

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

type RollLength struct {
	Type          string         `gql:"type: String" json:"type"`
	Modifications pq.StringArray `gql:"modifications: [String]" json:"modifications"`
}

var RollLengthType = &utils.Type{Name: "RollLength", Model: RollLength{}}
var RollLengthInputType = &utils.Type{Name: "RollLengthInput", IsInput: true, Model: RollLength{}}

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

type MusicSource struct {
	Type   string `gql:"type: String" json:"type"`
	Source string `gql:"source: String" json:"source"`
}

var MusicSourceType = &utils.Type{Name: "MusicSource", Model: MusicSource{}}
var MusicSourceInputType = &utils.Type{Name: "MusicSourceInput", IsInput: true, Model: MusicSource{}}

func (ms MusicSource) Value() (driver.Value, error) {
	value, err := json.Marshal(ms)
	if err != nil {
		fmt.Println("Error trying to Marshal MusicSource: " + err.Error())
		return nil, err
	}
	return string(value), nil
}

func (ms *MusicSource) Scan(value interface{}) error {
	if err := json.Unmarshal(value.([]byte), &ms); err != nil {
		fmt.Println("Error trying to Unmarshal MusicSource: " + err.Error())
		return err
	}
	return nil
}

type ListInput struct {
	Page    int            `gql:"page: Int"`
	Limit   int            `gql:"limit: Int"`
	OrderBy pq.StringArray `gql:"orderBy: [String]"`
}

var ListInputType = &utils.Type{Name: "ListInput", IsInput: true, Model: ListInput{}}
