package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type MusicServiceArtist struct {
	Model
}

type MusicServiceArtistInput struct {
	Placeholder string `gql:"placeholder: String"`
}

type MusicServiceArtistOutput struct {
	Model `gql:"MODEL"`
}

// Entity Specific Methods

func MusicServiceArtistInputToModel(msai *MusicServiceArtistInput) (*MusicServiceArtist, error) {
	msa := &MusicServiceArtist{}
	// ADD METHODS TO ENCODE PROPERTIES HERE
	return msa, nil
}

func MusicServiceArtistOutputToModel(msa *MusicServiceArtistOutput) (*MusicServiceArtist, error) {
	return nil, fmt.Errorf("MusicServiceArtistOutputToModel Not Implemented")
}

func MusicServiceArtistModelToOutput(msa *MusicServiceArtist) (*MusicServiceArtistOutput, error) {
	msao := &MusicServiceArtistOutput{}
	msao.Model = msa.Model
	// ADD METHODS TO DECODE PROPERTIES HERE
	return msao, nil
}

func InitMusicServiceArtistDAO(db *gorm.DB) Entity {
	dao := &MusicServiceArtist{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatMusicServiceArtist(val interface{}) (*MusicServiceArtistOutput, error) {
	msa, ok := val.(*MusicServiceArtist)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServiceArtist")
	}
	return MusicServiceArtistModelToOutput(msa)
}

func FormatMusicServiceArtistSlice(val interface{}) ([]MusicServiceArtistOutput, error) {
	msas, ok := val.(*[]MusicServiceArtist)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServiceArtist Slice")
	}
	output := []MusicServiceArtistOutput{}
	for _, msa := range *msas {
		msao, err := MusicServiceArtistModelToOutput(&msa)
		if err != nil {
			return nil, err
		}
		output = append(output, *msao)
	}
	return output, nil
}

// Interface Generalization Methods

func (msai *MusicServiceArtistInput) ToModel() (Entity, error) {
	return MusicServiceArtistInputToModel(msai)
}

func (msao *MusicServiceArtistOutput) ToModel() (Entity, error) {
	return MusicServiceArtistOutputToModel(msao)
}

func (msa *MusicServiceArtist) ToOutput() (EntityOutput, error) {
	return MusicServiceArtistModelToOutput(msa)
}

func (_ *MusicServiceArtist) InitDAO(db *gorm.DB) Entity {
	return InitMusicServiceArtistDAO(db)
}

func (_ *MusicServiceArtist) Format(val interface{}) (EntityOutput, error) {
	return FormatMusicServiceArtist(val)
}

func (_ *MusicServiceArtist) FormatSlice(val interface{}) (interface{}, error) {
	return FormatMusicServiceArtistSlice(val)
}
