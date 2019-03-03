package admin

import (
	"github.com/cazinge/playroll/services/gqltag"

	"github.com/cazinge/playroll/services/models"
)

type UserMethods struct {
	GetUser    *gqltag.Query    `gql:"user(id: ID!): User"`
	ListUsers  *gqltag.Query    `gql:"listUsers(offset: Int, count: Int): [User]"`
	CreateUser *gqltag.Mutation `gql:"createUser(input: UserInput!): User"`
	UpdateUser *gqltag.Mutation `gql:"updateUser(id: ID!, input: UserInput!): User"`
	DeleteUser *gqltag.Mutation `gql:"deleteUser(id: ID!): User"`
}

var getUser = gqltag.Method{
	Description: `[Get User Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.User{}),
}

var listUsers = gqltag.Method{
	Description: `[List Users Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.User{}),
}

var createUser = gqltag.Method{
	Description: `[Create User Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.User{}, &models.UserInput{}),
}

var updateUser = gqltag.Method{
	Description: `[Update User Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.User{}, &models.UserInput{}),
}

var deleteUser = gqltag.Method{
	Description: `[Delete User Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.User{}),
}

var LinkedUserMethods = UserMethods{
	GetUser:    gqltag.LinkQuery(getUser),
	ListUsers:  gqltag.LinkQuery(listUsers),
	CreateUser: gqltag.LinkMutation(createUser),
	UpdateUser: gqltag.LinkMutation(updateUser),
	DeleteUser: gqltag.LinkMutation(deleteUser),
}
