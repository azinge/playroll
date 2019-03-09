package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type RelationshipTypes struct {
	Relationship      *gqltag.Output `gql:"Relationship"`
	RelationshipInput *gqltag.Input  `gql:"RelationshipInput"`
}

var relationshipType = gqltag.Type{
	Description: `[Relationship Type Description Goes Here]`,
	Fields:      &models.RelationshipOutput{},
}

var relationshipInputType = gqltag.Type{
	Description: `[Relationship Input Type Description Goes Here]`,
	Fields:      &models.RelationshipInput{},
}

var LinkedRelationshipTypes = RelationshipTypes{
	Relationship:      gqltag.LinkOutput(relationshipType),
	RelationshipInput: gqltag.LinkInput(relationshipInputType),
}
