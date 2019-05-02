package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type MusicServiceTrack struct {
	Model
	Provider   string
	ProviderID string

	// Full Track https://godoc.org/github.com/zmb3/spotify#FullTrack
	Cover       string `json:"cover"`
	Popularity  int    `json:"popularity"`
	AlbumID     string `json:"albumID"`
	AlbumName   string `json:"albumName"`
	ArtistID    string `json:"artistID"`
	ArtistName  string `json:"artistName"`
	DiscNumber  int    `json:"disc_number"`
	Duration    int    `json:"duration_ms"`
	Explicit    bool   `json:"explicit"`
	Name        string `json:"name"`
	TrackNumber int    `json:"track_number"`

	// Audio Features https://godoc.org/github.com/zmb3/spotify#AudioFeatures
	Acousticness     float32 `json:"acousticness"`
	Danceability     float32 `json:"danceability"`
	Energy           float32 `json:"energy"`
	Instrumentalness float32 `json:"instrumentalness"`
	Key              int     `json:"key"`
	Liveness         float32 `json:"liveness"`
	Loudness         float32 `json:"loudness"`
	Mode             int     `json:"mode"`
	Speechiness      float32 `json:"speechiness"`
	Tempo            float32 `json:"tempo"`
	TimeSignature    int     `json:"time_signature"`
	Valence          float32 `json:"valence"`
}

type MusicServiceTrackInput struct {
	Placeholder string `gql:"placeholder: String"`
}

type MusicServiceTrackOutput struct {
	Model      `gql:"MODEL"`
	Provider   string `gql:"provider: String" json:"provider"`
	ProviderID string `gql:"providerID: String" json:"providerID"`

	// Full Track
	Cover       string `gql:"cover: String" json:"cover"`
	Popularity  int    `gql:"popularity: Int" json:"popularity"`
	AlbumID     string `gql:"albumID: String" json:"albumID"`
	AlbumName   string `gql:"albumName: String" json:"albumName"`
	ArtistID    string `gql:"artistID: String" json:"artistID"`
	ArtistName  string `gql:"artistName: String" json:"artistName"`
	DiscNumber  int    `gql:"discNumber: Int" json:"disc_number"`
	Duration    int    `gql:"duration: Int" json:"duration_ms"`
	Explicit    bool   `gql:"explicit: Boolean" json:"explicit"`
	Name        string `gql:"name: String" json:"name"`
	TrackNumber int    `gql:"trackNumber: String" json:"track_number"`

	// Audio Features
	Acousticness     float32 `gql:"acousticness: Float" json:"acousticness"`
	Danceability     float32 `gql:"danceability: Float" json:"danceability"`
	Energy           float32 `gql:"energy: Float" json:"energy"`
	Instrumentalness float32 `gql:"instrumentalness: Float" json:"instrumentalness"`
	Key              int     `gql:"key: Int" json:"key"`
	Liveness         float32 `gql:"liveness: Float" json:"liveness"`
	Loudness         float32 `gql:"loudness: Float" json:"loudness"`
	Mode             int     `gql:"mode: Int" json:"mode"`
	Speechiness      float32 `gql:"speechiness: Float" json:"speechiness"`
	Tempo            float32 `gql:"tempo: Float" json:"tempo"`
	TimeSignature    int     `gql:"timeSignature: Int" json:"time_signature"`
	Valence          float32 `gql:"valence: Float" json:"valence"`
}

// Utility Methods

func GetMusicServiceTrackByProviderInfo(provider, providerID string, db *gorm.DB) (*MusicServiceTrackOutput, error) {
	mst := &MusicServiceTrack{}
	if err := db.Where(&MusicServiceTrack{Provider: provider, ProviderID: providerID}).Last(mst).Error; err != nil {
		return nil, err
	}
	return FormatMusicServiceTrack(mst)
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
	msto.Provider = mst.Provider
	msto.ProviderID = mst.ProviderID

	// Full Track
	msto.Cover = mst.Cover
	msto.Popularity = mst.Popularity
	msto.AlbumID = mst.AlbumID
	msto.AlbumName = mst.AlbumName
	msto.ArtistID = mst.ArtistID
	msto.ArtistName = mst.ArtistName
	msto.DiscNumber = mst.DiscNumber
	msto.Duration = mst.Duration
	msto.Explicit = mst.Explicit
	msto.Name = mst.Name
	msto.TrackNumber = mst.TrackNumber

	// Audio Features
	msto.Acousticness = mst.Acousticness
	msto.Danceability = mst.Danceability
	msto.Energy = mst.Energy
	msto.Instrumentalness = mst.Instrumentalness
	msto.Key = mst.Key
	msto.Liveness = mst.Liveness
	msto.Loudness = mst.Loudness
	msto.Mode = mst.Mode
	msto.Speechiness = mst.Speechiness
	msto.Tempo = mst.Tempo
	msto.TimeSignature = mst.TimeSignature
	msto.Valence = mst.Valence
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
