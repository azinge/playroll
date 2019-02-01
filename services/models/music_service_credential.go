package models

import (
	"encoding/json"
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/jinzhu/gorm"
	"golang.org/x/oauth2"
)

type MusicServiceCredential struct {
	Model
	Provider   string
	ProviderID string
	User       User
	UserID     uint
	Token      []byte `gorm:"type: jsonb"`
}

type MusicServiceCredentialInput struct {
	Provider   string `gql:"provider: String"`
	ProviderID string `gql:"providerID: String"`
	UserID     string `gql:"userID: String"`
}

type MusicServiceCredentialOutput struct {
	Model      `gql:"MODEL"`
	Provider   string       `gql:"provider: String"`
	ProviderID string       `gql:"providerID: String"`
	User       UserOutput   `gql:"user: User"`
	UserID     uint         `gql:"userID: ID"`
	Token      oauth2.Token `gql:"token: Token"`
}

// Utility Functions

func FindMusicServiceCredentialByUserID(id uint, db *gorm.DB) (*MusicServiceCredential, error) {
	msc := &MusicServiceCredential{}
	if err := db.Where(&MusicServiceCredential{Provider: "Spotify", UserID: id}).Last(msc).Error; err != nil {
		fmt.Println(err)
		return nil, err
	}
	return msc, nil
}

// Entity Specific Methods

func MusicServiceCredentialInputToModel(msci *MusicServiceCredentialInput) (*MusicServiceCredential, error) {
	msc := &MusicServiceCredential{}
	msc.Provider = msci.Provider
	msc.ProviderID = msci.ProviderID
	msc.UserID = utils.StringIDToNumber(msci.UserID)
	return msc, nil
}

func MusicServiceCredentialOutputToModel(msco *MusicServiceCredentialOutput) (*MusicServiceCredential, error) {
	return nil, fmt.Errorf("MusicServiceCredentialOutputToModel Not Implemented")
}

func MusicServiceCredentialModelToOutput(msc *MusicServiceCredential) (*MusicServiceCredentialOutput, error) {
	msco := &MusicServiceCredentialOutput{}
	msco.Model = msc.Model
	msco.Provider = msc.Provider
	msco.ProviderID = msc.ProviderID
	user, err := FormatUser(&msc.User)
	if err != nil {
		return nil, err
	}
	msco.User = *user
	msco.UserID = msc.UserID
	token := oauth2.Token{}
	if err := json.Unmarshal(msc.Token, &token); err != nil {
		fmt.Println("error trying to Unmarshal MusicServiceCredential Token: " + err.Error())
		return nil, err
	}
	msco.Token = token
	return msco, nil
}

func InitMusicServiceCredentialDAO(db *gorm.DB) Entity {
	dao := &MusicServiceCredential{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatMusicServiceCredential(val interface{}) (*MusicServiceCredentialOutput, error) {
	msc, ok := val.(*MusicServiceCredential)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServiceCredential")
	}
	return MusicServiceCredentialModelToOutput(msc)
}

func FormatMusicServiceCredentialSlice(val interface{}) ([]MusicServiceCredentialOutput, error) {
	mscs, ok := val.(*[]MusicServiceCredential)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServiceCredential Slice")
	}
	output := []MusicServiceCredentialOutput{}
	for _, msc := range *mscs {
		msco, err := MusicServiceCredentialModelToOutput(&msc)
		if err != nil {
			return nil, err
		}
		output = append(output, *msco)
	}
	return output, nil
}

// Interface Generalization Methods

func (msci *MusicServiceCredentialInput) ToModel() (Entity, error) {
	return MusicServiceCredentialInputToModel(msci)
}

func (msco *MusicServiceCredentialOutput) ToModel() (Entity, error) {
	return MusicServiceCredentialOutputToModel(msco)
}

func (msc *MusicServiceCredential) ToOutput() (EntityOutput, error) {
	return MusicServiceCredentialModelToOutput(msc)
}

func (_ *MusicServiceCredential) InitDAO(db *gorm.DB) Entity {
	return InitMusicServiceCredentialDAO(db)
}

func (_ *MusicServiceCredential) Format(val interface{}) (EntityOutput, error) {
	return FormatMusicServiceCredential(val)
}

func (_ *MusicServiceCredential) FormatSlice(val interface{}) (interface{}, error) {
	return FormatMusicServiceCredentialSlice(val)
}
