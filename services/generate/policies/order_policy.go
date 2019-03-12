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
	case "Random":
		return NewRandomOrderPolicy(filter, sources, db, client)
	default:
		return nil, fmt.Errorf("error, invalid filter")
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
	return rf.Type == rop.Type() && rf.Name == rop.Name()
}

func (rop *RandomOrderPolicy) Apply(db *gorm.DB) (*gorm.DB, error) {
	return db.Order("random()"), nil
}