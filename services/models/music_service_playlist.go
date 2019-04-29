package models

import (
	"fmt"
	"time"

	"github.com/jinzhu/gorm"
)

type MusicServicePlaylist struct {
	Model
	Provider   string
	ProviderID string
	Tracks     []PlaylistTrack `gorm:"foreignkey:MusicServicePlaylistID;association_foreignkey:ProviderID"`

	//Full Playlist https://godoc.org/github.com/zmb3/spotify#FullPlaylist
	Description string `json:"description"`
	Cover       string `json:"cover"`
	Name        string `json:"name"`
	OwnerID     string `json:"owner_id"`
	OwnerName   string `json:"owner_name"`
	SnapshotID  string `json:"snapshot_id"`
	IsPublic    bool   `json:"public"`
}

type MusicServicePlaylistInput struct {
	Placeholder string `gql:"placeholder: String"`
}

type MusicServicePlaylistOutput struct {
	Model      `gql:"MODEL"`
	Provider   string                    `gql:"provider: String" json:"provider"`
	ProviderID string                    `gql:"providerID: String" json:"providerID"`
	Tracks     []MusicServiceTrackOutput `gql:"tracks: [MusicServiceTrack]" json:"tracks"`

	//Full Playlist https://godoc.org/github.com/zmb3/spotify#FullPlaylist
	Description string `gql:"description: String" json:"description"`
	Cover       string `gql:"cover: String" json:"cover"`
	Name        string `gql:"name: String" json:"name"`
	OwnerID     string `gql:"ownerID: String" json:"owner_id"`
	OwnerName   string `gql:"ownerName: String" json:"owner_name"`
	SnapshotID  string `gql:"snapshotID: String" json:"snapshot_id"`
	IsPublic    bool   `gql:"public: Boolean" json:"public"`
}

// Supplementary Entities
type PlaylistTrack struct {
	Model
	MusicServicePlaylist   MusicServicePlaylist `gorm:"foreignkey:ProviderID;association_foreignkey:MusicServicePlaylistID"`
	MusicServicePlaylistID string
	MusicServiceTrack      MusicServiceTrack `gorm:"foreignkey:ProviderID;association_foreignkey:MusicServiceTrackID"`
	MusicServiceTrackID    string
	TrackNumber            int
}

// Utility Methods

func GetMusicServicePlaylistByProviderInfo(provider, providerID string, db *gorm.DB) (*MusicServicePlaylistOutput, error) {
	lastHour := time.Now().Add(-1 * time.Hour)
	mst := &MusicServicePlaylist{}
	if err := db.Where("updated_at > ?", lastHour).Where(&MusicServicePlaylist{Provider: provider, ProviderID: providerID}).Last(mst).Error; err != nil {
		return nil, err
	}
	return FormatMusicServicePlaylist(mst)
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
	tracks := make([]MusicServiceTrackOutput, len(msp.Tracks))
	for i, track := range msp.Tracks {
		t, err := FormatMusicServiceTrack(&track.MusicServiceTrack)
		if err != nil {
			return nil, err
		}
		tracks[i] = *t
	}
	mspo.Tracks = tracks
	mspo.Model = msp.Model
	mspo.Provider = msp.Provider
	mspo.ProviderID = msp.ProviderID
	mspo.Description = msp.Description
	mspo.Cover = msp.Cover
	mspo.Name = msp.Name
	mspo.OwnerID = msp.OwnerID
	mspo.OwnerName = msp.OwnerName
	mspo.SnapshotID = msp.SnapshotID
	mspo.IsPublic = msp.IsPublic
	return mspo, nil
}

func InitMusicServicePlaylistDAO(db *gorm.DB) Entity {
	dao := &MusicServicePlaylist{}
	dao.SetEntity(dao)
	db = db.Preload("Tracks.MusicServiceTrack", func(db *gorm.DB) *gorm.DB {
		return db.Order("track_number")
	})
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
