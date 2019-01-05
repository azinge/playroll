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
	Roll        RollOutput                        `gql:"roll: Roll"`
	TracklistID uint                              `gql:"tracklistID: ID"`
}

// Utility Functions

func FindCompiledRollsByTracklistID(id uint, db *gorm.DB) (*[]CompiledRoll, error) {
	crs := &[]CompiledRoll{}
	if err := db.Where(&CompiledRoll{TracklistID: id}).Find(&crs).Error; err != nil {
		fmt.Println(err)
		return nil, err
	}
	return crs, nil
}

func GetTracksFromCompiledRolls(crs *[]CompiledRoll) (*[]jsonmodels.MusicSource, error) {
	tracks := []jsonmodels.MusicSource{}
	for _, cr := range *crs {
		cro, err := CompiledRollModelToOutput(&cr)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		tracks = append(tracks, cro.Data.Tracks...)
	}
	return &tracks, nil
}

// Entity Specific Methods

func CompiledRollInputToModel(cri *CompiledRollInput) (*CompiledRoll, error) {
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

func CompiledRollOutputToModel(po *CompiledRollOutput) (*CompiledRoll, error) {
	return nil, fmt.Errorf("CompiledRollOutputToModel Not Implemented")
}

func CompiledRollModelToOutput(cr *CompiledRoll) (*CompiledRollOutput, error) {
	cro := &CompiledRollOutput{}
	cro.Model = cr.Model
	cro.TracklistID = cr.TracklistID
	cro.RollID = cr.RollID
	roll, err := FormatRoll(&cr.Roll)
	if err != nil {
		return nil, err
	}
	cro.Roll = *roll
	cro.Order = cr.Order
	data, err := cr.Data.ToOutput()
	if err != nil {
		return nil, err
	}
	cro.Data = *data
	return cro, nil
}

func InitCompiledRollDAO(db *gorm.DB) *CompiledRoll {
	dao := &CompiledRoll{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatCompiledRoll(val interface{}) (*CompiledRollOutput, error) {
	cr, ok := val.(*CompiledRoll)
	if !ok {
		return nil, fmt.Errorf("error converting to CompiledRoll")
	}
	return CompiledRollModelToOutput(cr)
}

func FormatCompiledRollSlice(val interface{}) ([]CompiledRollOutput, error) {
	crs, ok := val.(*[]CompiledRoll)
	if !ok {
		return nil, fmt.Errorf("error converting to CompiledRoll Slice")
	}
	output := []CompiledRollOutput{}
	for _, cr := range *crs {
		cro, err := CompiledRollModelToOutput(&cr)
		if err != nil {
			return nil, err
		}
		output = append(output, *cro)
	}
	return output, nil
}

// Interface Generalization Methods

func (cri *CompiledRollInput) ToModel() (Entity, error) {
	return CompiledRollInputToModel(cri)
}

func (cro *CompiledRollOutput) ToModel() (Entity, error) {
	return CompiledRollOutputToModel(cro)
}

func (cr *CompiledRoll) ToOutput() (EntityOutput, error) {
	return CompiledRollModelToOutput(cr)
}

func (_ *CompiledRoll) InitDAO(db *gorm.DB) Entity {
	return InitCompiledRollDAO(db)
}

func (_ *CompiledRoll) Format(val interface{}) (EntityOutput, error) {
	return FormatCompiledRoll(val)
}

func (_ *CompiledRoll) FormatSlice(val interface{}) (interface{}, error) {
	return FormatCompiledRollSlice(val)
}
