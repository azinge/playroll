package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/cazinge/playroll/services/utils"
	"github.com/jinzhu/gorm"
)

type CompiledRoll struct {
	Model
	Order       string
	Data        jsonmodels.CompiledRollData `gorm:"type: jsonb"`
	RollID      uint
	Roll        Roll
	TracklistID uint
}

type CompiledRollInput struct {
	Order       string                           `gql:"order: String"`
	Data        jsonmodels.CompiledRollDataInput `gql:"data: CompiledRollDataInput"`
	RollID      string                           `gql:"rollID: ID"`
	TracklistID string                           `gql:"tracklistID: ID"`
}

type CompiledRollOutput struct {
	Model       `gql:"MODEL"`
	Order       string                            `gql:"order: String"`
	Data        jsonmodels.CompiledRollDataOutput `gql:"data: CompiledRollData"`
	RollID      uint                              `gql:"rollID: ID"`
	Roll        Roll                              `gql:"roll: Roll"`
	TracklistID uint                              `gql:"tracklistID: ID"`
}

func (cri *CompiledRollInput) ToModel() (*CompiledRoll, error) {
	cr := &CompiledRoll{}
	cr.TracklistID = utils.StringIDToNumber(cri.TracklistID)
	cr.RollID = utils.StringIDToNumber(cri.RollID)
	cr.Order = cri.Order
	data, err := cri.Data.ToModel()
	if err != nil {
		return nil, err
	}
	cr.Data = *data
	return cr, nil
}

func (cr *CompiledRoll) ToOutput() (*CompiledRollOutput, error) {
	cro := &CompiledRollOutput{}
	cro.Model = cr.Model
	cro.TracklistID = cr.TracklistID
	cro.RollID = cr.RollID
	cro.Roll = cr.Roll
	cro.Order = cr.Order
	data, err := cr.Data.ToOutput()
	if err != nil {
		return nil, err
	}
	cro.Data = *data
	return cro, nil
}

func InitCompiledRollDAO(db *gorm.DB) *CompiledRoll {
	compiledRoll := &CompiledRoll{}
	compiledRoll.SetEntity(compiledRoll)
	compiledRoll.SetDB(db)
	return compiledRoll
}

func FormatCompiledRoll(val interface{}) (*CompiledRollOutput, error) {
	cr, ok := val.(*CompiledRoll)
	if !ok {
		return nil, fmt.Errorf("error converting to CompiledRoll")
	}
	return cr.ToOutput()
}

func FormatCompiledRollSlice(val interface{}) ([]CompiledRollOutput, error) {
	crs, ok := val.(*[]CompiledRoll)
	if !ok {
		return nil, fmt.Errorf("error converting to CompiledRoll Slice")
	}
	output := []CompiledRollOutput{}
	for _, cr := range *crs {
		cro, err := cr.ToOutput()
		if err != nil {
			return nil, err
		}
		output = append(output, *cro)
	}
	return output, nil
}

func (_ *CompiledRoll) InitDAO(db *gorm.DB) Entity {
	return InitCompiledRollDAO(db)
}

func (_ *CompiledRoll) Format(val interface{}) (interface{}, error) {
	return FormatCompiledRoll(val)
}

func (_ *CompiledRoll) FormatSlice(val interface{}) (interface{}, error) {
	return FormatCompiledRollSlice(val)
}
