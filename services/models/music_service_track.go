package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type MusicServiceTrack struct {
	Model
}

type MusicServiceTrackInput struct {
	Placeholder string `gql:"placeholder: String"`
}

type MusicServiceTrackOutput struct {
	Model `gql:"MODEL"`
}

// Entity Specific Methods

func MusicServiceTrackInputToModel(msti *MusicServiceTrackInput) (*MusicServiceTrack, error) {
	mst := &MusicServiceTrack{}
	// ADD METHODS TO ENCODE PROPERTIES HERE
	return mst, nil
}

func MusicServiceTrackOutputToModel(mst *MusicServiceTrackOutput) (*MusicServiceTrack, error) {
	return nil, fmt.Errorf("MusicServiceTrackOutputToModel Not Implemented")
}

func MusicServiceTrackModelToOutput(mst *MusicServiceTrack) (*MusicServiceTrackOutput, error) {
	msto := &MusicServiceTrackOutput{}
	msto.Model = mst.Model
	// ADD METHODS TO DECODE PROPERTIES HERE
	return msto, nil
}

func InitMusicServiceTrackDAO(db *gorm.DB) Entity {
	dao := &MusicServiceTrack{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatMusicServiceTrack(val interface{}) (*MusicServiceTrackOutput, error) {
	mst, ok := val.(*MusicServiceTrack)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServiceTrack")
	}
	return MusicServiceTrackModelToOutput(mst)
}

func FormatMusicServiceTrackSlice(val interface{}) ([]MusicServiceTrackOutput, error) {
	msts, ok := val.(*[]MusicServiceTrack)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServiceTrack Slice")
	}
	output := []MusicServiceTrackOutput{}
	for _, mst := range *msts {
		msto, err := MusicServiceTrackModelToOutput(&mst)
		if err != nil {
			return nil, err
		}
		output = append(output, *msto)
	}
	return output, nil
}

// Interface Generalization Methods

func (msti *MusicServiceTrackInput) ToModel() (Entity, error) {
	return MusicServiceTrackInputToModel(msti)
}

func (msto *MusicServiceTrackOutput) ToModel() (Entity, error) {
	return MusicServiceTrackOutputToModel(msto)
}

func (mst *MusicServiceTrack) ToOutput() (EntityOutput, error) {
	return MusicServiceTrackModelToOutput(mst)
}

func (_ *MusicServiceTrack) InitDAO(db *gorm.DB) Entity {
	return InitMusicServiceTrackDAO(db)
}

func (_ *MusicServiceTrack) Format(val interface{}) (EntityOutput, error) {
	return FormatMusicServiceTrack(val)
}

func (_ *MusicServiceTrack) FormatSlice(val interface{}) (interface{}, error) {
	return FormatMusicServiceTrackSlice(val)
}
