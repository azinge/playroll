package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/jinzhu/gorm"
)

type Tracklist struct {
	Model
	Starred       bool
	Primary       bool
	CompiledRolls []CompiledRoll
	Playroll      Playroll
	PlayrollID    uint
}

type TracklistInput struct {
	Starred    bool   `gql:"starred: Boolean"`
	Primary    bool   `gql:"primary: Boolean"`
	PlayrollID string `gql:"playrollID: ID"`
}

type TracklistOutput struct {
	Model         `gql:"MODEL"`
	Starred       bool                 `gql:"starred: Boolean"`
	Primary       bool                 `gql:"primary: Boolean"`
	CompiledRolls []CompiledRollOutput `gql:"compiledRolls: [CompiledRoll]"`
	PlayrollID    uint                 `gql:"playrollID: ID"`
}

func (ti *TracklistInput) ToModel() (*Tracklist, error) {
	t := &Tracklist{}
	t.Starred = ti.Starred
	t.Primary = ti.Primary
	t.PlayrollID = utils.StringIDToNumber(ti.PlayrollID)
	return t, nil
}

func (t *Tracklist) ToOutput() (*TracklistOutput, error) {
	to := &TracklistOutput{}
	to.Model = t.Model
	to.Starred = t.Starred
	to.Primary = t.Primary
	compiledRolls, err := FormatCompiledRollSlice(&t.CompiledRolls)
	if err != nil {
		return nil, err
	}
	to.CompiledRolls = compiledRolls
	to.PlayrollID = t.PlayrollID
	return to, nil
}

func InitTracklistDAO(db *gorm.DB) *Tracklist {
	tracklist := &Tracklist{}
	tracklist.SetEntity(tracklist)
	tracklist.SetDB(db.Preload("CompiledRolls"))
	return tracklist
}

func (_ *Tracklist) InitDAO(db *gorm.DB) Entity {
	return InitTracklistDAO(db)
}

func FormatTracklist(val interface{}) (*TracklistOutput, error) {
	t, ok := val.(*Tracklist)
	if !ok {
		return nil, fmt.Errorf("error converting to Tracklist")
	}
	return t.ToOutput()
}

func (_ *Tracklist) Format(val interface{}) (interface{}, error) {
	return FormatTracklist(val)
}

func FormatTracklistSlice(val interface{}) ([]TracklistOutput, error) {
	ts, ok := val.(*[]Tracklist)
	if !ok {
		return nil, fmt.Errorf("error converting to Tracklist Slice")
	}
	output := []TracklistOutput{}
	for _, t := range *ts {
		to, err := t.ToOutput()
		if err != nil {
			return nil, err
		}
		output = append(output, *to)
	}
	return output, nil
}

func (_ *Tracklist) FormatSlice(val interface{}) (interface{}, error) {
	return FormatTracklistSlice(val)
}
