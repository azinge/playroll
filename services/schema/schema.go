package schema

import (
	"github.com/cazinge/playroll/services/schema/crud"
	"github.com/cazinge/playroll/services/schema/methods"
	"github.com/cazinge/playroll/services/schema/types"
)

type Types = types.Types

var LinkedTypes = types.LinkedTypes

type Methods struct {
	crud.CRUDMethods       `gql:"GROUP"`
	methods.GeneralMethods `gql:"GROUP"`
}

var LinkedMethods = Methods{
	CRUDMethods:    crud.LinkedCRUDMethods,
	GeneralMethods: methods.LinkedGeneralMethods,
}
