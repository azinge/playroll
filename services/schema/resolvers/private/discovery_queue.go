package private

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/graphql-go/graphql"
)

// DiscoveryQueueMethods defines the methods for the discovery queue entity.
type DiscoveryQueueMethods struct {
	ListCurrentUserDiscoveryQueues *gqltag.Query `gql:"listCurrentUserDiscoveryQueues: [DiscoveryQueue]"`
}

var listCurrentUserDiscoveryQueues = gqltag.Method{
	Description: `Get discovery queue for a given user.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println("error authorizing user: ", err.Error())
			return nil, err
		}
		discoveryQueues, err := models.GetDiscoveryQueuesByUserID(user.ID, mctx.DB)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		return discoveryQueues, nil
	},
}

// LinkedDiscoveryQueueMethods exports the methods for the discovery queue entity.
var LinkedDiscoveryQueueMethods = DiscoveryQueueMethods{
	ListCurrentUserDiscoveryQueues: gqltag.LinkQuery(listCurrentUserDiscoveryQueues),
}
