package policies

import (
	"fmt"
	"strconv"

	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/jinzhu/gorm"
	"github.com/zmb3/spotify"
)

type SourcePolicy struct {
	Sources []jsonmodels.MusicSource

	originalSources *[]jsonmodels.MusicSource
	client          *spotify.Client
	cleanDB         *gorm.DB
}

func (sp *SourcePolicy) Init(mss *[]jsonmodels.MusicSource, cleanDB *gorm.DB, client *spotify.Client) {
	sp.originalSources = mss
	sp.client = client
	sp.cleanDB = cleanDB
}

func (sp *SourcePolicy) Type() string { return "Source" }

func (sp *SourcePolicy) Validate(rf *jsonmodels.RollFilter) bool {
	return rf.Type == sp.Type()
}

func (sp *SourcePolicy) Load(rf *jsonmodels.RollFilter) error {
	if sp.originalSources == nil || sp.client == nil || sp.cleanDB == nil {
		return fmt.Errorf("error, policy not initialized")
	}
	sources := make([]jsonmodels.MusicSource, len(rf.Modifications))
	for i, stringIndex := range rf.Modifications {
		index, err := strconv.ParseUint(stringIndex, 10, 64)
		if err != nil || index >= uint64(len(*sp.originalSources)) {
			return fmt.Errorf("error at index position in modifications %d", i)
		}
		sources[i] = (*sp.originalSources)[index]
	}
	sp.Sources = sources
	return nil
}

func NewSourcePolicy(filter *jsonmodels.RollFilter, sources *[]jsonmodels.MusicSource, db *gorm.DB, client *spotify.Client) (GeneratePolicy, error) {
	switch filter.Name {
	case "Intersection":
		return NewIntersectionSourcePolicy(filter, sources, db, client)
	case "Union":
		return NewUnionSourcePolicy(filter, sources, db, client)
	default:
		return nil, fmt.Errorf("error, invalid filter")
	}
}

type IntersectionSourcePolicy struct {
	SourcePolicy
}

func NewIntersectionSourcePolicy(filter *jsonmodels.RollFilter, sources *[]jsonmodels.MusicSource, cleanDB *gorm.DB, client *spotify.Client) (*IntersectionSourcePolicy, error) {
	isp := &IntersectionSourcePolicy{}
	isp.Init(sources, cleanDB, client)
	if ok := isp.Validate(filter); !ok {
		return nil, fmt.Errorf("intersect source policy error, could not validate filter: %v", filter)
	}
	if err := isp.Load(filter); err != nil {
		return nil, fmt.Errorf("intersect source policy error, could not load filter: %v", filter)
	}
	return isp, nil
}

func (isp *IntersectionSourcePolicy) Name() string { return "Intersection" }

func (isp *IntersectionSourcePolicy) Validate(rf *jsonmodels.RollFilter) bool {
	return isp.SourcePolicy.Validate(rf) && rf.Name == isp.Name()
}

func (isp *IntersectionSourcePolicy) Apply(db *gorm.DB) (*gorm.DB, error) {
	subQueryDB := isp.cleanDB.
		Table("music_service_tracks").
		Joins("LEFT JOIN playlist_tracks ON playlist_tracks.music_service_track_id = music_service_tracks.provider_id").
		Select("music_service_tracks.id")
	for _, source := range isp.Sources {
		subQueryDB = subQueryDB.Where(createTrackLinkedToSource(&source))
	}
	subQuery := subQueryDB.SubQuery()
	return db.Where("music_service_tracks.id IN ?", subQuery), nil
}

type UnionSourcePolicy struct {
	SourcePolicy
}

func NewUnionSourcePolicy(filter *jsonmodels.RollFilter, sources *[]jsonmodels.MusicSource, cleanDB *gorm.DB, client *spotify.Client) (*UnionSourcePolicy, error) {
	usp := &UnionSourcePolicy{}
	usp.Init(sources, cleanDB, client)
	if ok := usp.Validate(filter); !ok {
		return nil, fmt.Errorf("union source policy error, could not validate filter: %v", filter)
	}
	if err := usp.Load(filter); err != nil {
		return nil, fmt.Errorf("union source policy error, could not load filter: %v", filter)
	}
	return usp, nil
}

func (usp *UnionSourcePolicy) Name() string { return "Union" }

func (usp *UnionSourcePolicy) Validate(rf *jsonmodels.RollFilter) bool {
	return usp.SourcePolicy.Validate(rf) && rf.Name == usp.Name()
}

func (usp *UnionSourcePolicy) Apply(db *gorm.DB) (*gorm.DB, error) {
	subQueryDB := usp.cleanDB.
		Table("music_service_tracks").
		Joins("LEFT JOIN playlist_tracks ON playlist_tracks.music_service_track_id = music_service_tracks.provider_id").
		Select("music_service_tracks.id")
	for _, source := range usp.Sources {
		subQueryDB = subQueryDB.Or(createTrackLinkedToSource(&source))
	}
	subQuery := subQueryDB.SubQuery()
	return db.Where("music_service_tracks.id IN ?", subQuery), nil
}
