package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type MusicServiceAlbum struct {
	Model
}

type MusicServiceAlbumInput struct {
}

type MusicServiceAlbumOutput struct {
	Model `gql:"MODEL"`
}

// Entity Specific Methods

func MusicServiceAlbumInputToModel(msi *MusicServiceAlbumInput) (*MusicServiceAlbum, error) {
	ms := &MusicServiceAlbum{}
	return ms, nil
}

func MusicServiceAlbumOutputToModel(ms *MusicServiceAlbumOutput) (*MusicServiceAlbum, error) {
	return nil, fmt.Errorf("MusicServiceAlbumOutputToModel Not Implemented")
}

func MusicServiceAlbumModelToOutput(ms *MusicServiceAlbum) (*MusicServiceAlbumOutput, error) {
	mso := &MusicServiceAlbumOutput{}
	mso.Model = ms.Model
	return mso, nil
}

func InitMusicServiceAlbumDAO(db *gorm.DB) Entity {
	dao := &MusicServiceAlbum{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatMusicServiceAlbum(val interface{}) (*MusicServiceAlbumOutput, error) {
	ms, ok := val.(*MusicServiceAlbum)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServiceAlbum")
	}
	return MusicServiceAlbumModelToOutput(ms)
}

func FormatMusicServiceAlbumSlice(val interface{}) ([]MusicServiceAlbumOutput, error) {
	mss, ok := val.(*[]MusicServiceAlbum)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServiceAlbum Slice")
	}
	output := []MusicServiceAlbumOutput{}
	for _, ms := range *mss {
		mso, err := MusicServiceAlbumModelToOutput(&ms)
		if err != nil {
			return nil, err
		}
		output = append(output, *mso)
	}
	return output, nil
}

// Interface Generalization Methods

func (msi *MusicServiceAlbumInput) ToModel() (Entity, error) {
	return MusicServiceAlbumInputToModel(msi)
}

func (mso *MusicServiceAlbumOutput) ToModel() (Entity, error) {
	return MusicServiceAlbumOutputToModel(mso)
}

func (ms *MusicServiceAlbum) ToOutput() (EntityOutput, error) {
	return MusicServiceAlbumModelToOutput(ms)
}

func (_ *MusicServiceAlbum) InitDAO(db *gorm.DB) Entity {
	return InitMusicServiceAlbumDAO(db)
}

func (_ *MusicServiceAlbum) Format(val interface{}) (EntityOutput, error) {
	return FormatMusicServiceAlbum(val)
}

func (_ *MusicServiceAlbum) FormatSlice(val interface{}) (interface{}, error) {
	return FormatMusicServiceAlbumSlice(val)
}
