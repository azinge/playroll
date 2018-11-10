package schema

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/cazinge/playroll/services/utils/pagination"
	"github.com/cazinge/playroll/services/utils/search"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type User struct {
	utils.Model         `gql:"MODEL"`
	Name                string `gql:"name: String"`
	ExternalCredentials []ExternalCredentials
	Playrolls           []Playroll
}

type UserMethods struct {
	GetUser     *utils.Query    `gql:"user(id: ID!): User"`
	SearchUsers *utils.Query    `gql:"searchUsers(options: SearchInput!): [User]"`
	ListUsers   *utils.Query    `gql:"listUsers(options: PaginationInput!): [User]"`
	CreateUser  *utils.Mutation `gql:"createUser(user: CreateUserInput!): User"`
	UpdateUser  *utils.Mutation `gql:"updateUser(user: UpdateUserInput!): User"`
	DeleteUser  *utils.Mutation `gql:"deleteUser(id: ID!): User"`
}

func getUser(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	user := &User{}
	id, ok := params.Args["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
		fmt.Println("Error getting user: " + err.Error())
		return nil, err
	}
	return user, nil
}

func searchUsers(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var users []User
	if err := search.Query(params, db, &users); err != nil {
		return nil, err
	}
	return users, nil
}

func listUsers(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var users []User
	pagination.HandlePagination(params, db, &users)
	return users, nil
}

type CreateUserInput struct {
	Name string `gql:"name: String"`
}

func createUser(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	name, ok := params.Args["user"].(map[string]interface{})["name"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("name")
	}

	user := &User{Name: name}
	if err := db.Create(&user).Error; err != nil {
		fmt.Println("Error creating user: " + err.Error())
		return nil, err
	}
	return user, nil
}

type UpdateUserInput struct {
	ID   string `gql:"id: ID!"`
	Name string `gql:"name: String"`
}

func updateUser(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	user := &User{}

	id, ok := params.Args["user"].(map[string]interface{})["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	name, ok := params.Args["user"].(map[string]interface{})["name"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("name")
	}

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

	id, ok := params.Args["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("name")
	}

	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
		fmt.Println("Error deleting user: " + err.Error())
		return nil, err
	}

	associationsToRemove := []string{"ExternalCredentials", "Playrolls"}
	utils.HandleRemoveAssociationReferences(db, user, associationsToRemove)
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
