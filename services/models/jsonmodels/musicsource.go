package jsonmodels

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

type MusicSource struct {
	Type       string `gql:"type: String" json:"type"`
	Name       string `gql:"name: String" json:"name"`
	Provider   string `gql:"provider: String" json:"provider"`
	ProviderID string `gql:"providerID: String" json:"providerID"`
}

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
