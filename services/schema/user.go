package schema

import (
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type User struct {
	utils.Model `gql:"MODEL"`
	Name        string `gql:"name: String"`
}

type UserMethods struct {
	GetUser     *utils.Query    `gql:"user: User"`
	SearchUsers *utils.Query    `gql:"searchUsers: [User]"`
	ListUsers   *utils.Query    `gql:"listUsers: [User]"`
	CreateUser  *utils.Mutation `gql:"createUser: User"`
	UpdateUser  *utils.Mutation `gql:"updateUser: User"`
	DeleteUser  *utils.Mutation `gql:"deleteUser: User"`
}

func getUser(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &User{}, nil
}

func searchUsers(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*User{&User{}, &User{}}, nil
}

func listUsers(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*User{&User{}, &User{}}, nil
}

func createUser(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &User{}, nil
}

func updateUser(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &User{}, nil
}

func deleteUser(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return &User{}, nil
}

var UserEntity = &utils.Entity{
	Name:  "User",
	Model: &User{},
	Methods: &UserMethods{
		GetUser:     &utils.Query{Request: getUser, Scope: "Public"},
		SearchUsers: &utils.Query{Request: searchUsers, Scope: "Public"},
		ListUsers:   &utils.Query{Request: listUsers, Scope: "Admin"},
		CreateUser:  &utils.Mutation{Request: createUser, Scope: "Admin, Webhook"},
		UpdateUser:  &utils.Mutation{Request: updateUser, Scope: "User"},
		DeleteUser:  &utils.Mutation{Request: deleteUser, Scope: "Admin"},
	},
}
