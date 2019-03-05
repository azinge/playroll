package methods

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

// FriendshipMethods defines the types for all friendship methods.
type FriendshipMethods struct {
	BrowseUserFriends *gqltag.Query `gql:"browseUserFriends(userID: ID): [User]"`
}

var browseUserFriends = gqltag.Method{
	Description: `Browses the current users friends.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		// Destructers your parameters that the function takes in and makes avail through param object.
		type browseUserFriendsParams struct {
			UserID string
		}
		params := &browseUserFriendsParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		userID := utils.StringIDToNumber(params.UserID)

		users, err := models.GetFriendsByUserID(userID, mctx.DB)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		return *users, nil
	},
}

// LinkedFriendshipMethods links and makes available all methods stemming from the friendship entity.
var LinkedFriendshipMethods = FriendshipMethods{
	BrowseUserFriends: gqltag.LinkQuery(browseUserFriends),
}
