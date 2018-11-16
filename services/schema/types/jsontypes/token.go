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
	Fields:      &jsonmodels.Token{},
}

var LinkedTokenTypes = TokenTypes{
	Token:      gqltag.LinkOutput(tokenType),
	TokenInput: gqltag.LinkInput(tokenType),
}
