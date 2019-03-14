package models

import (
	"encoding/json"
	"fmt"

	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/cazinge/playroll/services/utils"
	"github.com/jinzhu/gorm"
)

type Tracklist struct {
	Model
	IsStarred     bool
	IsPrimary     bool
	CompiledRolls []CompiledRoll
	Playroll      Playroll
	PlayrollID    uint
}

type TracklistInput struct {
	IsStarred  bool   `gql:"isStarred: Boolean"`
	IsPrimary  bool   `gql:"isPrimary: Boolean"`
	PlayrollID string `gql:"playrollID: ID"`
}

type TracklistOutput struct {
	Model         `gql:"MODEL"`
	IsStarred     bool                 `gql:"isStarred: Boolean"`
	IsPrimary     bool                 `gql:"isPrimary: Boolean"`
	CompiledRolls []CompiledRollOutput `gql:"compiledRolls: [CompiledRoll]"`
	PlayrollID    uint                 `gql:"playrollID: ID"`
}

// Utility Functions

func GetTracksByTracklistID(id uint, db *gorm.DB) (*[]jsonmodels.MusicSource, error) {
	compiledRolls, err := FindCompiledRollsByTracklistID(id, db)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	tracks, err := GetTracksFromCompiledRolls(compiledRolls)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return tracks, nil
}

func CreateTracklistWithCompiledRolls(compiledRolls *[]CompiledRollOutput, playrollID uint, db *gorm.DB) (*TracklistOutput, error) {
	tx := db.Begin()
	tracklistInput := TracklistInput{IsStarred: false, IsPrimary: true, PlayrollID: string(playrollID)}
	tracklist, err := tracklistInput.ToModel()
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	tDAO := InitTracklistDAO(tx)

	rawTracklist, err := tDAO.Create(tracklist)
	if err != nil {
		return nil, err
	}
	tracklistOutput, err := FormatTracklist(rawTracklist)
	tracklistOutput.CompiledRolls = *compiledRolls
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	crDAO := InitCompiledRollDAO(tx)
	for _, compiledRollOutput := range *compiledRolls {
		compiledRoll := &CompiledRoll{}
		compiledRoll.TracklistID = tracklistOutput.ID
		compiledRoll.Order = compiledRollOutput.Order
		compiledRoll.RollID = compiledRollOutput.RollID
		tracks, err := json.Marshal(compiledRollOutput.Data.Tracks)
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		compiledRoll.Data = jsonmodels.CompiledRollData{Tracks: tracks}
		_, err = crDAO.Create(compiledRoll)
		if err != nil {
			tx.Rollback()
			return nil, err
		}
	}
	err = tx.Commit().Error
	if err != nil {
		return nil, err
	}
	return tracklistOutput, nil
}

// Entity Specific Methods

func TracklistInputToModel(ti *TracklistInput) (*Tracklist, error) {
	t := &Tracklist{}
	t.IsStarred = ti.IsStarred
	t.IsPrimary = ti.IsPrimary
	t.PlayrollID = utils.StringIDToNumber(ti.PlayrollID)
	return t, nil
}

func TracklistOutputToModel(to *TracklistOutput) (*Tracklist, error) {
	return nil, fmt.Errorf("TracklistOutputToModel Not Implemented")
}

func TracklistModelToOutput(t *Tracklist) (*TracklistOutput, error) {
	to := &TracklistOutput{}
	to.Model = t.Model
	to.IsStarred = t.IsStarred
	to.IsPrimary = t.IsPrimary
	compiledRolls, err := FormatCompiledRollSlice(&t.CompiledRolls)
	if err != nil {
		return nil, err
	}
	to.CompiledRolls = compiledRolls
	to.PlayrollID = t.PlayrollID
	return to, nil
}

func InitTracklistDAO(db *gorm.DB) *Tracklist {
	dao := &Tracklist{}
	dao.SetEntity(dao)
	dao.SetDB(db.Preload("CompiledRolls"))
	return dao
}

func FormatTracklist(val interface{}) (*TracklistOutput, error) {
	t, ok := val.(*Tracklist)
	if !ok {
		return nil, fmt.Errorf("error converting to Tracklist")
	}
	return TracklistModelToOutput(t)
}

func FormatTracklistSlice(val interface{}) ([]TracklistOutput, error) {
	ts, ok := val.(*[]Tracklist)
	if !ok {
		return nil, fmt.Errorf("error converting to Tracklist Slice")
	}
	output := []TracklistOutput{}
	for _, t := range *ts {
		to, err := TracklistModelToOutput(&t)
		if err != nil {
			return nil, err
		}
		output = append(output, *to)
	}
	return output, nil
}

// Interface Generalization Methods

func (ti *TracklistInput) ToModel() (Entity, error) {
	return TracklistInputToModel(ti)
}

func (to *TracklistOutput) ToModel() (Entity, error) {
	return TracklistOutputToModel(to)
}

func (t *Tracklist) ToOutput() (EntityOutput, error) {
	return TracklistModelToOutput(t)
}

func (_ *Tracklist) InitDAO(db *gorm.DB) Entity {
	return InitTracklistDAO(db)
}

func (_ *Tracklist) Format(val interface{}) (EntityOutput, error) {
	return FormatTracklist(val)
}

func (_ *Tracklist) FormatSlice(val interface{}) (interface{}, error) {
	return FormatTracklistSlice(val)
}
