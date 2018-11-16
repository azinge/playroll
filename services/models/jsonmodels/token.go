package jsonmodels

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
	"time"
)

type Token struct {
	AccessToken  string    `gql:"accessToken: String" json:"accessToken"`
	RefreshToken string    `gql:"refreshToken: String" json:"refreshToken"`
	TokenType    string    `gql:"tokenType: String" json:"tokenType"`
	Expiry       time.Time `gql:"expiry: String" json:"expiry"`
}

type TokenInput struct {
	AccessToken  string    `gql:"accessToken: String" json:"accessToken"`
	RefreshToken string    `gql:"refreshToken: String" json:"refreshToken"`
	TokenType    string    `gql:"tokenType: String" json:"tokenType"`
	Expiry       time.Time `gql:"expiry: String" json:"expiry"`
}

type TokenOutput struct {
	AccessToken  string    `gql:"accessToken: String" json:"accessToken"`
	RefreshToken string    `gql:"refreshToken: String" json:"refreshToken"`
	TokenType    string    `gql:"tokenType: String" json:"tokenType"`
	Expiry       time.Time `gql:"expiry: String" json:"expiry"`
}

func (token Token) Value() (driver.Value, error) {
	value, err := json.Marshal(token)
	if err != nil {
		fmt.Println("Error trying to Marshal Token: " + err.Error())
		return nil, err
	}
	return string(value), nil
}

func (token *Token) Scan(value interface{}) error {
	if err := json.Unmarshal(value.([]byte), &token); err != nil {
		fmt.Println("Error trying to Unmarshal Token: " + err.Error())
		return err
	}
	return nil
}
