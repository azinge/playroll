package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type MusicServiceAlbumTypes struct {
	MusicServiceAlbum      *gqltag.Output `gql:"MusicServiceAlbum"`
	MusicServiceAlbumInput *gqltag.Input  `gql:"MusicServiceAlbumInput"`
}

var musicServiceAlbumType = gqltag.Type{
	Description: `[MusicServiceAlbum Type Description Goes Here]`,
	Fields:      &models.MusicServiceAlbumOutput{},
}

var musicServiceAlbumInputType = gqltag.Type{
	Description: `[MusicServiceAlbum Input Type Description Goes Here]`,
	Fields:      &models.MusicServiceAlbumInput{},
}

var LinkedMusicServiceAlbumTypes = MusicServiceAlbumTypes{
	MusicServiceAlbum:      gqltag.LinkOutput(musicServiceAlbumType),
	MusicServiceAlbumInput: gqltag.LinkInput(musicServiceAlbumInputType),
}
