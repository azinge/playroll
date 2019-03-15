package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/jinzhu/gorm"
)

type Relationship struct {
	Model
	Status      string
	IsBlocking  bool
	UserID      uint `gorm:"primary_key"`
	User        User
	OtherUserID uint `gorm:"primary_key"`
	OtherUser   User
}

type RelationshipInput struct {
	Status      string `gql:"status: String"`
	IsBlocking  bool   `gql:"isBlocking: Boolean"`
	UserID      string `gql:"userID: ID"`
	OtherUserID string `gql:"otherUserID: ID"`
}

type RelationshipOutput struct {
	Model       `gql:"MODEL"`
	Status      string     `gql:"status: String"`
	IsBlocking  bool       `gql:"isBlocking: Boolean"`
	UserID      uint       `gql:"userID: ID"`
	User        UserOutput `gql:"user: User"`
	OtherUserID uint       `gql:"otherUserID: ID"`
	OtherUser   UserOutput `gql:"otherUser: User"`
}

// Utility Methods

func GetFriendsByUserID(id uint, db *gorm.DB) (*[]User, error) {
	rs := &[]Relationship{}
	if err := db.Preload("OtherUser").Where(&Relationship{UserID: id, Status: "Friend"}).Find(&rs).Error; err != nil {
		fmt.Println(err)
		return nil, err
	}

	otherUsers := []User{}
	for _, r := range *rs {
		otherUsers = append(otherUsers, r.OtherUser)
	}

	return &otherUsers, nil
}

// Entity Specific Methods

func RelationshipInputToModel(ri *RelationshipInput) (*Relationship, error) {
	r := &Relationship{}
	r.Status = ri.Status
	r.IsBlocking = ri.IsBlocking
	r.UserID = utils.StringIDToNumber(ri.UserID)
	r.OtherUserID = utils.StringIDToNumber(ri.OtherUserID)
	return r, nil
}

func RelationshipOutputToModel(r *RelationshipOutput) (*Relationship, error) {
	return nil, fmt.Errorf("RelationshipOutputToModel Not Implemented")
}

func RelationshipModelToOutput(r *Relationship) (*RelationshipOutput, error) {
	ro := &RelationshipOutput{}
	ro.Model = r.Model
	ro.Status = r.Status
	ro.IsBlocking = r.IsBlocking
	ro.UserID = r.UserID
	ro.OtherUserID = r.OtherUserID
	user, err := FormatUser(&r.User)
	if err != nil {
		return nil, err
	}
	ro.User = *user
	otherUser, err := FormatUser(&r.OtherUser)
	if err != nil {
		return nil, err
	}
	ro.OtherUser = *otherUser
	return ro, nil
}

func InitRelationshipDAO(db *gorm.DB) Entity {
	dao := &Relationship{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatRelationship(val interface{}) (*RelationshipOutput, error) {
	r, ok := val.(*Relationship)
	if !ok {
		return nil, fmt.Errorf("error converting to Relationship")
	}
	return RelationshipModelToOutput(r)
}

func FormatRelationshipSlice(val interface{}) ([]RelationshipOutput, error) {
	rs, ok := val.(*[]Relationship)
	if !ok {
		return nil, fmt.Errorf("error converting to Relationship Slice")
	}
	output := []RelationshipOutput{}
	for _, r := range *rs {
		ro, err := RelationshipModelToOutput(&r)
		if err != nil {
			return nil, err
		}
		output = append(output, *ro)
	}
	return output, nil
}

// Interface Generalization Methods

func (ri *RelationshipInput) ToModel() (Entity, error) {
	return RelationshipInputToModel(ri)
}

func (ro *RelationshipOutput) ToModel() (Entity, error) {
	return RelationshipOutputToModel(ro)
}

func (r *Relationship) ToOutput() (EntityOutput, error) {
	return RelationshipModelToOutput(r)
}

func (_ *Relationship) InitDAO(db *gorm.DB) Entity {
	return InitRelationshipDAO(db)
}

func (_ *Relationship) Format(val interface{}) (EntityOutput, error) {
	return FormatRelationship(val)
}

func (_ *Relationship) FormatSlice(val interface{}) (interface{}, error) {
	return FormatRelationshipSlice(val)
}
