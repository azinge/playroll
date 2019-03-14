package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type ExternalCredentialTypes struct {
	ExternalCredential      *gqltag.Output `gql:"ExternalCredential"`
	ExternalCredentialInput *gqltag.Input  `gql:"ExternalCredentialInput"`
}

var externalCredentialType = gqltag.Type{
	Description: `[ExternalCredential Type Description Goes Here]`,
	Fields:      &models.ExternalCredentialOutput{},
}

var externalCredentialInputType = gqltag.Type{
	Description: `[ExternalCredential Input Type Description Goes Here]`,
	Fields:      &models.ExternalCredentialInput{},
}

var LinkedExternalCredentialTypes = ExternalCredentialTypes{
	ExternalCredential:      gqltag.LinkOutput(externalCredentialType),
	ExternalCredentialInput: gqltag.LinkInput(externalCredentialInputType),
}
