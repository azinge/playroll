package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/jinzhu/gorm"
)

type DiscoveryQueue struct {
	Model
	UserID                uint
	User                  User
	DiscoveryQueueEntries []DiscoveryQueueEntry `gorm:"foreignkey:DiscoveryQueueID"`
}

type DiscoveryQueueInput struct {
	UserID string `gql:"userID: ID"`
}

type DiscoveryQueueOutput struct {
	Model   `gql:"MODEL"`
	UserID  uint                        `gql:"userID: ID"`
	User    User                        `gql:"user: User"`
	Entries []DiscoveryQueueEntryOutput `gql:"entries: [DiscoveryQueueEntry]"`
}

// Utility Functions

func GetDiscoveryQueueByUserID(id uint, db *gorm.DB) (*DiscoveryQueueOutput, error) {
	dq := &DiscoveryQueue{}
	db = db.Preload("DiscoveryQueueEntries")
	if err := db.Where(DiscoveryQueue{UserID: id}).First(dq).Error; err != nil {
		fmt.Printf("error getting discovery queue: %s", err.Error())
		return nil, err
	}

	discoveryQueue, err := FormatDiscoveryQueue(dq)
	if err != nil {
		return nil, err
	}
	return discoveryQueue, nil
}

// Entity Specific Methods

func DiscoveryQueueInputToModel(dqi *DiscoveryQueueInput) (*DiscoveryQueue, error) {
	dq := &DiscoveryQueue{}
	dq.UserID = utils.StringIDToNumber(dqi.UserID)
	return dq, nil
}

func DiscoveryQueueOutputToModel(dqo *DiscoveryQueueOutput) (*DiscoveryQueue, error) {
	return nil, fmt.Errorf("DiscoveryQueueOutputToModel Not Implemented")
}

func DiscoveryQueueModelToOutput(dq *DiscoveryQueue) (*DiscoveryQueueOutput, error) {
	dqo := &DiscoveryQueueOutput{}
	dqo.Model = dq.Model
	dqo.UserID = dq.UserID
	dqo.User = dq.User
	entries, err := FormatDiscoveryQueueEntrySlice(&dq.DiscoveryQueueEntries)
	if err != nil {
		return nil, err
	}
	dqo.Entries = entries
	return dqo, nil
}

func InitDiscoveryQueueDAO(db *gorm.DB) Entity {
	dao := &DiscoveryQueue{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatDiscoveryQueue(val interface{}) (*DiscoveryQueueOutput, error) {
	dq, ok := val.(*DiscoveryQueue)
	if !ok {
		return nil, fmt.Errorf("error converting to DiscoveryQueue")
	}
	return DiscoveryQueueModelToOutput(dq)
}

func FormatDiscoveryQueueSlice(val interface{}) ([]DiscoveryQueueOutput, error) {
	dqs, ok := val.(*[]DiscoveryQueue)
	if !ok {
		return nil, fmt.Errorf("error converting to DiscoveryQueue Slice")
	}
	output := []DiscoveryQueueOutput{}
	for _, dq := range *dqs {
		dqo, err := DiscoveryQueueModelToOutput(&dq)
		if err != nil {
			return nil, err
		}
		output = append(output, *dqo)
	}
	return output, nil
}

// Interface Generalization Methods

func (dqi *DiscoveryQueueInput) ToModel() (Entity, error) {
	return DiscoveryQueueInputToModel(dqi)
}

func (dqo *DiscoveryQueueOutput) ToModel() (Entity, error) {
	return DiscoveryQueueOutputToModel(dqo)
}

func (dq *DiscoveryQueue) ToOutput() (EntityOutput, error) {
	return DiscoveryQueueModelToOutput(dq)
}

func (_ *DiscoveryQueue) InitDAO(db *gorm.DB) Entity {
	return InitDiscoveryQueueDAO(db)
}

func (_ *DiscoveryQueue) Format(val interface{}) (EntityOutput, error) {
	return FormatDiscoveryQueue(val)
}

func (_ *DiscoveryQueue) FormatSlice(val interface{}) (interface{}, error) {
	return FormatDiscoveryQueueSlice(val)
}
