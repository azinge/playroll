package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type IdentityCredentialTypes struct {
	IdentityCredential      *gqltag.Output `gql:"IdentityCredential"`
	IdentityCredentialInput *gqltag.Input  `gql:"IdentityCredentialInput"`
}

var identityCredentialType = gqltag.Type{
	Description: `[IdentityCredential Type Description Goes Here]`,
	Fields:      &models.IdentityCredentialOutput{},
}

var identityCredentialInputType = gqltag.Type{
	Description: `[IdentityCredential Input Type Description Goes Here]`,
	Fields:      &models.IdentityCredentialInput{},
}

var LinkedIdentityCredentialTypes = IdentityCredentialTypes{
	IdentityCredential:      gqltag.LinkOutput(identityCredentialType),
	IdentityCredentialInput: gqltag.LinkInput(identityCredentialInputType),
}
