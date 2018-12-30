package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/cazinge/playroll/services/utils"
	"github.com/jinzhu/gorm"
)

type DiscoveryQueueEntry struct {
	Model
	Data             jsonmodels.RollData `gorm:"type: jsonb"`
	DiscoveryQueueID uint
	DiscoveryQueue   DiscoveryQueue
}

type DiscoveryQueueEntryInput struct {
	Data             jsonmodels.RollDataInput `gql:"data: RollDataInput"`
	DiscoveryQueueID string                   `gql:"discoveryQueueID: ID"`
}

type DiscoveryQueueEntryOutput struct {
	Model            `gql:"MODEL"`
	Data             jsonmodels.RollDataOutput `gql:"data: RollData"`
	DiscoveryQueueID uint                      `gql:"discoveryQueueID: ID"`
	DiscoveryQueue   DiscoveryQueueOutput      `gql:"discoveryQueue: DiscoveryQueue"`
}

// Entity Specific Methods

func DiscoveryQueueEntryInputToModel(dqei *DiscoveryQueueEntryInput) (*DiscoveryQueueEntry, error) {
	dqe := &DiscoveryQueueEntry{}
	dqe.DiscoveryQueueID = utils.StringIDToNumber(dqei.DiscoveryQueueID)
	data, err := dqei.Data.ToModel()
	if err != nil {
		return nil, err
	}
	dqe.Data = *data
	return dqe, nil
}

func DiscoveryQueueEntryOutputToModel(dqeo *DiscoveryQueueEntryOutput) (*DiscoveryQueueEntry, error) {
	return nil, fmt.Errorf("DiscoveryQueueEntryOutputToModel Not Implemented")
}

func DiscoveryQueueEntryModelToOutput(dqe *DiscoveryQueueEntry) (*DiscoveryQueueEntryOutput, error) {
	dqeo := &DiscoveryQueueEntryOutput{}
	dqeo.Model = dqe.Model
	dqeo.DiscoveryQueueID = dqe.DiscoveryQueueID
	discoveryQueue, err := FormatDiscoveryQueue(&dqe.DiscoveryQueue)
	if err != nil {
		return nil, err
	}
	dqeo.DiscoveryQueue = *discoveryQueue
	data, err := dqe.Data.ToOutput()
	if err != nil {
		return nil, err
	}
	dqeo.Data = *data
	return dqeo, nil
}

func InitDiscoveryQueueEntryDAO(db *gorm.DB) Entity {
	dao := &DiscoveryQueueEntry{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatDiscoveryQueueEntry(val interface{}) (*DiscoveryQueueEntryOutput, error) {
	dqe, ok := val.(*DiscoveryQueueEntry)
	if !ok {
		return nil, fmt.Errorf("error converting to DiscoveryQueueEntry")
	}
	return DiscoveryQueueEntryModelToOutput(dqe)
}

func FormatDiscoveryQueueEntrySlice(val interface{}) ([]DiscoveryQueueEntryOutput, error) {
	dqes, ok := val.(*[]DiscoveryQueueEntry)
	if !ok {
		return nil, fmt.Errorf("error converting to DiscoveryQueueEntry Slice")
	}
	output := []DiscoveryQueueEntryOutput{}
	for _, dqe := range *dqes {
		dqeo, err := DiscoveryQueueEntryModelToOutput(&dqe)
		if err != nil {
			return nil, err
		}
		output = append(output, *dqeo)
	}
	return output, nil
}

// Interface Generalization Methods

func (dqei *DiscoveryQueueEntryInput) ToModel() (Entity, error) {
	return DiscoveryQueueEntryInputToModel(dqei)
}

func (dqeo *DiscoveryQueueEntryOutput) ToModel() (Entity, error) {
	return DiscoveryQueueEntryOutputToModel(dqeo)
}

func (dqe *DiscoveryQueueEntry) ToOutput() (EntityOutput, error) {
	return DiscoveryQueueEntryModelToOutput(dqe)
}

func (_ *DiscoveryQueueEntry) InitDAO(db *gorm.DB) Entity {
	return InitDiscoveryQueueEntryDAO(db)
}

func (_ *DiscoveryQueueEntry) Format(val interface{}) (EntityOutput, error) {
	return FormatDiscoveryQueueEntry(val)
}

func (_ *DiscoveryQueueEntry) FormatSlice(val interface{}) (interface{}, error) {
	return FormatDiscoveryQueueEntrySlice(val)
}
