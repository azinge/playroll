package crud

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
	Request:     GenerateGetEntityMethod(&models.Playroll{}),
}

var listUsers = gqltag.Method{
	Description: `[List Users Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.Playroll{}),
}

var createUser = gqltag.Method{
	Description: `[Create User Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.Playroll{}, &models.PlayrollInput{}),
}

var updateUser = gqltag.Method{
	Description: `[Update User Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.Playroll{}, &models.PlayrollInput{}),
}

var deleteUser = gqltag.Method{
	Description: `[Delete User Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.Playroll{}),
}

var LinkedUserMethods = UserMethods{
	GetUser:    gqltag.LinkQuery(getUser),
	ListUsers:  gqltag.LinkQuery(listUsers),
	CreateUser: gqltag.LinkMutation(createUser),
	UpdateUser: gqltag.LinkMutation(updateUser),
	DeleteUser: gqltag.LinkMutation(deleteUser),
}
