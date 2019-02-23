package methods

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

// DiscoveryQueueMethods defines the methods for the discovery queue entity.
type DiscoveryQueueMethods struct {
	GetCurrentUserDiscoveryQueue *gqltag.Query `gql:"currentUserDiscoveryQueue(userID: ID): DiscoveryQueue"`
}

var getCurrentUserDiscoveryQueue = gqltag.Method{
	Description: `Get discovery queue for a given user.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		// user, err := models.AuthorizeUser(mctx)
		type getCurrentUserDiscoveryQueueParams struct {
			UserID string
		}
		params := &getCurrentUserDiscoveryQueueParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		userID := utils.StringIDToNumber(params.UserID)

		discoveryQueue, err := models.GetDiscoveryQueueByUserID(userID, mctx.DB)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		return discoveryQueue, nil
	},
}

// LinkedDiscoveryQueueMethods exports the methods for the discovery queue entity.
var LinkedDiscoveryQueueMethods = DiscoveryQueueMethods{
	GetCurrentUserDiscoveryQueue: gqltag.LinkQuery(getCurrentUserDiscoveryQueue),
}
