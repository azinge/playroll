package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type <ENTITY_NAME_HERE>Types struct {
	<ENTITY_NAME_HERE>      *gqltag.Output `gql:"<ENTITY_NAME_HERE>"`
	<ENTITY_NAME_HERE>Input *gqltag.Input  `gql:"<ENTITY_NAME_HERE>Input"`
}

var <ENTITY_NAME_HERE>Type = gqltag.Type{
	Description: `[<ENTITY_NAME_HERE> Type Description Goes Here]`,
	Fields:      &models.<ENTITY_NAME_HERE>Output{},
}

var <ENTITY_NAME_HERE>InputType = gqltag.Type{
	Description: `[<ENTITY_NAME_HERE> Input Type Description Goes Here]`,
	Fields:      &models.<ENTITY_NAME_HERE>Input{},
}

var Linked<ENTITY_NAME_HERE>Types = <ENTITY_NAME_HERE>Types{
	<ENTITY_NAME_HERE>:      gqltag.LinkOutput(<ENTITY_NAME_HERE>Type),
	<ENTITY_NAME_HERE>Input: gqltag.LinkInput(<ENTITY_NAME_HERE>InputType),
}
