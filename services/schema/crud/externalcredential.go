package crud

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/utils"
	"github.com/mitchellh/mapstructure"

	"github.com/cazinge/playroll/services/models"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type ExternalCredentialMethods struct {
	GetExternalCredential    *gqltag.Query    `gql:"externalCredential(id: ID!): ExternalCredential"`
	ListExternalCredentials  *gqltag.Query    `gql:"listExternalCredentials(offset: Int, count: Int): [ExternalCredential]"`
	CreateExternalCredential *gqltag.Mutation `gql:"createExternalCredential(input: ExternalCredentialInput!): ExternalCredential"`
	UpdateExternalCredential *gqltag.Mutation `gql:"updateExternalCredential(id: ID!, input: ExternalCredentialInput!): ExternalCredential"`
	DeleteExternalCredential *gqltag.Mutation `gql:"deleteExternalCredential(id: ID!): ExternalCredential"`
}

func initExternalCredential(db *gorm.DB) *models.ExternalCredential {
	externalCredential := &models.ExternalCredential{}
	externalCredential.SetEntity(externalCredential)
	externalCredential.SetDB(db)
	return externalCredential
}

var getExternalCredential = gqltag.Method{
	Description: `[Get ExternalCredential Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		ec := initExternalCredential(db)
		type getExternalCredentialParams struct {
			ID string
		}

		params := &getExternalCredentialParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)
		return ec.Get(id)
	},
}

var listExternalCredentials = gqltag.Method{
	Description: `[List ExternalCredentials Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		ec := initExternalCredential(db)
		type listExternalCredentialsParams struct {
			Offset uint
			Count  uint
		}

		params := &listExternalCredentialsParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		return ec.List()
	},
}

var createExternalCredential = gqltag.Method{
	Description: `[Create ExternalCredential Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		ec := initExternalCredential(db)
		type createExternalCredentialParams struct {
			Input models.ExternalCredentialInput
		}

		params := &createExternalCredentialParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		externalCredential := params.Input.CreateExternalCredentialFromInputFields()
		return ec.Create(externalCredential)
	},
}

var updateExternalCredential = gqltag.Method{
	Description: `[Update ExternalCredential Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		ec := initExternalCredential(db)
		type updateExternalCredentialParams struct {
			ID    string
			Input models.ExternalCredentialInput
		}

		params := &updateExternalCredentialParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		externalCredential := params.Input.CreateExternalCredentialFromInputFields()
		externalCredential.ID = utils.StringIDToNumber(params.ID)
		return ec.Update(externalCredential)
	},
}

var deleteExternalCredential = gqltag.Method{
	Description: `[Delete ExternalCredential Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		ec := initExternalCredential(db)
		type deleteExternalCredentialParams struct {
			ID string
		}

		params := &deleteExternalCredentialParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)
		return ec.Delete(id)
	},
}

var LinkedExternalCredentialMethods = ExternalCredentialMethods{
	GetExternalCredential:    gqltag.LinkQuery(getExternalCredential),
	ListExternalCredentials:  gqltag.LinkQuery(listExternalCredentials),
	CreateExternalCredential: gqltag.LinkMutation(createExternalCredential),
	UpdateExternalCredential: gqltag.LinkMutation(updateExternalCredential),
	DeleteExternalCredential: gqltag.LinkMutation(deleteExternalCredential),
}
