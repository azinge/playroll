package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type MusicServiceUser struct {
	Model
}

type MusicServiceUserInput struct {
	Placeholder string `gql:"placeholder: String"`
}

type MusicServiceUserOutput struct {
	Model `gql:"MODEL"`
}

// Entity Specific Methods

func MusicServiceUserInputToModel(msui *MusicServiceUserInput) (*MusicServiceUser, error) {
	msu := &MusicServiceUser{}
	// ADD METHODS TO ENCODE PROPERTIES HERE
	return msu, nil
}

func MusicServiceUserOutputToModel(msu *MusicServiceUserOutput) (*MusicServiceUser, error) {
	return nil, fmt.Errorf("MusicServiceUserOutputToModel Not Implemented")
}

func MusicServiceUserModelToOutput(msu *MusicServiceUser) (*MusicServiceUserOutput, error) {
	msuo := &MusicServiceUserOutput{}
	msuo.Model = msu.Model
	// ADD METHODS TO DECODE PROPERTIES HERE
	return msuo, nil
}

func InitMusicServiceUserDAO(db *gorm.DB) Entity {
	dao := &MusicServiceUser{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatMusicServiceUser(val interface{}) (*MusicServiceUserOutput, error) {
	msu, ok := val.(*MusicServiceUser)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServiceUser")
	}
	return MusicServiceUserModelToOutput(msu)
}

func FormatMusicServiceUserSlice(val interface{}) ([]MusicServiceUserOutput, error) {
	msus, ok := val.(*[]MusicServiceUser)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServiceUser Slice")
	}
	output := []MusicServiceUserOutput{}
	for _, msu := range *msus {
		msuo, err := MusicServiceUserModelToOutput(&msu)
		if err != nil {
			return nil, err
		}
		output = append(output, *msuo)
	}
	return output, nil
}

// Interface Generalization Methods

func (msui *MusicServiceUserInput) ToModel() (Entity, error) {
	return MusicServiceUserInputToModel(msui)
}

func (msuo *MusicServiceUserOutput) ToModel() (Entity, error) {
	return MusicServiceUserOutputToModel(msuo)
}

func (msu *MusicServiceUser) ToOutput() (EntityOutput, error) {
	return MusicServiceUserModelToOutput(msu)
}

func (_ *MusicServiceUser) InitDAO(db *gorm.DB) Entity {
	return InitMusicServiceUserDAO(db)
}

func (_ *MusicServiceUser) Format(val interface{}) (EntityOutput, error) {
	return FormatMusicServiceUser(val)
}

func (_ *MusicServiceUser) FormatSlice(val interface{}) (interface{}, error) {
	return FormatMusicServiceUserSlice(val)
}
