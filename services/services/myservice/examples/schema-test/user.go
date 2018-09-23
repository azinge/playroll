package main

import (
	"fmt"

	"github.com/graphql-go/graphql"
)

type User struct {
	Model `gql:"MODEL"`
	Name  string `json:"name" gql:"name: String"`
}

type UserMethods struct {
	GetUser     *Query    `gql:"user: User"`
	SearchUsers *Query    `gql:"searchUsers: User"`
	ListUsers   *Query    `gql:"listUsers: User"`
	CreateUser  *Mutation `gql:"createUser: User"`
	UpdateUser  *Mutation `gql:"updateUser: User"`
	DeleteUser  *Mutation `gql:"deleteUser: User"`
}

func getUser(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("user, args:%+v\n", params.Args)
	return nil, nil
}

func searchUsers(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("searchUsers, args:%+v\n", params.Args)
	return nil, nil
}

func listUsers(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("listUsers, args:%+v\n", params.Args)
	return nil, nil
}

func createUser(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("createUser, args:%+v\n", params.Args)
	return nil, nil
}

func updateUser(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("updateUser, args:%+v\n", params.Args)
	return nil, nil
}

func deleteUser(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("deleteUser, args:%+v\n", params.Args)
	return nil, nil
}

var UserEntity = &Entity{
	Name:  "User",
	Model: &User{},
	Queries: &UserMethods{
		GetUser:     &Query{Request: getUser, Scope: "Public"},
		SearchUsers: &Query{Request: searchUsers, Scope: "Public"},
		ListUsers:   &Query{Request: listUsers, Scope: "Admin"},
		CreateUser:  &Mutation{Request: createUser, Scope: "Admin, Webhook"},
		UpdateUser:  &Mutation{Request: updateUser, Scope: "User"},
		DeleteUser:  &Mutation{Request: deleteUser, Scope: "Admin"},
	},
}
