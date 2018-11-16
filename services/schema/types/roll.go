package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type RollTypes struct {
	Roll      *gqltag.Output `gql:"Roll"`
	RollInput *gqltag.Input  `gql:"RollInput"`
}

var rollType = gqltag.Type{
	Description: `[Roll Type Description Goes Here]`,
	Fields:      &models.RollOutput{},
}

var rollInputType = gqltag.Type{
	Description: `[Roll Input Type Description Goes Here]`,
	Fields:      &models.RollInput{},
}

var LinkedRollTypes = RollTypes{
	Roll:      gqltag.LinkOutput(rollType),
	RollInput: gqltag.LinkInput(rollInputType),
}
