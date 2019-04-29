package policies

import (
	"fmt"
	"time"

	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/jinzhu/gorm"
	"github.com/zmb3/spotify"
)

type GeneratePolicyManager struct {
	SourcePolicy   GeneratePolicy
	FilterPolicies []GeneratePolicy
	OrderPolicy    GeneratePolicy
	LengthPolicy   GeneratePolicy
}

func NewGeneratePolicyManager(filters *[]jsonmodels.RollFilter, sources *[]jsonmodels.MusicSource, db *gorm.DB, client *spotify.Client) (*GeneratePolicyManager, error) {
	gpm := &GeneratePolicyManager{}
	for _, filter := range *filters {
		switch filter.Type {
		case "Source":
			policy, err := NewSourcePolicy(&filter, sources, db, client)
			if err != nil {
				return nil, err
			}
			gpm.SourcePolicy = policy
		case "Filter":
			policy, err := NewFilterPolicy(&filter, sources, db, client)
			if err != nil {
				return nil, err
			}
			gpm.FilterPolicies = append(gpm.FilterPolicies, policy)
		case "Order":
			policy, err := NewOrderPolicy(&filter, sources, db, client)
			if err != nil {
				return nil, err
			}
			gpm.OrderPolicy = policy
		case "Length":
			policy, err := NewLengthPolicy(&filter, sources, db, client)
			if err != nil {
				return nil, err
			}
			gpm.LengthPolicy = policy
		default:
			return nil, fmt.Errorf("error, invalid filter")
		}
	}
	if gpm.SourcePolicy == nil {
		policy, err := NewSourcePolicy(&jsonmodels.RollFilter{Type: "Source", Name: "Intersect", Modifications: []string{"0"}}, sources, db, client)
		if err != nil {
			return nil, err
		}
		gpm.SourcePolicy = policy
	}
	return gpm, nil
}

func (gpm *GeneratePolicyManager) ExecuteQuery(db *gorm.DB) (*[]models.MusicServiceTrack, error) {
	tracks := &[]models.MusicServiceTrack{}
	lastHour := time.Now().Add(-1 * time.Hour)
	db = db.Table("music_service_tracks").Joins("LEFT JOIN playlist_tracks ON playlist_tracks.music_service_track_id = music_service_tracks.provider_id").Where("music_service_tracks.updated_at > ?", lastHour)
	var err error
	if gpm.SourcePolicy != nil {
		db, err = gpm.SourcePolicy.Apply(db)
		if err != nil {
			return nil, err
		}
	}
	for _, policy := range gpm.FilterPolicies {
		db, err = policy.Apply(db)
		if err != nil {
			return nil, err
		}
	}
	if gpm.OrderPolicy != nil {
		db, err = gpm.OrderPolicy.Apply(db)
		if err != nil {
			return nil, err
		}
	}
	if gpm.LengthPolicy != nil {
		db, err = gpm.LengthPolicy.Apply(db)
		if err != nil {
			return nil, err
		}
	}
	if err := db.Scan(tracks).Error; err != nil {
		return nil, err
	}
	return tracks, nil
}

func createTrackLinkedToSource(mso *jsonmodels.MusicSource) interface{} {
	switch mso.Type {
	case "Track":
		return models.MusicServiceTrack{ProviderID: mso.ProviderID}
	case "Album":
		return models.MusicServiceTrack{AlbumID: mso.ProviderID}
	case "Artist":
		return models.MusicServiceTrack{ArtistID: mso.ProviderID}
	case "Playlist":
		return models.PlaylistTrack{MusicServicePlaylistID: mso.ProviderID}
	default:
		return nil
	}
}

type GeneratePolicy interface {
	Init(mss *[]jsonmodels.MusicSource, cleanDB *gorm.DB, client *spotify.Client)
	Type() string
	Name() string
	Validate(rf *jsonmodels.RollFilter) bool
	Load(rf *jsonmodels.RollFilter) error
	Apply(db *gorm.DB) (*gorm.DB, error)
}
