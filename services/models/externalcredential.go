package models

import (
	"encoding/json"
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/jinzhu/gorm"
	"golang.org/x/oauth2"
)

type ExternalCredential struct {
	Model
	Provider string
	User     User
	UserID   uint
	Token    []byte `gorm:"type: jsonb"`
}

type ExternalCredentialInput struct {
	Provider string `gql:"provider: String"`
	UserID   string `gql:"userID: String"`
}

type ExternalCredentialOutput struct {
	Model    `gql:"MODEL"`
	Provider string       `gql:"provider: String"`
	User     User         `gql:"user: User"`
	UserID   uint         `gql:"userID: ID"`
	Token    oauth2.Token `gql:"token: Token"`
}

func (eci *ExternalCredentialInput) ToModel() (*ExternalCredential, error) {
	ec := &ExternalCredential{}
	ec.Provider = eci.Provider
	ec.UserID = utils.StringIDToNumber(eci.UserID)
	return ec, nil
}

func (ec *ExternalCredential) ToOutput() (*ExternalCredentialOutput, error) {
	eco := &ExternalCredentialOutput{}
	eco.Model = ec.Model
	eco.Provider = ec.Provider
	eco.User = ec.User
	eco.UserID = ec.UserID
	token := oauth2.Token{}
	if err := json.Unmarshal(ec.Token, &token); err != nil {
		fmt.Println("error trying to Unmarshal ExternalCredential Token: " + err.Error())
		return nil, err
	}
	eco.Token = token
	return eco, nil
}

func InitExternalCredentialDAO(db *gorm.DB) Entity {
	externalCredential := &ExternalCredential{}
	externalCredential.SetEntity(externalCredential)
	externalCredential.SetDB(db)
	return externalCredential
}

func (_ *ExternalCredential) InitDAO(db *gorm.DB) Entity {
	return InitExternalCredentialDAO(db)
}

func FormatExternalCredential(val interface{}) (*ExternalCredentialOutput, error) {
	ec, ok := val.(*ExternalCredential)
	if !ok {
		return nil, fmt.Errorf("error converting to ExternalCredential")
	}
	return ec.ToOutput()
}

func (_ *ExternalCredential) Format(val interface{}) (interface{}, error) {
	return FormatExternalCredential(val)
}

func FormatExternalCredentialSlice(val interface{}) ([]ExternalCredentialOutput, error) {
	ecs, ok := val.(*[]ExternalCredential)
	if !ok {
		return nil, fmt.Errorf("error converting to ExternalCredential Slice")
	}
	output := []ExternalCredentialOutput{}
	for _, ec := range *ecs {
		eco, err := ec.ToOutput()
		if err != nil {
			return nil, err
		}
		output = append(output, *eco)
	}
	return output, nil
}

func (_ *ExternalCredential) FormatSlice(val interface{}) (interface{}, error) {
	return FormatExternalCredentialSlice(val)
}
