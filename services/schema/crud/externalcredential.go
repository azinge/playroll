package crud

import (
	"github.com/cazinge/playroll/services/gqltag"

	"github.com/cazinge/playroll/services/models"
)

type ExternalCredentialMethods struct {
	GetExternalCredential    *gqltag.Query    `gql:"externalCredential(id: ID!): ExternalCredential"`
	ListExternalCredentials  *gqltag.Query    `gql:"listExternalCredentials(offset: Int, count: Int): [ExternalCredential]"`
	CreateExternalCredential *gqltag.Mutation `gql:"createExternalCredential(input: ExternalCredentialInput!): ExternalCredential"`
	UpdateExternalCredential *gqltag.Mutation `gql:"updateExternalCredential(id: ID!, input: ExternalCredentialInput!): ExternalCredential"`
	DeleteExternalCredential *gqltag.Mutation `gql:"deleteExternalCredential(id: ID!): ExternalCredential"`
}

var getExternalCredential = gqltag.Method{
	Description: `[Get ExternalCredential Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.ExternalCredential{}),
}

var listExternalCredentials = gqltag.Method{
	Description: `[List ExternalCredentials Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.ExternalCredential{}),
}

var createExternalCredential = gqltag.Method{
	Description: `[Create ExternalCredential Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.ExternalCredential{}, &models.ExternalCredentialInput{}),
}

var updateExternalCredential = gqltag.Method{
	Description: `[Update ExternalCredential Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.ExternalCredential{}, &models.ExternalCredentialInput{}),
}

var deleteExternalCredential = gqltag.Method{
	Description: `[Delete ExternalCredential Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.ExternalCredential{}),
}

var LinkedExternalCredentialMethods = ExternalCredentialMethods{
	GetExternalCredential:    gqltag.LinkQuery(getExternalCredential),
	ListExternalCredentials:  gqltag.LinkQuery(listExternalCredentials),
	CreateExternalCredential: gqltag.LinkMutation(createExternalCredential),
	UpdateExternalCredential: gqltag.LinkMutation(updateExternalCredential),
	DeleteExternalCredential: gqltag.LinkMutation(deleteExternalCredential),
}
