package policies

import (
	"fmt"
	"strconv"

	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/jinzhu/gorm"
	"github.com/zmb3/spotify"
)

type FilterPolicy struct {
	Sources []jsonmodels.MusicSource

	originalSources *[]jsonmodels.MusicSource
	client          *spotify.Client
	cleanDB         *gorm.DB
}

func (fp *FilterPolicy) Init(mss *[]jsonmodels.MusicSource, cleanDB *gorm.DB, client *spotify.Client) {
	fp.originalSources = mss
	fp.client = client
	fp.cleanDB = cleanDB
}

func (fp *FilterPolicy) Type() string { return "Filter" }

func (fp *FilterPolicy) Validate(rf *jsonmodels.RollFilter) bool {
	return rf.Type == fp.Type()
}

func (fp *FilterPolicy) Load(rf *jsonmodels.RollFilter) error {
	if fp.originalSources == nil || fp.client == nil || fp.cleanDB == nil {
		return fmt.Errorf("error, policy not initialized")
	}
	sources := make([]jsonmodels.MusicSource, len(rf.Modifications))
	for i, stringIndex := range rf.Modifications {
		index, err := strconv.ParseUint(stringIndex, 10, 64)
		if err != nil || index >= uint64(len(*fp.originalSources)) {
			return fmt.Errorf("error at index position in modifications %d", i)
		}
		sources[i] = (*fp.originalSources)[index]
	}
	fp.Sources = sources
	return nil
}

func NewFilterPolicy(filter *jsonmodels.RollFilter, sources *[]jsonmodels.MusicSource, db *gorm.DB, client *spotify.Client) (GeneratePolicy, error) {
	switch filter.Name {
	case "ExcludeSources":
		return NewExcludeSourcesFilterPolicy(filter, sources, db, client)
	case "IncludeSources":
		return NewIncludeSourcesFilterPolicy(filter, sources, db, client)
	default:
		return nil, fmt.Errorf("error, invalid filter")
	}
}

type ExcludeSourcesFilterPolicy struct {
	FilterPolicy
}

func NewExcludeSourcesFilterPolicy(filter *jsonmodels.RollFilter, sources *[]jsonmodels.MusicSource, cleanDB *gorm.DB, client *spotify.Client) (*ExcludeSourcesFilterPolicy, error) {
	esfp := &ExcludeSourcesFilterPolicy{}
	esfp.Init(sources, cleanDB, client)
	if ok := esfp.Validate(filter); !ok {
		return nil, fmt.Errorf("exclude filter policy error, could not validate filter: %v", filter)
	}
	if err := esfp.Load(filter); err != nil {
		return nil, fmt.Errorf("exclude filter policy error, could not load filter: %v", filter)
	}
	return esfp, nil
}

func (esfp *ExcludeSourcesFilterPolicy) Name() string { return "ExcludeSources" }

func (esfp *ExcludeSourcesFilterPolicy) Validate(rf *jsonmodels.RollFilter) bool {
	return esfp.FilterPolicy.Validate(rf) && rf.Name == esfp.Name()
}

func (esfp *ExcludeSourcesFilterPolicy) Apply(db *gorm.DB) (*gorm.DB, error) {
	subQueryDB := esfp.cleanDB.
		Table("music_service_tracks").
		Joins("LEFT JOIN playlist_tracks ON playlist_tracks.music_service_track_id = music_service_tracks.provider_id").
		Select("music_service_tracks.id")
	for _, source := range esfp.Sources {
		if err := CollectSource(&source, esfp.cleanDB, esfp.client); err != nil {
			return nil, err
		}
		subQueryDB = subQueryDB.Or(createTrackLinkedToSource(&source))
	}
	subQuery := subQueryDB.SubQuery()
	return db.Not("music_service_tracks.id IN ?", subQuery), nil
}

type IncludeSourcesFilterPolicy struct {
	FilterPolicy
}

func NewIncludeSourcesFilterPolicy(filter *jsonmodels.RollFilter, sources *[]jsonmodels.MusicSource, cleanDB *gorm.DB, client *spotify.Client) (*IncludeSourcesFilterPolicy, error) {
	isfp := &IncludeSourcesFilterPolicy{}
	isfp.Init(sources, cleanDB, client)
	if ok := isfp.Validate(filter); !ok {
		return nil, fmt.Errorf("exclude filter policy error, could not validate filter: %v", filter)
	}
	if err := isfp.Load(filter); err != nil {
		return nil, fmt.Errorf("exclude filter policy error, could not load filter: %v", filter)
	}
	return isfp, nil
}

func (isfp *IncludeSourcesFilterPolicy) Name() string { return "IncludeSources" }

func (isfp *IncludeSourcesFilterPolicy) Validate(rf *jsonmodels.RollFilter) bool {
	return isfp.FilterPolicy.Validate(rf) && rf.Name == isfp.Name()
}

func (isfp *IncludeSourcesFilterPolicy) Apply(db *gorm.DB) (*gorm.DB, error) {
	subQueryDB := isfp.cleanDB.
		Table("music_service_tracks").
		Joins("LEFT JOIN playlist_tracks ON playlist_tracks.music_service_track_id = music_service_tracks.provider_id").
		Select("music_service_tracks.id")
	for _, source := range isfp.Sources {
		if err := CollectSource(&source, isfp.cleanDB, isfp.client); err != nil {
			return nil, err
		}
		subQueryDB = subQueryDB.Or(createTrackLinkedToSource(&source))
	}
	subQuery := subQueryDB.SubQuery()
	return db.Where("music_service_tracks.id IN ?", subQuery), nil
}
