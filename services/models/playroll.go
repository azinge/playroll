package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/jinzhu/gorm"
)

type Playroll struct {
	Model
	Name   string
	UserID uint
	//TODO(cazinge): ExportedPlaylist
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
	Name       string            `gql:"name: String"`
	UserID     uint              `gql:"userID: ID"`
	User       User              `gql:"user: User"`
	Rolls      []RollOutput      `gql:"rolls: [Roll]"`
	Tracklists []TracklistOutput `gql:"tracklists: [Tracklist]"`
}

// Utility Methods

func GetPlayrollsByUserID(id uint, db *gorm.DB) ([]PlayrollOutput, error) {
	playrollModels := &[]Playroll{}
	db = db.Preload("Rolls").Preload("User")
	if err := db.Where(Playroll{UserID: id}).Find(playrollModels).Error; err != nil {
		fmt.Printf("error getting playrolls: %s", err.Error())
		return nil, err
	}

	playrolls, err := FormatPlayrollSlice(playrollModels)
	if err != nil {
		return nil, err
	}
	return playrolls, nil
}

func ClonePlayroll(oldPlayroll *Playroll, userID uint, db *gorm.DB) (*PlayrollOutput, error) {
	tx := db.Begin()
	playrollInput := PlayrollInput{Name: oldPlayroll.Name}
	playrollModel, err := PlayrollInputToModel(&playrollInput)
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	playrollModel.UserID = userID

	tDAO := InitPlayrollDAO(tx)
	rawPlayroll, err := tDAO.Create(playrollModel)
	if err != nil {
		return nil, err
	}
	playrollOutput, err := FormatPlayroll(rawPlayroll)
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	rDAO := InitRollDAO(tx)
	for _, oldRoll := range oldPlayroll.Rolls {
		roll := &Roll{}
		roll.PlayrollID = playrollOutput.ID
		roll.Order = oldRoll.Order
		roll.Data = oldRoll.Data
		_, err = rDAO.Create(roll)
		if err != nil {
			tx.Rollback()
			return nil, err
		}
	}
	err = tx.Commit().Error
	if err != nil {
		return nil, err
	}
	return playrollOutput, nil
}

// Entity Specific Methods

func PlayrollInputToModel(pi *PlayrollInput) (*Playroll, error) {
	p := &Playroll{}
	p.Name = pi.Name
	p.UserID = utils.StringIDToNumber(pi.UserID)
	return p, nil
}

func PlayrollOutputToModel(po *PlayrollOutput) (*Playroll, error) {
	return nil, fmt.Errorf("PlayrollOutputToModel Not Implemented")
}

func PlayrollModelToOutput(p *Playroll) (*PlayrollOutput, error) {
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
	tracklists, err := FormatTracklistSlice(&p.Tracklists)
	if err != nil {
		return nil, err
	}
	po.Tracklists = tracklists
	return po, nil
}

func InitPlayrollDAO(db *gorm.DB) Entity {
	dao := &Playroll{}
	dao.SetEntity(dao)
	dao.SetDB(db.Preload("Rolls").Preload("User"))
	return dao
}

func FormatPlayroll(val interface{}) (*PlayrollOutput, error) {
	p, ok := val.(*Playroll)
	if !ok {
		return nil, fmt.Errorf("error converting to Playroll")
	}
	return PlayrollModelToOutput(p)
}

func FormatPlayrollSlice(val interface{}) ([]PlayrollOutput, error) {
	ps, ok := val.(*[]Playroll)
	if !ok {
		return nil, fmt.Errorf("error converting to Playroll Slice")
	}
	output := []PlayrollOutput{}
	for _, p := range *ps {
		po, err := PlayrollModelToOutput(&p)
		if err != nil {
			return nil, err
		}
		output = append(output, *po)
	}
	return output, nil
}

// Interface Generalization Methods

func (pi *PlayrollInput) ToModel() (Entity, error) {
	return PlayrollInputToModel(pi)
}

func (po *PlayrollOutput) ToModel() (Entity, error) {
	return PlayrollOutputToModel(po)
}

func (p *Playroll) ToOutput() (EntityOutput, error) {
	return PlayrollModelToOutput(p)
}

func (_ *Playroll) InitDAO(db *gorm.DB) Entity {
	return InitPlayrollDAO(db)
}

func (_ *Playroll) Format(val interface{}) (EntityOutput, error) {
	return FormatPlayroll(val)
}

func (_ *Playroll) FormatSlice(val interface{}) (interface{}, error) {
	return FormatPlayrollSlice(val)
}
