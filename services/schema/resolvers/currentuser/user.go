package currentuser

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/graphql-go/graphql"
)

type UserMethods struct {
	GetCurrentUser *gqltag.Query `gql:"currentUser: User"`
}

var getCurrentUser = gqltag.Method{
	Description: `[Get Current User Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		return models.AuthorizeUser(mctx)
	},
}

var LinkedUserMethods = UserMethods{
	GetCurrentUser: gqltag.LinkQuery(getCurrentUser),
}
