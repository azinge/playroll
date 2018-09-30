package main

import (
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type User struct {
	Model `gql:"MODEL"`
	Name  string `gql:"name: String"`
}

type UserMethods struct {
	GetUser     *Query    `gql:"user: User"`
	SearchUsers *Query    `gql:"searchUsers: [User]"`
	ListUsers   *Query    `gql:"listUsers: [User]"`
	CreateUser  *Mutation `gql:"createUser: User"`
	UpdateUser  *Mutation `gql:"updateUser: User"`
	DeleteUser  *Mutation `gql:"deleteUser: User"`
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

var UserEntity = &Entity{
	Name:  "User",
	Model: &User{},
	Methods: &UserMethods{
		GetUser:     &Query{Request: getUser, Scope: "Public"},
		SearchUsers: &Query{Request: searchUsers, Scope: "Public"},
		ListUsers:   &Query{Request: listUsers, Scope: "Admin"},
		CreateUser:  &Mutation{Request: createUser, Scope: "Admin, Webhook"},
		UpdateUser:  &Mutation{Request: updateUser, Scope: "User"},
		DeleteUser:  &Mutation{Request: deleteUser, Scope: "Admin"},
	},
}