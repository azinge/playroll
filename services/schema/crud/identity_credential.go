package crud

import (
	"github.com/cazinge/playroll/services/gqltag"

	"github.com/cazinge/playroll/services/models"
)

type IdentityCredentialMethods struct {
	GetIdentityCredential    *gqltag.Query    `gql:"identityCredential(id: ID!): IdentityCredential"`
	ListIdentityCredentials  *gqltag.Query    `gql:"listIdentityCredentials(offset: Int, count: Int): [IdentityCredential]"`
	CreateIdentityCredential *gqltag.Mutation `gql:"createIdentityCredential(input: IdentityCredentialInput!): IdentityCredential"`
	UpdateIdentityCredential *gqltag.Mutation `gql:"updateIdentityCredential(id: ID!, input: IdentityCredentialInput!): IdentityCredential"`
	DeleteIdentityCredential *gqltag.Mutation `gql:"deleteIdentityCredential(id: ID!): IdentityCredential"`
}

var getIdentityCredential = gqltag.Method{
	Description: `[Get IdentityCredential Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.IdentityCredential{}),
}

var listIdentityCredentials = gqltag.Method{
	Description: `[List IdentityCredentials Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.IdentityCredential{}),
}

var createIdentityCredential = gqltag.Method{
	Description: `[Create IdentityCredential Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.IdentityCredential{}, &models.IdentityCredentialInput{}),
}

var updateIdentityCredential = gqltag.Method{
	Description: `[Update IdentityCredential Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.IdentityCredential{}, &models.IdentityCredentialInput{}),
}

var deleteIdentityCredential = gqltag.Method{
	Description: `[Delete IdentityCredential Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.IdentityCredential{}),
}

var LinkedIdentityCredentialMethods = IdentityCredentialMethods{
	GetIdentityCredential:    gqltag.LinkQuery(getIdentityCredential),
	ListIdentityCredentials:  gqltag.LinkQuery(listIdentityCredentials),
	CreateIdentityCredential: gqltag.LinkMutation(createIdentityCredential),
	UpdateIdentityCredential: gqltag.LinkMutation(updateIdentityCredential),
	DeleteIdentityCredential: gqltag.LinkMutation(deleteIdentityCredential),
}
