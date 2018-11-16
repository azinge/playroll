package jsontypes

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models/jsonmodels"
)

type RollDataTypes struct {
	RollData      *gqltag.Output `gql:"RollData"`
	RollDataInput *gqltag.Input  `gql:"RollDataInput"`
}

var rollDataType = gqltag.Type{
	Description: `[RollData Description Goes Here]`,
	Fields:      &jsonmodels.RollData{},
}

var rollDataInputType = gqltag.Type{
	Description: `[RollDataInput Description Goes Here]`,
	Fields:      &jsonmodels.RollDataInput{},
}

var LinkedRollDataTypes = RollDataTypes{
	RollData:      gqltag.LinkOutput(rollDataType),
	RollDataInput: gqltag.LinkInput(rollDataInputType),
}
