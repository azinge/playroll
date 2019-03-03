package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type MusicServiceTrackTypes struct {
	MusicServiceTrack      *gqltag.Output `gql:"MusicServiceTrack"`
	MusicServiceTrackInput *gqltag.Input  `gql:"MusicServiceTrackInput"`
}

var MusicServiceTrackType = gqltag.Type{
	Description: `[MusicServiceTrack Type Description Goes Here]`,
	Fields:      &models.MusicServiceTrackOutput{},
}

var MusicServiceTrackInputType = gqltag.Type{
	Description: `[MusicServiceTrack Input Type Description Goes Here]`,
	Fields:      &models.MusicServiceTrackInput{},
}

var LinkedMusicServiceTrackTypes = MusicServiceTrackTypes{
	MusicServiceTrack:      gqltag.LinkOutput(MusicServiceTrackType),
	MusicServiceTrackInput: gqltag.LinkInput(MusicServiceTrackInputType),
}
