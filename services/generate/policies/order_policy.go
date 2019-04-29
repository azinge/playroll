package policies

import (
	"fmt"

	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/jinzhu/gorm"
	"github.com/zmb3/spotify"
)

type OrderPolicy struct {
	Sources []jsonmodels.MusicSource

	originalSources *[]jsonmodels.MusicSource
	client          *spotify.Client
	cleanDB         *gorm.DB
}

func (op *OrderPolicy) Init(mss *[]jsonmodels.MusicSource, cleanDB *gorm.DB, client *spotify.Client) {
	op.originalSources = mss
	op.client = client
	op.cleanDB = cleanDB
}

func (op *OrderPolicy) Type() string { return "Order" }

func (op *OrderPolicy) Validate(rf *jsonmodels.RollFilter) bool {
	return rf.Type == op.Type()
}

func (op *OrderPolicy) Load(rf *jsonmodels.RollFilter) error {
	if op.originalSources == nil || op.client == nil || op.cleanDB == nil {
		return fmt.Errorf("error, policy not initialized")
	}
	return nil
}

func NewOrderPolicy(filter *jsonmodels.RollFilter, sources *[]jsonmodels.MusicSource, db *gorm.DB, client *spotify.Client) (GeneratePolicy, error) {
	switch filter.Name {
	case "Default":
		return NewDefaultOrderPolicy(filter, sources, db, client)
	case "Random":
		return NewRandomOrderPolicy(filter, sources, db, client)
	default:
		return nil, fmt.Errorf("error, invalid filter")
	}
}

type DefaultOrderPolicy struct {
	OrderPolicy
}

func NewDefaultOrderPolicy(filter *jsonmodels.RollFilter, sources *[]jsonmodels.MusicSource, cleanDB *gorm.DB, client *spotify.Client) (*DefaultOrderPolicy, error) {
	dop := &DefaultOrderPolicy{}
	dop.Init(sources, cleanDB, client)
	if ok := dop.Validate(filter); !ok {
		return nil, fmt.Errorf("random order policy error, could not validate filter: %v", filter)
	}
	if err := dop.Load(filter); err != nil {
		return nil, fmt.Errorf("random order policy error, could not load filter: %v", filter)
	}
	return dop, nil
}

func (dop *DefaultOrderPolicy) Name() string { return "Default" }

func (dop *DefaultOrderPolicy) Validate(rf *jsonmodels.RollFilter) bool {
	return dop.OrderPolicy.Validate(rf) && rf.Name == dop.Name()
}

func (dop *DefaultOrderPolicy) Apply(db *gorm.DB) (*gorm.DB, error) {
	if len(*dop.originalSources) != 1 {
		return db.Order("random()"), nil
	}
	switch (*dop.originalSources)[0].Type {
	case "Track":
		return db, nil
	case "Album":
		return db.Order("track_number"), nil
	case "Artist":
		return db.Order("random()"), nil
	case "Playlist":
		return db.Order("random()"), nil
	default:
		return db.Order("random()"), nil
	}
}

type RandomOrderPolicy struct {
	OrderPolicy
}

func NewRandomOrderPolicy(filter *jsonmodels.RollFilter, sources *[]jsonmodels.MusicSource, cleanDB *gorm.DB, client *spotify.Client) (*RandomOrderPolicy, error) {
	rop := &RandomOrderPolicy{}
	rop.Init(sources, cleanDB, client)
	if ok := rop.Validate(filter); !ok {
		return nil, fmt.Errorf("random order policy error, could not validate filter: %v", filter)
	}
	if err := rop.Load(filter); err != nil {
		return nil, fmt.Errorf("random order policy error, could not load filter: %v", filter)
	}
	return rop, nil
}

func (rop *RandomOrderPolicy) Name() string { return "Random" }

func (rop *RandomOrderPolicy) Validate(rf *jsonmodels.RollFilter) bool {
	return rop.OrderPolicy.Validate(rf) && rf.Name == rop.Name()
}

func (rop *RandomOrderPolicy) Apply(db *gorm.DB) (*gorm.DB, error) {
	return db.Order("random()"), nil
}
