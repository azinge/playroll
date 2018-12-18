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

func (ri *RollInput) ToModel() (*Roll, error) {
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

func (r *Roll) ToOutput() (*RollOutput, error) {
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

func (_ *Roll) InitDAO(db *gorm.DB) Entity {
	return InitRollDAO(db)
}

func FormatRoll(val interface{}) (*RollOutput, error) {
	r, ok := val.(*Roll)
	if !ok {
		return nil, fmt.Errorf("error converting to Roll")
	}
	return r.ToOutput()
}

func (_ *Roll) Format(val interface{}) (interface{}, error) {
	return FormatRoll(val)
}

func FormatRollSlice(val interface{}) ([]RollOutput, error) {
	rs, ok := val.(*[]Roll)
	if !ok {
		return nil, fmt.Errorf("error converting to Roll Slice")
	}
	output := []RollOutput{}
	for _, r := range *rs {
		ro, err := r.ToOutput()
		if err != nil {
			return nil, err
		}
		output = append(output, *ro)
	}
	return output, nil
}

func (_ *Roll) FormatSlice(val interface{}) (interface{}, error) {
	return FormatRollSlice(val)
}
