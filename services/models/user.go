package models

import "fmt"

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

func (ui *UserInput) CreateUserFromInputFields() *User {
	user := &User{}
	user.Name = ui.Name
	return user
}
