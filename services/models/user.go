package models

import (
	"fmt"

	"github.com/jinzhu/gorm"
)

type User struct {
	Model
	Name                string
	Playrolls           []Playroll
	ExternalCredentials []ExternalCredential
}

type UserInput struct {
	Name string `gql:"name: String"`
}

type UserOutput struct {
	Model               `gql:"MODEL"`
	Name                string               `gql:"name: String"`
	Playrolls           []Playroll           `gql:"playrolls: [Playroll]"`
	ExternalCredentials []ExternalCredential `gql:"externalCredentials: [ExternalCredential]"`
}

func (ui *UserInput) ToModel() (*User, error) {
	u := &User{}
	u.Name = ui.Name
	return u, nil
}

func (u *User) ToOutput() (*UserOutput, error) {
	fmt.Printf("%#v\n", u)
	uo := &UserOutput{}
	uo.Model = u.Model
	uo.Name = u.Name
	uo.Playrolls = u.Playrolls
	uo.ExternalCredentials = u.ExternalCredentials
	return uo, nil
}

func InitUserDAO(db *gorm.DB) *User {
	user := &User{}
	user.SetEntity(user)
	user.SetDB(db)
	return user
}

func (_ *User) InitDAO(db *gorm.DB) Entity {
	return InitUserDAO(db)
}

func FormatUser(val interface{}) (*UserOutput, error) {
	u, ok := val.(*User)
	if !ok {
		return nil, fmt.Errorf("error converting to User")
	}
	return u.ToOutput()
}

func (_ *User) Format(val interface{}) (interface{}, error) {
	return FormatUser(val)
}

func FormatUserSlice(val interface{}) ([]UserOutput, error) {
	us, ok := val.(*[]User)
	if !ok {
		return nil, fmt.Errorf("error converting to User Slice")
	}
	output := []UserOutput{}
	for _, u := range *us {
		uo, err := u.ToOutput()
		if err != nil {
			return nil, err
		}
		output = append(output, *uo)
	}
	return output, nil
}

func (_ *User) FormatSlice(val interface{}) (interface{}, error) {
	return FormatUserSlice(val)
}
