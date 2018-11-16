package jsontypes

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models/jsonmodels"
)

type RollFilterTypes struct {
	RollFilter      *gqltag.Output `gql:"RollFilter"`
	RollFilterInput *gqltag.Input  `gql:"RollFilterInput"`
}

var rollFilterType = gqltag.Type{
	Description: `[RollFilter Description Goes Here]`,
	Fields:      &jsonmodels.RollFilter{},
}

var LinkedRollFilterTypes = RollFilterTypes{
	RollFilter:      gqltag.LinkOutput(rollFilterType),
	RollFilterInput: gqltag.LinkInput(rollFilterType),
}
