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

var getUser = gqltag.Method{
	Description: `[Get User Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		u := models.InitUserDAO(db)
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

		rawUser, err := u.Get(id)
		if err != nil {
			return nil, err
		}
		return models.FormatUser(rawUser)
	},
}

var listUsers = gqltag.Method{
	Description: `[List Users Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
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

		u := models.InitUserDAO(db)

		rawUser, err := u.List()
		if err != nil {
			return nil, err
		}
		return models.FormatUser(rawUser)
	},
}

var createUser = gqltag.Method{
	Description: `[Create User Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		u := models.InitUserDAO(db)
		type createUserParams struct {
			Input models.UserInput
		}

		params := &createUserParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		user, err := params.Input.ToModel()
		if err != nil {
			return nil, err
		}

		rawUser, err := u.Create(user)
		if err != nil {
			return nil, err
		}
		return models.FormatUser(rawUser)
	},
}

var updateUser = gqltag.Method{
	Description: `[Update User Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		u := models.InitUserDAO(db)
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

		user, err := params.Input.ToModel()
		if err != nil {
			return nil, err
		}
		user.ID = utils.StringIDToNumber(params.ID)

		rawUser, err := u.Update(user)
		if err != nil {
			return nil, err
		}
		return models.FormatUser(rawUser)
	},
}

var deleteUser = gqltag.Method{
	Description: `[Delete User Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		u := models.InitUserDAO(db)
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

		rawUser, err := u.Delete(id)
		if err != nil {
			return nil, err
		}
		return models.FormatUser(rawUser)
	},
}

var LinkedUserMethods = UserMethods{
	GetUser:    gqltag.LinkQuery(getUser),
	ListUsers:  gqltag.LinkQuery(listUsers),
	CreateUser: gqltag.LinkMutation(createUser),
	UpdateUser: gqltag.LinkMutation(updateUser),
	DeleteUser: gqltag.LinkMutation(deleteUser),
}
