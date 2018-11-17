package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
)

type Playroll struct {
	Model
	Name       string
	UserID     uint
	User       User
	Rolls      []Roll
	Tracklists []Tracklist
}

type PlayrollInput struct {
	Name   string `gql:"name: String"`
	UserID string `gql:"userID: ID"`
}

type PlayrollOutput struct {
	Model      `gql:"MODEL"`
	Name       string       `gql:"name: String"`
	UserID     uint         `gql:"userID: ID"`
	User       User         `gql:"user: User"`
	Rolls      []RollOutput `gql:"rolls: [Roll]"`
	Tracklists []Tracklist  `gql:"tracklists: [Tracklist]"`
}

func (pi *PlayrollInput) ToModel() (*Playroll, error) {
	p := &Playroll{}
	p.Name = pi.Name
	p.UserID = utils.StringIDToNumber(pi.UserID)
	return p, nil
}

func formatRolls(val interface{}, err error) (*[]RollOutput, error) {
	if err != nil {
		return nil, err
	}
	rs, ok := val.([]Roll)
	if !ok {
		return nil, fmt.Errorf("error converting to Roll Slice")
	}
	output := []RollOutput{}
	for _, r := range rs {
		ro, err := r.ToOutput()
		if err != nil {
			return nil, err
		}
		output = append(output, *ro)
	}
	return &output, nil
}

func (p *Playroll) ToOutput() (*PlayrollOutput, error) {
	po := &PlayrollOutput{}
	po.Model = p.Model
	po.Name = p.Name
	po.UserID = p.UserID
	po.User = p.User
	rolls, err := formatRolls(p.Rolls, nil)
	if err != nil {
		return nil, err
	}
	po.Rolls = *rolls
	po.Tracklists = p.Tracklists
	return po, nil
}

func (pi *PlayrollInput) CreatePlayrollFromInputFields() *Playroll {
	playroll := &Playroll{}
	playroll.Name = pi.Name
	return playroll
}
