package policies

import (
	"fmt"
	"strconv"

	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/jinzhu/gorm"
	"github.com/zmb3/spotify"
)

type LengthPolicy struct {
	Sources []jsonmodels.MusicSource

	originalSources *[]jsonmodels.MusicSource
	client          *spotify.Client
	cleanDB         *gorm.DB
}

func (lp *LengthPolicy) Init(mss *[]jsonmodels.MusicSource, cleanDB *gorm.DB, client *spotify.Client) {
	lp.originalSources = mss
	lp.client = client
	lp.cleanDB = cleanDB
}

func (lp *LengthPolicy) Type() string { return "Length" }

func (lp *LengthPolicy) Validate(rf *jsonmodels.RollFilter) bool {
	return rf.Type == lp.Type()
}

func (lp *LengthPolicy) Load(rf *jsonmodels.RollFilter) error {
	if lp.originalSources == nil || lp.client == nil || lp.cleanDB == nil {
		return fmt.Errorf("error, policy not initialized")
	}
	return nil
}

func NewLengthPolicy(filter *jsonmodels.RollFilter, sources *[]jsonmodels.MusicSource, db *gorm.DB, client *spotify.Client) (GeneratePolicy, error) {
	switch filter.Name {
	case "Default":
		return NewDefaultLengthPolicy(filter, sources, db, client)
	case "NumberOfSongs":
		return NewNumberOfSongsLengthPolicy(filter, sources, db, client)
	default:
		return nil, fmt.Errorf("error, invalid filter")
	}
}

type DefaultLengthPolicy struct {
	LengthPolicy
}

func NewDefaultLengthPolicy(filter *jsonmodels.RollFilter, sources *[]jsonmodels.MusicSource, cleanDB *gorm.DB, client *spotify.Client) (*DefaultLengthPolicy, error) {
	dlp := &DefaultLengthPolicy{}
	dlp.Init(sources, cleanDB, client)
	if ok := dlp.Validate(filter); !ok {
		return nil, fmt.Errorf("number of songs length policy error, could not validate filter: %v", filter)
	}
	if err := dlp.Load(filter); err != nil {
		return nil, fmt.Errorf("number of songs length policy error, could not load filter: %v", filter)
	}
	return dlp, nil
}

func (dlp *DefaultLengthPolicy) Name() string { return "Default" }

func (dlp *DefaultLengthPolicy) Validate(rf *jsonmodels.RollFilter) bool {
	return dlp.LengthPolicy.Validate(rf) && rf.Name == dlp.Name()
}

func (dlp *DefaultLengthPolicy) Apply(db *gorm.DB) (*gorm.DB, error) {
	if len(*dlp.originalSources) != 1 {
		return db.Offset(0).Limit(10), nil
	}
	switch (*dlp.originalSources)[0].Type {
	case "Track":
		return db.Offset(0).Limit(1), nil
	case "Album":
		return db.Offset(0).Limit(20), nil
	case "Artist":
		return db.Offset(0).Limit(10), nil
	case "Playlist":
		return db.Offset(0).Limit(20), nil
	default:
		return db.Offset(0).Limit(10), nil
	}
}

type NumberOfSongsLengthPolicy struct {
	LengthPolicy
	offset int64
	limit  int64
}

func NewNumberOfSongsLengthPolicy(filter *jsonmodels.RollFilter, sources *[]jsonmodels.MusicSource, cleanDB *gorm.DB, client *spotify.Client) (*NumberOfSongsLengthPolicy, error) {
	noslp := &NumberOfSongsLengthPolicy{}
	noslp.Init(sources, cleanDB, client)
	if ok := noslp.Validate(filter); !ok {
		return nil, fmt.Errorf("number of songs length policy error, could not validate filter: %v", filter)
	}
	if err := noslp.Load(filter); err != nil {
		return nil, fmt.Errorf("number of songs length policy error, could not load filter: %v", filter)
	}
	return noslp, nil
}

func (noslp *NumberOfSongsLengthPolicy) Name() string { return "NumberOfSongs" }

func (noslp *NumberOfSongsLengthPolicy) Validate(rf *jsonmodels.RollFilter) bool {
	return noslp.LengthPolicy.Validate(rf) && rf.Name == noslp.Name()
}

func (noslp *NumberOfSongsLengthPolicy) Load(rf *jsonmodels.RollFilter) error {
	noslp.LengthPolicy.Load(rf)
	offset, err := strconv.ParseInt(rf.Modifications[0], 10, 64)
	if err != nil {
		fmt.Println("offset error in handleLengths()")
		fmt.Println(err)
		return err
	}

	limit, err := strconv.ParseInt(rf.Modifications[1], 10, 64)
	if err != nil {
		fmt.Println("limit error in handleLengths()")
		fmt.Println(err)
		return err
	}

	noslp.offset = offset
	noslp.limit = limit
	return nil
}

func (noslp *NumberOfSongsLengthPolicy) Apply(db *gorm.DB) (*gorm.DB, error) {
	return db.Offset(noslp.offset).Limit(noslp.limit), nil
}
