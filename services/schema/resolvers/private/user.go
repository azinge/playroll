package private

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

type UserMethods struct {
	GetCurrentUser   *gqltag.Query    `gql:"currentUser(deviceToken: String): User"`
	GetUser          *gqltag.Query    `gql:"user(id: ID!): User"`
	SearchUsers      *gqltag.Query    `gql:"searchUsers(query:String, offset: Int, count: Int): [User]"`
	ClearDeviceToken *gqltag.Mutation `gql:"clearDeviceToken(deviceToken: String): User"`
}

var getCurrentUser = gqltag.Method{
	Description: `[Get Current User Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type getUserParams struct {
			DeviceToken *string
		}
		params := &getUserParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		if params.DeviceToken != nil {
			user, err = models.StoreUserDeviceToken(user.ID, *params.DeviceToken, mctx.DB)
			if err != nil {
				return nil, err
			}
		}

		return user, nil
	},
}

var getUser = gqltag.Method{
	Description: `[Get User Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		authorizedUser, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type getUserParams struct {
			ID string
		}
		params := &getUserParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)

		userModel := &models.User{}
		if err := mctx.DB.Preload("Relationships", "user_id = ?", authorizedUser.ID).First(userModel, id).Error; err != nil {
			fmt.Printf("error finding user: %s", err.Error())
			return nil, err
		}

		user, err := models.FormatUser(userModel)
		if err != nil {
			return nil, err
		}
		return user, nil
	},
}

var searchUsers = gqltag.Method{
	Description: `[Search Users Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		authorizedUser, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type searchUsersParams struct {
			Query  string
			Offset *uint
			Count  *uint
		}
		params := &searchUsersParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		userModels := &[]models.User{}
		offset, count := utils.InitializePaginationVariables(params.Offset, params.Count)
		if err := mctx.DB.Preload("Relationships", "user_id = ?", authorizedUser.ID).Where("name LIKE ?", "%"+params.Query+"%").Where("id <> ? AND account_type <> ?", authorizedUser.ID, "Managed").Offset(offset).Limit(count).Find(userModels).Error; err != nil {
			fmt.Printf("error searching users: %s", err.Error())
			return nil, err
		}

		users, err := models.FormatUserSlice(userModels)
		if err != nil {
			return nil, err
		}
		return users, nil
	},
}

var clearDeviceToken = gqltag.Method{
	Description: `[Clear Device Token Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type clearDeviceTokenParams struct {
			DeviceToken string
		}

		params := &clearDeviceTokenParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		return models.ClearUserDeviceToken(user.ID, params.DeviceToken, mctx.DB)
	},
}

var LinkedUserMethods = UserMethods{
	GetCurrentUser:   gqltag.LinkQuery(getCurrentUser),
	GetUser:          gqltag.LinkQuery(getUser),
	SearchUsers:      gqltag.LinkQuery(searchUsers),
	ClearDeviceToken: gqltag.LinkMutation(clearDeviceToken),
}
