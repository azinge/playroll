package models

import (
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/cazinge/playroll/services/utils"
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

func (ri *RollInput) CreateRollFromInputFields() *Roll {
	roll := &Roll{}
	// roll.Data = ri.Data
	roll.PlayrollID = utils.StringIDToNumber(ri.PlayrollID)
	roll.Order = ri.Order
	return roll
}
