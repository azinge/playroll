package jsonmodels

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

type MusicSource struct {
	Type       string `json:"type"`
	Name       string `json:"name"`
	Cover      string `json:"cover"`
	Provider   string `json:"provider"`
	ProviderID string `json:"providerID"`
}

type MusicSourceInput struct {
	Type       string `gql:"type: String" json:"type"`
	Name       string `gql:"name: String" json:"name"`
	Cover      string `gql:"cover: String" json:"cover"`
	Provider   string `gql:"provider: String" json:"provider"`
	ProviderID string `gql:"providerID: String" json:"providerID"`
}

type MusicSourceOutput struct {
	Type       string `gql:"type: String" json:"type"`
	Name       string `gql:"name: String" json:"name"`
	Cover      string `gql:"cover: String" json:"cover"`
	Provider   string `gql:"provider: String" json:"provider"`
	ProviderID string `gql:"providerID: String" json:"providerID"`
}

func (msi *MusicSourceInput) ToModel() (*MusicSource, error) {
	ms := &MusicSource{}
	ms.Type = msi.Type
	ms.Name = msi.Name
	ms.Cover = msi.Cover
	ms.Provider = msi.Provider
	ms.ProviderID = msi.ProviderID
	return ms, nil
}

func (ms *MusicSource) ToOutput() (*MusicSourceOutput, error) {
	mso := &MusicSourceOutput{}
	mso.Type = ms.Type
	mso.Name = ms.Name
	mso.Cover = ms.Cover
	mso.Provider = ms.Provider
	mso.ProviderID = ms.ProviderID
	return mso, nil
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
