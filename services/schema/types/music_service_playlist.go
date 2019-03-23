package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type MusicServicePlaylistTypes struct {
	MusicServicePlaylist      *gqltag.Output `gql:"MusicServicePlaylist"`
	MusicServicePlaylistInput *gqltag.Input  `gql:"MusicServicePlaylistInput"`
}

var musicServicePlaylistType = gqltag.Type{
	Description: `[MusicServicePlaylist Type Description Goes Here]`,
	Fields:      &models.MusicServicePlaylistOutput{},
}

var musicServicePlaylistInputType = gqltag.Type{
	Description: `[MusicServicePlaylist Input Type Description Goes Here]`,
	Fields:      &models.MusicServicePlaylistInput{},
}

var LinkedMusicServicePlaylistTypes = MusicServicePlaylistTypes{
	MusicServicePlaylist:      gqltag.LinkOutput(musicServicePlaylistType),
	MusicServicePlaylistInput: gqltag.LinkInput(musicServicePlaylistInputType),
}
