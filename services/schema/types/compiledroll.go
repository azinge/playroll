package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type CompiledRollTypes struct {
	CompiledRoll      *gqltag.Output `gql:"CompiledRoll"`
	CompiledRollInput *gqltag.Input  `gql:"CompiledRollInput"`
}

var compiledRollType = gqltag.Type{
	Description: `[CompiledRoll Type Description Goes Here]`,
	Fields:      &models.CompiledRoll{},
}

var compiledRollInputType = gqltag.Type{
	Description: `[CompiledRoll Input Type Description Goes Here]`,
	Fields:      &models.CompiledRollInput{},
}

var LinkedCompiledRollTypes = CompiledRollTypes{
	CompiledRoll:      gqltag.LinkOutput(compiledRollType),
	CompiledRollInput: gqltag.LinkInput(compiledRollInputType),
}
