package private

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

type UserMethods struct {
	GetCurrentUser *gqltag.Query `gql:"currentUser: User"`
	SearchUsers    *gqltag.Query `gql:"searchUsers(query:String, offset: Int, count: Int): [User]"`
}

var getCurrentUser = gqltag.Method{
	Description: `[Get Current User Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		return models.AuthorizeUser(mctx)
	},
}

var searchUsers = gqltag.Method{
	Description: `[Search Users Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type listSpotifyPlaylistsParams struct {
			Query  string
			Offset uint
			Count  uint
		}
		params := &listSpotifyPlaylistsParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		userModels := &[]models.User{}

		// TODO (dmoini): double check offset, count
		if params.Count == 0 {
			params.Count = 0
		}
		if params.Offset == 0 {
			params.Offset = 20
		}

		if err := mctx.DB.Preload("Relationships", "other_user_id = ?", user.ID).Where("name LIKE ?", "%"+params.Query+"%").Offset(params.Offset).Limit(params.Count).Find(userModels).Error; err != nil {
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

var LinkedUserMethods = UserMethods{
	GetCurrentUser: gqltag.LinkQuery(getCurrentUser),
	SearchUsers:    gqltag.LinkQuery(searchUsers),
}
