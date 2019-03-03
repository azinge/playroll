package admin

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type RelationshipMethods struct {
	GetRelationship    *gqltag.Query    `gql:"relationship(id: ID!): Relationship"`
	ListRelationships  *gqltag.Query    `gql:"listRelationships(offset: Int, count: Int): [Relationship]"`
	CreateRelationship *gqltag.Mutation `gql:"createRelationship(input: RelationshipInput!): Relationship"`
	UpdateRelationship *gqltag.Mutation `gql:"updateRelationship(id: ID!, input: RelationshipInput!): Relationship"`
	DeleteRelationship *gqltag.Mutation `gql:"deleteRelationship(id: ID!): Relationship"`
}

var getRelationship = gqltag.Method{
	Description: `[Get Relationship Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.Relationship{}),
}

var listRelationships = gqltag.Method{
	Description: `[List Relationships Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.Relationship{}),
}

var createRelationship = gqltag.Method{
	Description: `[Create Relationship Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.Relationship{}, &models.RelationshipInput{}),
}

var updateRelationship = gqltag.Method{
	Description: `[Update Relationship Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.Relationship{}, &models.RelationshipInput{}),
}

var deleteRelationship = gqltag.Method{
	Description: `[Delete Relationship Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.Relationship{}),
}

var LinkedRelationshipMethods = RelationshipMethods{
	GetRelationship:    gqltag.LinkQuery(getRelationship),
	ListRelationships:  gqltag.LinkQuery(listRelationships),
	CreateRelationship: gqltag.LinkMutation(createRelationship),
	UpdateRelationship: gqltag.LinkMutation(updateRelationship),
	DeleteRelationship: gqltag.LinkMutation(deleteRelationship),
}
