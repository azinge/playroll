package jsontypes

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models/jsonmodels"
)

type RollLengthTypes struct {
	RollLength      *gqltag.Output `gql:"RollLength"`
	RollLengthInput *gqltag.Input  `gql:"RollLengthInput"`
}

var rollLengthType = gqltag.Type{
	Description: `[RollLength Description Goes Here]`,
	Fields:      &jsonmodels.RollLength{},
}

var LinkedRollLengthTypes = RollLengthTypes{
	RollLength:      gqltag.LinkOutput(rollLengthType),
	RollLengthInput: gqltag.LinkInput(rollLengthType),
}
