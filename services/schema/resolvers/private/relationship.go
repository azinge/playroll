package private

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

// RelationshipMethods defines the types for all relationship methods.
type RelationshipMethods struct {
	ListRelationships *gqltag.Query `gql:"listRelationships(userID: ID): [User]"`
}

var listRelationships = gqltag.Method{
	Description: `Lists the current users relationships.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		type listRelationshipsParams struct {
			UserID string
		}
		params := &listRelationshipsParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		userID := utils.StringIDToNumber(params.UserID)

		users, err := models.GetRelationshipsByUserID(userID, mctx.DB)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		return *users, nil
	},
}

// LinkedRelationshipMethods links and makes available all methods stemming from the relationship entity.
var LinkedRelationshipMethods = RelationshipMethods{
	ListRelationships: gqltag.LinkQuery(listRelationships),
}
