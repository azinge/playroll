package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/jinzhu/gorm"
)

//! Deprecation Notice: Using relationship entity from now on

type Friendship struct {
	Model
	Status   string
	UserID   uint `gorm:"primary_key"`
	User     User
	FriendID uint `gorm:"primary_key"`
	Friend   User
}

type FriendshipInput struct {
	Status   string `gql:"String"`
	UserID   string `gql:"userID: ID"`
	FriendID string `gql:"friendID: ID"`
}

type FriendshipOutput struct {
	Model    `gql:"MODEL"`
	Status   string     `gql:"status: String"`
	UserID   uint       `gql:"userID: ID"`
	User     UserOutput `gql:"user: User"`
	FriendID uint       `gql:"friendID: ID"`
	Friend   UserOutput `gql:"friend: User"`
}

// Utility Methods

func GetFriendsByUserID(id uint, db *gorm.DB) (*[]User, error) {
	fs := &[]Friendship{}
	if err := db.Preload("Friend").Where(&Friendship{UserID: id}).Find(&fs).Error; err != nil {
		fmt.Println(err)
		return nil, err
	}

	friends := []User{}
	for _, f := range *fs {
		friends = append(friends, f.Friend)
	}

	return &friends, nil
}

// Entity Specific Methods

func FriendshipInputToModel(fi *FriendshipInput) (*Friendship, error) {
	f := &Friendship{}
	f.Status = fi.Status
	f.UserID = utils.StringIDToNumber(fi.UserID)
	f.FriendID = utils.StringIDToNumber(fi.FriendID)
	return f, nil
}

func FriendshipOutputToModel(fo *FriendshipOutput) (*Friendship, error) {
	return nil, fmt.Errorf("FriendshipOutputToModel Not Implemented")
}

func FriendshipModelToOutput(f *Friendship) (*FriendshipOutput, error) {
	fo := &FriendshipOutput{}
	fo.Model = f.Model
	fo.Status = f.Status
	fo.UserID = f.UserID
	user, err := FormatUser(&f.User)
	if err != nil {
		return nil, err
	}
	fo.User = *user
	fo.FriendID = f.FriendID
	friend, err := FormatUser(&f.Friend)
	if err != nil {
		return nil, err
	}
	fo.Friend = *friend
	return fo, nil
}

func InitFriendshipDAO(db *gorm.DB) Entity {
	dao := &Friendship{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatFriendship(val interface{}) (*FriendshipOutput, error) {
	f, ok := val.(*Friendship)
	if !ok {
		return nil, fmt.Errorf("error converting to Friendship")
	}
	return FriendshipModelToOutput(f)
}

func FormatFriendshipSlice(val interface{}) ([]FriendshipOutput, error) {
	fs, ok := val.(*[]Friendship)
	if !ok {
		return nil, fmt.Errorf("error converting to Friendship Slice")
	}
	output := []FriendshipOutput{}
	for _, f := range *fs {
		fo, err := FriendshipModelToOutput(&f)
		if err != nil {
			return nil, err
		}
		output = append(output, *fo)
	}
	return output, nil
}

// Interface Generalization Methods

func (fi *FriendshipInput) ToModel() (Entity, error) {
	return FriendshipInputToModel(fi)
}

func (fo *FriendshipOutput) ToModel() (Entity, error) {
	return FriendshipOutputToModel(fo)
}

func (f *Friendship) ToOutput() (EntityOutput, error) {
	return FriendshipModelToOutput(f)
}

func (_ *Friendship) InitDAO(db *gorm.DB) Entity {
	return InitFriendshipDAO(db)
}

func (_ *Friendship) Format(val interface{}) (EntityOutput, error) {
	return FormatFriendship(val)
}

func (_ *Friendship) FormatSlice(val interface{}) (interface{}, error) {
	return FormatFriendshipSlice(val)
}
