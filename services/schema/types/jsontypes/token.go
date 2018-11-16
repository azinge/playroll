package jsontypes

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models/jsonmodels"
)

type TokenTypes struct {
	Token      *gqltag.Output `gql:"Token"`
	TokenInput *gqltag.Input  `gql:"TokenInput"`
}

var tokenType = gqltag.Type{
	Description: `[Token Description Goes Here]`,
	Fields:      &jsonmodels.TokenOutput{},
}

var tokenInputType = gqltag.Type{
	Description: `[TokenInput Description Goes Here]`,
	Fields:      &jsonmodels.TokenInput{},
}

var LinkedTokenTypes = TokenTypes{
	Token:      gqltag.LinkOutput(tokenType),
	TokenInput: gqltag.LinkInput(tokenInputType),
}
