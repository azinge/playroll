package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type MusicServicePlaylist struct {
	Model
}

type MusicServicePlaylistInput struct {
	Placeholder string `gql:"placeholder: String"`
}

type MusicServicePlaylistOutput struct {
	Model `gql:"MODEL"`
}

// Entity Specific Methods

func MusicServicePlaylistInputToModel(mspi *MusicServicePlaylistInput) (*MusicServicePlaylist, error) {
	msp := &MusicServicePlaylist{}
	// ADD METHODS TO ENCODE PROPERTIES HERE
	return msp, nil
}

func MusicServicePlaylistOutputToModel(msp *MusicServicePlaylistOutput) (*MusicServicePlaylist, error) {
	return nil, fmt.Errorf("MusicServicePlaylistOutputToModel Not Implemented")
}

func MusicServicePlaylistModelToOutput(msp *MusicServicePlaylist) (*MusicServicePlaylistOutput, error) {
	mspo := &MusicServicePlaylistOutput{}
	mspo.Model = msp.Model
	// ADD METHODS TO DECODE PROPERTIES HERE
	return mspo, nil
}

func InitMusicServicePlaylistDAO(db *gorm.DB) Entity {
	dao := &MusicServicePlaylist{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatMusicServicePlaylist(val interface{}) (*MusicServicePlaylistOutput, error) {
	msp, ok := val.(*MusicServicePlaylist)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServicePlaylist")
	}
	return MusicServicePlaylistModelToOutput(msp)
}

func FormatMusicServicePlaylistSlice(val interface{}) ([]MusicServicePlaylistOutput, error) {
	msps, ok := val.(*[]MusicServicePlaylist)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServicePlaylist Slice")
	}
	output := []MusicServicePlaylistOutput{}
	for _, msp := range *msps {
		mspo, err := MusicServicePlaylistModelToOutput(&msp)
		if err != nil {
			return nil, err
		}
		output = append(output, *mspo)
	}
	return output, nil
}

// Interface Generalization Methods

func (mspi *MusicServicePlaylistInput) ToModel() (Entity, error) {
	return MusicServicePlaylistInputToModel(mspi)
}

func (mspo *MusicServicePlaylistOutput) ToModel() (Entity, error) {
	return MusicServicePlaylistOutputToModel(mspo)
}

func (msp *MusicServicePlaylist) ToOutput() (EntityOutput, error) {
	return MusicServicePlaylistModelToOutput(msp)
}

func (_ *MusicServicePlaylist) InitDAO(db *gorm.DB) Entity {
	return InitMusicServicePlaylistDAO(db)
}

func (_ *MusicServicePlaylist) Format(val interface{}) (EntityOutput, error) {
	return FormatMusicServicePlaylist(val)
}

func (_ *MusicServicePlaylist) FormatSlice(val interface{}) (interface{}, error) {
	return FormatMusicServicePlaylistSlice(val)
}
