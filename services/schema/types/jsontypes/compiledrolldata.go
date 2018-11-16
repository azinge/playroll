package jsontypes

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models/jsonmodels"
)

type CompiledRollDataTypes struct {
	CompiledRollData      *gqltag.Output `gql:"CompiledRollData"`
	CompiledRollDataInput *gqltag.Input  `gql:"CompiledRollDataInput"`
}

var compiledRollDataType = gqltag.Type{
	Description: `[CompiledRollData Description Goes Here]`,
	Fields:      &jsonmodels.CompiledRollDataOutput{},
}

var compiledRollDataInputType = gqltag.Type{
	Description: `[CompiledRollDataInput Description Goes Here]`,
	Fields:      &jsonmodels.CompiledRollDataInput{},
}

var LinkedCompiledRollDataTypes = CompiledRollDataTypes{
	CompiledRollData:      gqltag.LinkOutput(compiledRollDataType),
	CompiledRollDataInput: gqltag.LinkInput(compiledRollDataInputType),
}
