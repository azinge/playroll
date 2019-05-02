package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type MusicServiceAlbum struct {
	Model
	Provider   string
	ProviderID string
	Tracks     []MusicServiceTrack `gorm:"foreignkey:AlbumID;association_foreignkey:ProviderID"`

	// Full Album https://godoc.org/github.com/zmb3/spotify#FullAlbum
	Popularity           int    `json:"popularity"`
	ReleaseDate          string `json:"release_date"`
	ReleaseDatePrecision string `json:"release_date_precision"`
	Name                 string `json:"name"`
	ArtistID             string `json:"artistID"`
	ArtistName           string `json:"artistName"`
	AlbumGroup           string `json:"album_group"`
	AlbumType            string `json:"album_type"`
	Cover                string `json:"cover"`
}

type MusicServiceAlbumInput struct {
	Placeholder string `gql:"placeholder: String"`
}

type MusicServiceAlbumOutput struct {
	Model      `gql:"MODEL"`
	Provider   string                    `gql:"provider: String" json:"provider"`
	ProviderID string                    `gql:"providerID: String" json:"providerID"`
	Tracks     []MusicServiceTrackOutput `gql:"tracks: [MusicServiceTrack]" json:"tracks"`

	// Full Album
	Popularity           int    `gql:"popularity: Int" json:"popularity"`
	ReleaseDate          string `gql:"releaseDate: String" json:"release_date"`
	ReleaseDatePrecision string `gql:"releaseDatePrecision: String" json:"release_date_precision"`
	Name                 string `gql:"name: String" json:"name"`
	ArtistID             string `gql:"artistID: String" json:"artistID"`
	ArtistName           string `gql:"artistName: String" json:"artistName"`
	AlbumGroup           string `gql:"albumGroup: String" json:"album_group"`
	AlbumType            string `gql:"albumType: String" json:"album_type"`
	Cover                string `gql:"cover: String" json:"cover"`
}

// Utility Methods

func GetMusicServiceAlbumByProviderInfo(provider, providerID string, db *gorm.DB) (*MusicServiceAlbumOutput, error) {
	msa := &MusicServiceAlbum{}
	if err := db.Where(&MusicServiceAlbum{Provider: provider, ProviderID: providerID}).Last(msa).Error; err != nil {
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
	tracks, err := FormatMusicServiceTrackSlice(&msa.Tracks)
	if err != nil {
		return nil, err
	}
	msao.Tracks = tracks

	// Full Album
	msao.Popularity = msa.Popularity
	msao.ReleaseDate = msa.ReleaseDate
	msao.ReleaseDatePrecision = msa.ReleaseDatePrecision
	msao.Name = msa.Name
	msao.ArtistID = msa.ArtistID
	msao.ArtistName = msa.ArtistName
	msao.AlbumGroup = msa.AlbumGroup
	msao.AlbumType = msa.AlbumType
	msao.Cover = msa.Cover
	return msao, nil
}

func InitMusicServiceAlbumDAO(db *gorm.DB) Entity {
	dao := &MusicServiceAlbum{}
	dao.SetEntity(dao)
	db = db.Preload("Tracks", func(db *gorm.DB) *gorm.DB {
		return db.Order("track_number")
	})
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
