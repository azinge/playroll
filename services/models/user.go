package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type User struct {
	Model
	Name                string
	Avatar              string
	Playrolls           []Playroll
	ExternalCredentials []ExternalCredential
}

type UserInput struct {
	Name   string `gql:"name: String"`
	Avatar string `gql:"avatar: String"`
}

type UserOutput struct {
	Model               `gql:"MODEL"`
	Name                string                     `gql:"name: String"`
	Avatar              string                     `gql:"avatar: String"`
	Playrolls           []PlayrollOutput           `gql:"playrolls: [Playroll]"`
	ExternalCredentials []ExternalCredentialOutput `gql:"externalCredentials: [ExternalCredential]"`
}

// Entity Specific Methods

func UserInputToModel(ui *UserInput) (*User, error) {
	u := &User{}
	u.Name = ui.Name
	u.Avatar = ui.Avatar
	return u, nil
}

func UserOutputToModel(uo *UserOutput) (*User, error) {
	return nil, fmt.Errorf("UserOutputToModel Not Implemented")
}

func UserModelToOutput(u *User) (*UserOutput, error) {
	fmt.Printf("%#v\n", u)
	uo := &UserOutput{}
	uo.Model = u.Model
	uo.Name = u.Name
	uo.Avatar = u.Avatar
	playrolls, err := FormatPlayrollSlice(&u.Playrolls)
	if err != nil {
		return nil, err
	}
	uo.Playrolls = playrolls
	externalCredentials, err := FormatExternalCredentialSlice(&u.ExternalCredentials)
	if err != nil {
		return nil, err
	}
	uo.ExternalCredentials = externalCredentials
	return uo, nil
}

func InitUserDAO(db *gorm.DB) *User {
	user := &User{}
	user.SetEntity(user)
	user.SetDB(db)
	return user
}

func FormatUser(val interface{}) (*UserOutput, error) {
	u, ok := val.(*User)
	if !ok {
		return nil, fmt.Errorf("error converting to User")
	}
	return UserModelToOutput(u)
}

func FormatUserSlice(val interface{}) ([]UserOutput, error) {
	us, ok := val.(*[]User)
	if !ok {
		return nil, fmt.Errorf("error converting to User Slice")
	}
	output := []UserOutput{}
	for _, u := range *us {
		uo, err := UserModelToOutput(&u)
		if err != nil {
			return nil, err
		}
		output = append(output, *uo)
	}
	return output, nil
}

// Interface Generalization Methods

func (ui *UserInput) ToModel() (Entity, error) {
	return UserInputToModel(ui)
}

func (uo *UserOutput) ToModel() (Entity, error) {
	return UserOutputToModel(uo)
}

func (u *User) ToOutput() (EntityOutput, error) {
	return UserModelToOutput(u)
}

func (_ *User) InitDAO(db *gorm.DB) Entity {
	return InitUserDAO(db)
}

func (_ *User) Format(val interface{}) (EntityOutput, error) {
	return FormatUser(val)
}

func (_ *User) FormatSlice(val interface{}) (interface{}, error) {
	return FormatUserSlice(val)
}
