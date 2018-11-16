package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type PlayrollTypes struct {
	Playroll      *gqltag.Output `gql:"Playroll"`
	PlayrollInput *gqltag.Input  `gql:"PlayrollInput"`
}

var playrollType = gqltag.Type{
	Description: `[Playroll Type Description Goes Here]`,
	Fields:      &models.PlayrollOutput{},
}

var playrollInputType = gqltag.Type{
	Description: `[Playroll Input Type Description Goes Here]`,
	Fields:      &models.PlayrollInput{},
}

var LinkedPlayrollTypes = PlayrollTypes{
	Playroll:      gqltag.LinkOutput(playrollType),
	PlayrollInput: gqltag.LinkInput(playrollInputType),
}
