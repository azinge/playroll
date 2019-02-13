package models

//! DEPRECATING FILE

import (
	"encoding/json"
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/jinzhu/gorm"
	"golang.org/x/oauth2"
)

// change to different types of credentials: Identity, Spotify, etc.
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
	User     UserOutput   `gql:"user: User"`
	UserID   uint         `gql:"userID: ID"`
	Token    oauth2.Token `gql:"token: Token"`
}

func FindExternalCredentialByUserID(id uint, db *gorm.DB) (*ExternalCredential, error) {
	ec := &ExternalCredential{}
	if err := db.Where(&ExternalCredential{Provider: "Spotify", UserID: id}).Last(ec).Error; err != nil {
		fmt.Println(err)
		return nil, err
	}
	return ec, nil
}

// Entity Specific Methods

func ExternalCredentialInputToModel(eci *ExternalCredentialInput) (*ExternalCredential, error) {
	ec := &ExternalCredential{}
	ec.Provider = eci.Provider
	ec.UserID = utils.StringIDToNumber(eci.UserID)
	return ec, nil
}

func ExternalCredentialOutputToModel(eco *ExternalCredentialOutput) (*ExternalCredential, error) {
	return nil, fmt.Errorf("ExternalCredentialOutputToModel Not Implemented")
}

func ExternalCredentialModelToOutput(ec *ExternalCredential) (*ExternalCredentialOutput, error) {
	eco := &ExternalCredentialOutput{}
	eco.Model = ec.Model
	eco.Provider = ec.Provider
	user, err := FormatUser(&ec.User)
	if err != nil {
		return nil, err
	}
	eco.User = *user
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
	dao := &ExternalCredential{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatExternalCredential(val interface{}) (*ExternalCredentialOutput, error) {
	ec, ok := val.(*ExternalCredential)
	if !ok {
		return nil, fmt.Errorf("error converting to ExternalCredential")
	}
	return ExternalCredentialModelToOutput(ec)
}

func FormatExternalCredentialSlice(val interface{}) ([]ExternalCredentialOutput, error) {
	ecs, ok := val.(*[]ExternalCredential)
	if !ok {
		return nil, fmt.Errorf("error converting to ExternalCredential Slice")
	}
	output := []ExternalCredentialOutput{}
	for _, ec := range *ecs {
		eco, err := ExternalCredentialModelToOutput(&ec)
		if err != nil {
			return nil, err
		}
		output = append(output, *eco)
	}
	return output, nil
}

// Interface Generalization Methods

func (eci *ExternalCredentialInput) ToModel() (Entity, error) {
	return ExternalCredentialInputToModel(eci)
}

func (eco *ExternalCredentialOutput) ToModel() (Entity, error) {
	return ExternalCredentialOutputToModel(eco)
}

func (ec *ExternalCredential) ToOutput() (EntityOutput, error) {
	return ExternalCredentialModelToOutput(ec)
}

func (_ *ExternalCredential) InitDAO(db *gorm.DB) Entity {
	return InitExternalCredentialDAO(db)
}

func (_ *ExternalCredential) Format(val interface{}) (EntityOutput, error) {
	return FormatExternalCredential(val)
}

func (_ *ExternalCredential) FormatSlice(val interface{}) (interface{}, error) {
	return FormatExternalCredentialSlice(val)
}
