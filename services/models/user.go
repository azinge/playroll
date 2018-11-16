package models

type User struct {
	Model              `gql:"MODEL"`
	Name               string               `gql:"name: String"`
	Playrolls          []Playroll           `gql:"playroll: Playroll"`
	ExternalCredential []ExternalCredential `gql:"externalCredentials: [ExternalCredential]"`
}

type UserInput struct {
	Name string `gql:"name: String"`
}

func (ui *UserInput) CreateUserFromInputFields() *User {
	user := &User{}
	user.Name = ui.Name
	return user
}
