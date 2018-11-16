package models

import "github.com/cazinge/playroll/services/utils"

type Playroll struct {
	Model
	Name   string
	UserID uint
	User   User
	Rolls  []Roll
}

type PlayrollInput struct {
	Name   string `gql:"name: String"`
	UserID string `gql:"userID: ID"`
}

type PlayrollOutput struct {
	Model  `gql:"MODEL"`
	Name   string `gql:"name: String"`
	UserID uint   `gql:"userID: ID"`
	User   User   `gql:"user: User"`
	Rolls  []Roll `gql:"rolls: [Roll]"`
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
	po.Rolls = p.Rolls
	return po, nil
}

func (pi *PlayrollInput) CreatePlayrollFromInputFields() *Playroll {
	playroll := &Playroll{}
	playroll.Name = pi.Name
	return playroll
}
