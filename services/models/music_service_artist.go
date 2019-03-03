package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type MusicServiceArtist struct {
	Model
}

type MusicServiceArtistInput struct {
}

type MusicServiceArtistOutput struct {
	Model `gql:"MODEL"`
}

// Entity Specific Methods

func MusicServiceArtistInputToModel(msi *MusicServiceArtistInput) (*MusicServiceArtist, error) {
	ms := &MusicServiceArtist{}
	return ms, nil
}

func MusicServiceArtistOutputToModel(ms *MusicServiceArtistOutput) (*MusicServiceArtist, error) {
	return nil, fmt.Errorf("MusicServiceArtistOutputToModel Not Implemented")
}

func MusicServiceArtistModelToOutput(ms *MusicServiceArtist) (*MusicServiceArtistOutput, error) {
	mso := &MusicServiceArtistOutput{}
	mso.Model = ms.Model
	return mso, nil
}

func InitMusicServiceArtistDAO(db *gorm.DB) Entity {
	dao := &MusicServiceArtist{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatMusicServiceArtist(val interface{}) (*MusicServiceArtistOutput, error) {
	ms, ok := val.(*MusicServiceArtist)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServiceArtist")
	}
	return MusicServiceArtistModelToOutput(ms)
}

func FormatMusicServiceArtistSlice(val interface{}) ([]MusicServiceArtistOutput, error) {
	mss, ok := val.(*[]MusicServiceArtist)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServiceArtist Slice")
	}
	output := []MusicServiceArtistOutput{}
	for _, ms := range *mss {
		mso, err := MusicServiceArtistModelToOutput(&ms)
		if err != nil {
			return nil, err
		}
		output = append(output, *mso)
	}
	return output, nil
}

// Interface Generalization Methods

func (msi *MusicServiceArtistInput) ToModel() (Entity, error) {
	return MusicServiceArtistInputToModel(msi)
}

func (mso *MusicServiceArtistOutput) ToModel() (Entity, error) {
	return MusicServiceArtistOutputToModel(mso)
}

func (ms *MusicServiceArtist) ToOutput() (EntityOutput, error) {
	return MusicServiceArtistModelToOutput(ms)
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
