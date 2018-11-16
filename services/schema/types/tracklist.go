package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type TracklistTypes struct {
	Tracklist      *gqltag.Output `gql:"Tracklist"`
	TracklistInput *gqltag.Input  `gql:"TracklistInput"`
}

var tracklistType = gqltag.Type{
	Description: `[Tracklist Type Description Goes Here]`,
	Fields:      &models.Tracklist{},
}

var tracklistInputType = gqltag.Type{
	Description: `[Tracklist Input Type Description Goes Here]`,
	Fields:      &models.TracklistInput{},
}

var LinkedTracklistTypes = TracklistTypes{
	Tracklist:      gqltag.LinkOutput(tracklistType),
	TracklistInput: gqltag.LinkInput(tracklistInputType),
}
