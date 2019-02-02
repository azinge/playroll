package methods

import (
	"fmt"
	"strings"

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
		// Unauthenticated
		authenticated := mctx.Request.RequestContext.Identity.CognitoAuthenticationType == "authenticated"
		if !authenticated {
			return nil, fmt.Errorf("current user is unauthenticated")
		}

		// Cognito User Pool
		provider := mctx.Request.RequestContext.Identity.CognitoAuthenticationProvider
		userPoolID := "us-west-2_u1L3OQa8W" //TODO(cazinge): Use environment variables here.
		cognitoUserPoolPrefix := fmt.Sprintf("cognito-idp.us-west-2.amazonaws.com/%v,cognito-idp.us-west-2.amazonaws.com/%v:CognitoSignIn:", userPoolID, userPoolID)
		if strings.HasPrefix(provider, cognitoUserPoolPrefix) {
			cognitoUserPoolSub := strings.TrimPrefix(provider, cognitoUserPoolPrefix)
			fmt.Println(cognitoUserPoolSub)
			user, err := models.FindUserByIdentityCredential("CognitoUserPool", cognitoUserPoolSub, mctx.DB)
			if err != nil {
				fmt.Println(err)
				return nil, err
			}
			return user, nil
		}

		return nil, nil
	},
}

var LinkedUserMethods = UserMethods{
	GetCurrentUser: gqltag.LinkQuery(getCurrentUser),
}
