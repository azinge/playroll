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
	case "Exclude":
		return NewExcludeFilterPolicy(filter, sources, db, client)
	default:
		return nil, fmt.Errorf("error, invalid filter")
	}
}

type ExcludeFilterPolicy struct {
	FilterPolicy
}

func NewExcludeFilterPolicy(filter *jsonmodels.RollFilter, sources *[]jsonmodels.MusicSource, cleanDB *gorm.DB, client *spotify.Client) (*ExcludeFilterPolicy, error) {
	esp := &ExcludeFilterPolicy{}
	esp.Init(sources, cleanDB, client)
	if ok := esp.Validate(filter); !ok {
		return nil, fmt.Errorf("exclude filter policy error, could not validate filter: %v", filter)
	}
	if err := esp.Load(filter); err != nil {
		return nil, fmt.Errorf("exclude filter policy error, could not load filter: %v", filter)
	}
	return esp, nil
}

func (efp *ExcludeFilterPolicy) Name() string { return "Exclude" }

func (efp *ExcludeFilterPolicy) Validate(rf *jsonmodels.RollFilter) bool {
	return rf.Type == efp.Type() && rf.Name == efp.Name()
}

func (efp *ExcludeFilterPolicy) Apply(db *gorm.DB) (*gorm.DB, error) {
	subQueryDB := efp.cleanDB.
		Table("music_service_tracks").
		Joins("LEFT JOIN playlist_tracks ON playlist_tracks.music_service_track_id = music_service_tracks.provider_id").
		Select("music_service_tracks.id")
	for _, source := range efp.Sources {
		if err := CollectSource(&source, efp.cleanDB, efp.client); err != nil {
			return nil, err
		}
		subQueryDB = subQueryDB.Or(createTrackLinkedToSource(&source))
	}
	subQuery := subQueryDB.SubQuery()
	return db.Not("music_service_tracks.id IN ?", subQuery), nil
}
