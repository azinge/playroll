package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/jinzhu/gorm"
)

type IdentityCredential struct {
	Model
	Provider   string
	ProviderID string
	User       User
	UserID     uint
}

type IdentityCredentialInput struct {
	Provider   string `gql:"provider: String"`
	ProviderID string `gql:"providerID: String"`
	UserID     string `gql:"userID: String"`
}

type IdentityCredentialOutput struct {
	Model      `gql:"MODEL"`
	Provider   string     `gql:"provider: String"`
	ProviderID string     `gql:"providerID: String"`
	User       UserOutput `gql:"user: User"`
	UserID     uint       `gql:"userID: ID"`
}

// Utility Functions

func FindIdentityCredentialByUserID(id uint, db *gorm.DB) (*IdentityCredential, error) {
	ic := &IdentityCredential{}
	if err := db.Where(&IdentityCredential{Provider: "Cognito", UserID: id}).Last(ic).Error; err != nil {
		fmt.Println(err)
		return nil, err
	}
	return ic, nil
}

// Entity Specific Methods

func IdentityCredentialInputToModel(ici *IdentityCredentialInput) (*IdentityCredential, error) {
	ic := &IdentityCredential{}
	ic.Provider = ici.Provider
	ic.ProviderID = ici.ProviderID
	ic.UserID = utils.StringIDToNumber(ici.UserID)
	return ic, nil
}

func IdentityCredentialOutputToModel(ico *IdentityCredentialOutput) (*IdentityCredential, error) {
	return nil, fmt.Errorf("IdentityCredentialOutputToModel Not Implemented")
}

func IdentityCredentialModelToOutput(ic *IdentityCredential) (*IdentityCredentialOutput, error) {
	ico := &IdentityCredentialOutput{}
	ico.Model = ic.Model
	ico.Provider = ic.Provider
	ico.ProviderID = ic.ProviderID
	user, err := FormatUser(&ic.User)
	if err != nil {
		return nil, err
	}
	ico.User = *user
	ico.UserID = ic.UserID
	return ico, nil
}

func InitIdentityCredentialDAO(db *gorm.DB) Entity {
	dao := &IdentityCredential{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatIdentityCredential(val interface{}) (*IdentityCredentialOutput, error) {
	ic, ok := val.(*IdentityCredential)
	if !ok {
		return nil, fmt.Errorf("error converting to IdentityCredential")
	}
	return IdentityCredentialModelToOutput(ic)
}

func FormatIdentityCredentialSlice(val interface{}) ([]IdentityCredentialOutput, error) {
	ics, ok := val.(*[]IdentityCredential)
	if !ok {
		return nil, fmt.Errorf("error converting to IdentityCredential Slice")
	}
	output := []IdentityCredentialOutput{}
	for _, ic := range *ics {
		ico, err := IdentityCredentialModelToOutput(&ic)
		if err != nil {
			return nil, err
		}
		output = append(output, *ico)
	}
	return output, nil
}

// Interface Generalization Methods

func (ici *IdentityCredentialInput) ToModel() (Entity, error) {
	return IdentityCredentialInputToModel(ici)
}

func (ico *IdentityCredentialOutput) ToModel() (Entity, error) {
	return IdentityCredentialOutputToModel(ico)
}

func (ic *IdentityCredential) ToOutput() (EntityOutput, error) {
	return IdentityCredentialModelToOutput(ic)
}

func (_ *IdentityCredential) InitDAO(db *gorm.DB) Entity {
	return InitIdentityCredentialDAO(db)
}

func (_ *IdentityCredential) Format(val interface{}) (EntityOutput, error) {
	return FormatIdentityCredential(val)
}

func (_ *IdentityCredential) FormatSlice(val interface{}) (interface{}, error) {
	return FormatIdentityCredentialSlice(val)
}
