package crud

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/utils"
	"github.com/mitchellh/mapstructure"

	"github.com/cazinge/playroll/services/models"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type UserMethods struct {
	GetUser    *gqltag.Query    `gql:"user(id: ID!): User"`
	ListUsers  *gqltag.Query    `gql:"listUsers(offset: Int, count: Int): [User]"`
	CreateUser *gqltag.Mutation `gql:"createUser(input: UserInput!): User"`
	UpdateUser *gqltag.Mutation `gql:"updateUser(id: ID!, input: UserInput!): User"`
	DeleteUser *gqltag.Mutation `gql:"deleteUser(id: ID!): User"`
}

func initUser(db *gorm.DB) *models.User {
	user := &models.User{}
	user.SetEntity(user)
	user.SetDB(db)
	return user
}

var getUser = gqltag.Method{
	Description: `[Get User Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		u := initUser(db)
		type getUserParams struct {
			ID string
		}

		params := &getUserParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)
		return u.Get(id)
	},
}

var listUsers = gqltag.Method{
	Description: `[List Users Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		u := initUser(db)
		type listUsersParams struct {
			Offset uint
			Count  uint
		}

		params := &listUsersParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		return u.List()
	},
}

var createUser = gqltag.Method{
	Description: `[Create User Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		u := initUser(db)
		type createUserParams struct {
			Input models.UserInput
		}

		params := &createUserParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		user := params.Input.CreateUserFromInputFields()
		return u.Create(user)
	},
}

var updateUser = gqltag.Method{
	Description: `[Update User Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		u := initUser(db)
		type updateUserParams struct {
			ID    string
			Input models.UserInput
		}

		params := &updateUserParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		user := params.Input.CreateUserFromInputFields()
		user.ID = utils.StringIDToNumber(params.ID)
		return u.Update(user)
	},
}

var deleteUser = gqltag.Method{
	Description: `[Delete User Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		u := initUser(db)
		type deleteUserParams struct {
			ID string
		}

		params := &deleteUserParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)
		return u.Delete(id)
	},
}

var LinkedUserMethods = UserMethods{
	GetUser:    gqltag.LinkQuery(getUser),
	ListUsers:  gqltag.LinkQuery(listUsers),
	CreateUser: gqltag.LinkMutation(createUser),
	UpdateUser: gqltag.LinkMutation(updateUser),
	DeleteUser: gqltag.LinkMutation(deleteUser),
}
