package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type MusicServiceAlbum struct {
	Model
	Provider   string
	ProviderID string
}

type MusicServiceAlbumInput struct {
	Placeholder string `gql:"placeholder: String"`
}

type MusicServiceAlbumOutput struct {
	Model      `gql:"MODEL"`
	Provider   string `gql:"provider: String" json:"provider"`
	ProviderID string `gql:"providerID: String" json:"providerID"`
}

// Utility Methods

func GetMusicServiceAlbumByProviderInfo(provider, providerID string, db *gorm.DB) (*MusicServiceAlbumOutput, error) {
	//TODO: include cache stale timer
	msa := &MusicServiceAlbum{}
	if err := db.Where(&MusicServiceAlbum{Provider: provider, ProviderID: providerID}).Last(msa).Error; err != nil {
		fmt.Println(err)
		return nil, err
	}
	return FormatMusicServiceAlbum(msa)
}

// Entity Specific Methods

func MusicServiceAlbumInputToModel(msai *MusicServiceAlbumInput) (*MusicServiceAlbum, error) {
	msa := &MusicServiceAlbum{}
	// ADD METHODS TO ENCODE PROPERTIES HERE
	return msa, nil
}

func MusicServiceAlbumOutputToModel(msa *MusicServiceAlbumOutput) (*MusicServiceAlbum, error) {
	return nil, fmt.Errorf("MusicServiceAlbumOutputToModel Not Implemented")
}

func MusicServiceAlbumModelToOutput(msa *MusicServiceAlbum) (*MusicServiceAlbumOutput, error) {
	msao := &MusicServiceAlbumOutput{}
	msao.Model = msa.Model
	msao.Provider = msa.Provider
	msao.ProviderID = msa.ProviderID
	// ADD METHODS TO DECODE PROPERTIES HERE
	return msao, nil
}

func InitMusicServiceAlbumDAO(db *gorm.DB) Entity {
	dao := &MusicServiceAlbum{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatMusicServiceAlbum(val interface{}) (*MusicServiceAlbumOutput, error) {
	msa, ok := val.(*MusicServiceAlbum)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServiceAlbum")
	}
	return MusicServiceAlbumModelToOutput(msa)
}

func FormatMusicServiceAlbumSlice(val interface{}) ([]MusicServiceAlbumOutput, error) {
	msas, ok := val.(*[]MusicServiceAlbum)
	if !ok {
		return nil, fmt.Errorf("error converting to MusicServiceAlbum Slice")
	}
	output := []MusicServiceAlbumOutput{}
	for _, msa := range *msas {
		msao, err := MusicServiceAlbumModelToOutput(&msa)
		if err != nil {
			return nil, err
		}
		output = append(output, *msao)
	}
	return output, nil
}

// Interface Generalization Methods

func (msai *MusicServiceAlbumInput) ToModel() (Entity, error) {
	return MusicServiceAlbumInputToModel(msai)
}

func (msao *MusicServiceAlbumOutput) ToModel() (Entity, error) {
	return MusicServiceAlbumOutputToModel(msao)
}

func (msa *MusicServiceAlbum) ToOutput() (EntityOutput, error) {
	return MusicServiceAlbumModelToOutput(msa)
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
