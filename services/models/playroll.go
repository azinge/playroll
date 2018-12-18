package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/jinzhu/gorm"
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

func (p *Playroll) ToOutput() (*PlayrollOutput, error) {
	po := &PlayrollOutput{}
	po.Model = p.Model
	po.Name = p.Name
	po.UserID = p.UserID
	po.User = p.User
	rolls, err := FormatRollSlice(&p.Rolls)
	if err != nil {
		return nil, err
	}
	po.Rolls = rolls
	po.Tracklists = p.Tracklists
	return po, nil
}

func InitPlayrollDAO(db *gorm.DB) Entity {
	playroll := &Playroll{}
	playroll.SetEntity(playroll)
	playroll.SetDB(db.Preload("Rolls").Preload("Tracklists"))
	return playroll
}

func (_ *Playroll) InitDAO(db *gorm.DB) Entity {
	return InitPlayrollDAO(db)
}

func FormatPlayroll(val interface{}) (*PlayrollOutput, error) {
	p, ok := val.(*Playroll)
	if !ok {
		return nil, fmt.Errorf("error converting to Playroll")
	}
	return p.ToOutput()
}

func (_ *Playroll) Format(val interface{}) (interface{}, error) {
	return FormatPlayroll(val)
}

func FormatPlayrollSlice(val interface{}) ([]PlayrollOutput, error) {
	ps, ok := val.(*[]Playroll)
	if !ok {
		return nil, fmt.Errorf("error converting to Playroll Slice")
	}
	output := []PlayrollOutput{}
	for _, p := range *ps {
		po, err := p.ToOutput()
		if err != nil {
			return nil, err
		}
		output = append(output, *po)
	}
	return output, nil
}

func (_ *Playroll) FormatSlice(val interface{}) (interface{}, error) {
	return FormatPlayrollSlice(val)
}
