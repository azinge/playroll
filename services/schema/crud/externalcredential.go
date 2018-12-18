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

var getExternalCredential = gqltag.Method{
	Description: `[Get ExternalCredential Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		ec := models.InitExternalCredentialDAO(db)
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

		rawExternalCredential, err := ec.Get(id)
		if err != nil {
			return nil, err
		}
		return models.FormatExternalCredential(rawExternalCredential)
	},
}

var listExternalCredentials = gqltag.Method{
	Description: `[List ExternalCredentials Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		ec := models.InitExternalCredentialDAO(db)
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

		rawExternalCredential, err := ec.List()
		if err != nil {
			return nil, err
		}
		return models.FormatExternalCredentialSlice(rawExternalCredential)
	},
}

var createExternalCredential = gqltag.Method{
	Description: `[Create ExternalCredential Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		ec := models.InitExternalCredentialDAO(db)
		type createExternalCredentialParams struct {
			Input models.ExternalCredentialInput
		}

		params := &createExternalCredentialParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		externalCredential, err := params.Input.ToModel()
		if err != nil {
			return nil, err
		}

		rawExternalCredential, err := ec.Create(externalCredential)
		if err != nil {
			return nil, err
		}
		return models.FormatExternalCredential(rawExternalCredential)
	},
}

var updateExternalCredential = gqltag.Method{
	Description: `[Update ExternalCredential Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		ec := models.InitExternalCredentialDAO(db)
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

		externalCredential, err := params.Input.ToModel()
		if err != nil {
			return nil, err
		}
		externalCredential.ID = utils.StringIDToNumber(params.ID)

		rawExternalCredential, err := ec.Update(externalCredential)
		if err != nil {
			return nil, err
		}
		return models.FormatExternalCredential(rawExternalCredential)
	},
}

var deleteExternalCredential = gqltag.Method{
	Description: `[Delete ExternalCredential Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		ec := models.InitExternalCredentialDAO(db)
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

		rawExternalCredential, err := ec.Delete(id)
		if err != nil {
			return nil, err
		}
		return models.FormatExternalCredential(rawExternalCredential)
	},
}

var LinkedExternalCredentialMethods = ExternalCredentialMethods{
	GetExternalCredential:    gqltag.LinkQuery(getExternalCredential),
	ListExternalCredentials:  gqltag.LinkQuery(listExternalCredentials),
	CreateExternalCredential: gqltag.LinkMutation(createExternalCredential),
	UpdateExternalCredential: gqltag.LinkMutation(updateExternalCredential),
	DeleteExternalCredential: gqltag.LinkMutation(deleteExternalCredential),
}
