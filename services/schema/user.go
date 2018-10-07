package schema

import (
	"fmt"
	"time"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type User struct {
	ID        uint       `gql:"id: ID" gorm:"primary_key"`
	CreatedAt time.Time  `gql:"createdAt: String"`
	UpdatedAt time.Time  `gql:"updatedAt: String"`
	DeletedAt *time.Time `gql:"deletedAt: String"`
	Name        string `gql:"name: String"`
}

type UserMethods struct {
	GetUser     *utils.Query    `gql:"user(id: ID!): User"`
	SearchUsers *utils.Query    `gql:"searchUsers: [User]"`
	ListUsers   *utils.Query    `gql:"listUsers: [User]"`
	CreateUser  *utils.Mutation `gql:"createUser(user: CreateUserInput!): User"`
	UpdateUser  *utils.Mutation `gql:"updateUser(user: UpdateUserInput!): User"`
	DeleteUser  *utils.Mutation `gql:"deleteUser(id: ID!): User"`
}

func getUser(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	user := &User{}
	id, _ := params.Args["id"].(string)
	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
		fmt.Println("Error getting user: " + err.Error())
		return nil, err
	}
	return user, nil
}

func searchUsers(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	return []*User{&User{}, &User{}}, nil
}

func listUsers(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	users := []*User{}
	// currently does not handle offset and count
	if err := db.Find(&users).Error; err != nil {
		fmt.Println("Error listing users: " + err.Error())
		return nil, err
	}
	return users, nil
}

type CreateUserInput struct {
	Name string `gql:"name: String"`
}

func createUser(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	name, _ := params.Args["user"].(map[string]interface{})["name"].(string)
	user := &User{Name: name}
	if err := db.Create(&user).Error; err != nil {
		fmt.Println("Error creating user: " + err.Error())
		return nil, err
	}
	return user, nil
}

type UpdateUserInput struct {
	ID string `gql:"id: ID!"`
	Name string `gql:"name: String"`
}

func updateUser(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	user := &User{}
	id, _ := params.Args["user"].(map[string]interface{})["id"].(string)
	name, _ := params.Args["user"].(map[string]interface{})["name"].(string)
	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
		fmt.Println("getting user to update: " + err.Error())
		return nil, err
	}
	user.Name = name
	if err := db.Save(&user).Error; err != nil {
		fmt.Println("error updating user: " + err.Error())
		return nil, err
	}
	return user, nil
}

func deleteUser(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	user := &User{}
	id, _ := params.Args["id"].(string)
	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
		fmt.Println("Error deleting user: " + err.Error())
		return nil, err
	}
	db.Delete(&user)
	return user, nil
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
	Types: &[]*utils.Type{
		&utils.Type{Name: "CreateUserInput", IsInput: true, Model: &CreateUserInput{}},
		&utils.Type{Name: "UpdateUserInput", IsInput: true, Model: &UpdateUserInput{}},
	},
}
