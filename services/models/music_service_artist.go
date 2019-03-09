package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type MusicServiceArtist struct {
	Model
	Provider   string
	ProviderID string
	Albums     []MusicServiceAlbum `gorm:"foreignkey:ArtistID;association_foreignkey:ProviderID"`

	//Full Artist https://godoc.org/github.com/zmb3/spotify#FullArtist
	Popularity int    `json:"popularity"`
	Name       string `json:"name"`
	Cover      string ` json:"cover"`
}

type MusicServiceArtistInput struct {
	Placeholder string `gql:"placeholder: String"`
}

type MusicServiceArtistOutput struct {
	Model      `gql:"MODEL"`
	Provider   string                    `gql:"provider: String" json:"provider"`
	ProviderID string                    `gql:"providerID: String" json:"providerID"`
	Albums     []MusicServiceAlbumOutput `gql:"albums: [MusicServiceAlbum]" json:"albums"`

	//Full Artist
	Popularity int    `gql:"popularity: Int" json:"popularity"`
	Name       string `gql:"name: String" json:"name"`
	Cover      string `gql:"cover: String" json:"cover"`
}

// Utility Methods

func GetMusicServiceArtistByProviderInfo(provider, providerID string, db *gorm.DB) (*MusicServiceArtistOutput, error) {
	//TODO: include cache stale timer
	msa := &MusicServiceArtist{}
	if err := db.Where(&MusicServiceArtist{Provider: provider, ProviderID: providerID}).Last(msa).Error; err != nil {
		return nil, err
	}
	return FormatMusicServiceArtist(msa)
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
	albums, err := FormatMusicServiceAlbumSlice(&msa.Albums)
	if err != nil {
		return nil, err
	}
	msao.Albums = albums
	msao.Model = msa.Model
	msao.Provider = msa.Provider
	msao.ProviderID = msa.ProviderID
	msao.Popularity = msa.Popularity
	msao.Name = msa.Name
	msao.Cover = msa.Cover
	return msao, nil
}

func InitMusicServiceArtistDAO(db *gorm.DB) Entity {
	dao := &MusicServiceArtist{}
	dao.SetEntity(dao)
	db = db.Preload("Albums.Tracks", func(db *gorm.DB) *gorm.DB {
		return db.Order("music_service_tracks.track_number")
	})
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
