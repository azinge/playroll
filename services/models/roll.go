package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/cazinge/playroll/services/utils"
	"github.com/jinzhu/gorm"
)

type Roll struct {
	Model
	Data       jsonmodels.RollData `gorm:"type: jsonb"`
	PlayrollID uint
	Order      uint
	Playroll   Playroll
}

type RollInput struct {
	Data       jsonmodels.RollDataInput `gql:"data: RollDataInput"`
	PlayrollID string                   `gql:"playrollID: ID"`
	Order      uint                     `gql:"order: Int"`
}

type RollOutput struct {
	Model      `gql:"MODEL"`
	Data       jsonmodels.RollDataOutput `gql:"data: RollData"`
	PlayrollID uint                      `gql:"playrollID: ID"`
	Order      uint                      `gql:"order: Int"`
	Playroll   PlayrollOutput            `gql:"playroll: Playroll"`
}

// Entity Specific Methods

func RollInputToModel(ri *RollInput) (*Roll, error) {
	r := &Roll{}
	r.PlayrollID = utils.StringIDToNumber(ri.PlayrollID)
	r.Order = ri.Order
	data, err := ri.Data.ToModel()
	if err != nil {
		return nil, err
	}
	r.Data = *data
	return r, nil
}

func RollOutputToModel(ro *RollOutput) (*Roll, error) {
	return nil, fmt.Errorf("RollOutputToModel Not Implemented")
}

func RollModelToOutput(r *Roll) (*RollOutput, error) {
	ro := &RollOutput{}
	ro.Model = r.Model
	ro.PlayrollID = r.PlayrollID
	ro.Order = r.Order
	data, err := r.Data.ToOutput()
	if err != nil {
		return nil, err
	}
	ro.Data = *data
	return ro, nil
}

func InitRollDAO(db *gorm.DB) *Roll {
	roll := &Roll{}
	roll.SetEntity(roll)
	roll.SetDB(db)
	return roll
}

func FormatRoll(val interface{}) (*RollOutput, error) {
	r, ok := val.(*Roll)
	if !ok {
		return nil, fmt.Errorf("error converting to Roll")
	}
	return RollModelToOutput(r)
}

func FormatRollSlice(val interface{}) ([]RollOutput, error) {
	rs, ok := val.(*[]Roll)
	if !ok {
		return nil, fmt.Errorf("error converting to Roll Slice")
	}
	output := []RollOutput{}
	for _, r := range *rs {
		ro, err := RollModelToOutput(&r)
		if err != nil {
			return nil, err
		}
		output = append(output, *ro)
	}
	return output, nil
}

// Interface Generalization Methods

func (ri *RollInput) ToModel() (Entity, error) {
	return RollInputToModel(ri)
}

func (ro *RollOutput) ToModel() (Entity, error) {
	return RollOutputToModel(ro)
}

func (r *Roll) ToOutput() (EntityOutput, error) {
	return RollModelToOutput(r)
}

func (_ *Roll) InitDAO(db *gorm.DB) Entity {
	return InitRollDAO(db)
}

func (_ *Roll) Format(val interface{}) (EntityOutput, error) {
	return FormatRoll(val)
}

func (_ *Roll) FormatSlice(val interface{}) (interface{}, error) {
	return FormatRollSlice(val)
}
