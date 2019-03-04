package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type MusicServicePlaylist struct {
	Model
	Provider   string
	ProviderID string

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
	Provider   string `gql:"provider: String" json:"provider"`
	ProviderID string `gql:"providerID: String" json:"providerID"`

	//Full Playlist https://godoc.org/github.com/zmb3/spotify#FullPlaylist
	Description string `gql:"description: String" json:"description"`
	Cover       string `gql:"cover: String" json:"cover"`
	Name        string `gql:"name: String" json:"name"`
	OwnerID     string `gql:"ownerID: String" json:"owner_id"`
	OwnerName   string `gql:"ownerName: String" json:"owner_name"`
	SnapshotID  string `gql:"snapshotID: String" json:"snapshot_id"`
	IsPublic    bool   `gql:"public: Boolean" json:"public"`
}

// Utility Methods

func GetMusicServicePlaylistByProviderInfo(provider, providerID string, db *gorm.DB) (*MusicServicePlaylistOutput, error) {
	//TODO: include cache stale timer
	mst := &MusicServicePlaylist{}
	if err := db.Where(&MusicServicePlaylist{Provider: provider, ProviderID: providerID}).Last(mst).Error; err != nil {
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
