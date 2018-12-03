package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
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

func formatCompiledRolls(val interface{}, err error) (*[]CompiledRollOutput, error) {
	if err != nil {
		return nil, err
	}
	crs, ok := val.([]CompiledRoll)
	if !ok {
		return nil, fmt.Errorf("error converting to CompiledRoll Slice")
	}
	output := []CompiledRollOutput{}
	for _, cr := range crs {
		cro, err := cr.ToOutput()
		if err != nil {
			return nil, err
		}
		output = append(output, *cro)
	}
	return &output, nil
}

func (t *Tracklist) ToOutput() (*TracklistOutput, error) {
	to := &TracklistOutput{}
	to.Model = t.Model
	to.Starred = t.Starred
	to.Primary = t.Primary
	compiledRolls, err := formatCompiledRolls(t.CompiledRolls, nil)
	if err != nil {
		return nil, err
	}
	to.CompiledRolls = *compiledRolls
	to.PlayrollID = t.PlayrollID
	return to, nil
}

func (ti *TracklistInput) CreateTracklistFromInputFields() *Tracklist {
	tracklist := &Tracklist{}
	tracklist.Starred = ti.Starred
	tracklist.Primary = ti.Primary
	return tracklist
}
