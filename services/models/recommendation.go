package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/cazinge/playroll/services/utils"
	"github.com/jinzhu/gorm"
)

type Recommendation struct {
	Model
	IsActive      bool
	Data          jsonmodels.RollData `gorm:"type: jsonb"`
	UserID        uint
	User          User
	RecommenderID uint
	Recommender   User
	PlayrollID    uint
	Playroll      Playroll
}

type RecommendationInput struct {
	IsActive      bool                     `gql:"isActive: Boolean"`
	Data          jsonmodels.RollDataInput `gql:"data: RollDataInput"`
	UserID        string                   `gql:"userID: ID"`
	RecommenderID string                   `gql:"recommenderID: ID"`
	PlayrollID    string                   `gql:"playrollID: ID"`
}

type RecommendationOutput struct {
	Model         `gql:"MODEL"`
	IsActive      bool                      `gql:"isActive: Boolean"`
	Data          jsonmodels.RollDataOutput `gql:"data: RollData"`
	UserID        uint                      `gql:"userID: ID"`
	User          UserOutput                `gql:"user: User"`
	RecommenderID uint                      `gql:"recommenderID: ID"`
	Recommender   UserOutput                `gql:"recommender: User"`
	PlayrollID    uint                      `gql:"playrollID: ID"`
	Playroll      PlayrollOutput            `gql:"playroll: Playroll"`
}

// Entity Specific Methods

func RecommendationInputToModel(ri *RecommendationInput) (*Recommendation, error) {
	r := &Recommendation{}
	r.IsActive = ri.IsActive
	data, err := ri.Data.ToModel()
	if err != nil {
		return nil, err
	}
	r.Data = *data
	r.UserID = utils.StringIDToNumber(ri.UserID)
	r.RecommenderID = utils.StringIDToNumber(ri.RecommenderID)
	r.PlayrollID = utils.StringIDToNumber(ri.PlayrollID)
	return r, nil
}

func RecommendationOutputToModel(ro *RecommendationOutput) (*Recommendation, error) {
	return nil, fmt.Errorf("RecommendationOutputToModel Not Implemented")
}

func RecommendationModelToOutput(r *Recommendation) (*RecommendationOutput, error) {
	ro := &RecommendationOutput{}
	ro.Model = r.Model
	ro.IsActive = r.IsActive
	data, err := r.Data.ToOutput()
	if err != nil {
		return nil, err
	}
	ro.Data = *data
	ro.UserID = r.UserID
	user, err := FormatUser(&r.User)
	if err != nil {
		return nil, err
	}
	ro.User = *user
	ro.RecommenderID = r.RecommenderID
	recommender, err := FormatUser(&r.Recommender)
	if err != nil {
		return nil, err
	}
	ro.Recommender = *recommender
	ro.PlayrollID = r.PlayrollID
	playroll, err := FormatPlayroll(&r.Playroll)
	if err != nil {
		return nil, err
	}
	ro.Playroll = *playroll
	return ro, nil
}

func InitRecommendationDAO(db *gorm.DB) Entity {
	dao := &Recommendation{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatRecommendation(val interface{}) (*RecommendationOutput, error) {
	r, ok := val.(*Recommendation)
	if !ok {
		return nil, fmt.Errorf("error converting to Recommendation")
	}
	return RecommendationModelToOutput(r)
}

func FormatRecommendationSlice(val interface{}) ([]RecommendationOutput, error) {
	rs, ok := val.(*[]Recommendation)
	if !ok {
		return nil, fmt.Errorf("error converting to Recommendation Slice")
	}
	output := []RecommendationOutput{}
	for _, r := range *rs {
		ro, err := RecommendationModelToOutput(&r)
		if err != nil {
			return nil, err
		}
		output = append(output, *ro)
	}
	return output, nil
}

// Interface Generalization Methods

func (ri *RecommendationInput) ToModel() (Entity, error) {
	return RecommendationInputToModel(ri)
}

func (ro *RecommendationOutput) ToModel() (Entity, error) {
	return RecommendationOutputToModel(ro)
}

func (r *Recommendation) ToOutput() (EntityOutput, error) {
	return RecommendationModelToOutput(r)
}

func (_ *Recommendation) InitDAO(db *gorm.DB) Entity {
	return InitRecommendationDAO(db)
}

func (_ *Recommendation) Format(val interface{}) (EntityOutput, error) {
	return FormatRecommendation(val)
}

func (_ *Recommendation) FormatSlice(val interface{}) (interface{}, error) {
	return FormatRecommendationSlice(val)
}
