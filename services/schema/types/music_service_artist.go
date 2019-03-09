package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type MusicServiceArtistTypes struct {
	MusicServiceArtist      *gqltag.Output `gql:"MusicServiceArtist"`
	MusicServiceArtistInput *gqltag.Input  `gql:"MusicServiceArtistInput"`
}

var musicServiceArtistType = gqltag.Type{
	Description: `[MusicServiceArtist Type Description Goes Here]`,
	Fields:      &models.MusicServiceArtistOutput{},
}

var musicServiceArtistInputType = gqltag.Type{
	Description: `[MusicServiceArtist Input Type Description Goes Here]`,
	Fields:      &models.MusicServiceArtistInput{},
}

var LinkedMusicServiceArtistTypes = MusicServiceArtistTypes{
	MusicServiceArtist:      gqltag.LinkOutput(musicServiceArtistType),
	MusicServiceArtistInput: gqltag.LinkInput(musicServiceArtistInputType),
}
