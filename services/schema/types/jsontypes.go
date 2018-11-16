package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/models/jsonmodels"
)

type JsonTypes struct {
	RollFilter       *gqltag.Output `gql:"RollFilter"`
	MusicSource      *gqltag.Output `gql:"MusicSource"`
	RollLength       *gqltag.Output `gql:"RollLength"`
	Token            *gqltag.Output `gql:"Token"`
	RollData         *gqltag.Output `gql:"RollData"`
	CompiledRollData *gqltag.Output `gql:"CompiledRollData"`

	MusicSourceInput      *gqltag.Input `gql:"MusicSourceInput"`
	RollFilterInput       *gqltag.Input `gql:"RollFilterInput"`
	RollLengthInput       *gqltag.Input `gql:"RollLengthInput"`
	TokenInput            *gqltag.Input `gql:"TokenInput"`
	RollDataInput         *gqltag.Input `gql:"RollDataInput"`
	CompiledRollDataInput *gqltag.Input `gql:"CompiledRollDataInput"`
}

var musicSourceType = gqltag.Type{
	Description: `[MusicSource Type Description Goes Here]`,
	Fields:      &jsonmodels.MusicSource{},
}

var rollFilterType = gqltag.Type{
	Description: `[RollFilter Description Goes Here]`,
	Fields:      &jsonmodels.RollFilter{},
}

var rollLengthType = gqltag.Type{
	Description: `[RollLength Description Goes Here]`,
	Fields:      &jsonmodels.RollLength{},
}

var rollDataType = gqltag.Type{
	Description: `[RollData Description Goes Here]`,
	Fields:      &jsonmodels.RollData{},
}

var rollDataInputType = gqltag.Type{
	Description: `[RollDataInput Description Goes Here]`,
	Fields:      &jsonmodels.RollDataInput{},
}

var compiledRollDataType = gqltag.Type{
	Description: `[CompiledRollData Description Goes Here]`,
	Fields:      &jsonmodels.CompiledRollDataOutput{},
}

var compiledRollDataInputType = gqltag.Type{
	Description: `[CompiledRollDataInput Description Goes Here]`,
	Fields:      &jsonmodels.CompiledRollDataInput{},
}

var tokenType = gqltag.Type{
	Description: `[Token Description Goes Here]`,
	Fields:      &models.Token{},
}

var LinkedJsonTypes = JsonTypes{
	MusicSource:      gqltag.LinkOutput(musicSourceType),
	RollFilter:       gqltag.LinkOutput(rollFilterType),
	RollLength:       gqltag.LinkOutput(rollLengthType),
	Token:            gqltag.LinkOutput(tokenType),
	RollData:         gqltag.LinkOutput(rollDataType),
	CompiledRollData: gqltag.LinkOutput(compiledRollDataType),

	MusicSourceInput:      gqltag.LinkInput(musicSourceType),
	RollFilterInput:       gqltag.LinkInput(rollFilterType),
	RollLengthInput:       gqltag.LinkInput(rollLengthType),
	TokenInput:            gqltag.LinkInput(tokenType),
	RollDataInput:         gqltag.LinkInput(rollDataInputType),
	CompiledRollDataInput: gqltag.LinkInput(compiledRollDataInputType),
}
