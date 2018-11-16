package jsontypes

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models/jsonmodels"
)

type MusicSourceTypes struct {
	MusicSource      *gqltag.Output `gql:"MusicSource"`
	MusicSourceInput *gqltag.Input  `gql:"MusicSourceInput"`
}

var musicSourceType = gqltag.Type{
	Description: `[MusicSource Type Description Goes Here]`,
	Fields:      &jsonmodels.MusicSource{},
}

var LinkedMusicSourceTypes = MusicSourceTypes{
	MusicSource:      gqltag.LinkOutput(musicSourceType),
	MusicSourceInput: gqltag.LinkInput(musicSourceType),
}
