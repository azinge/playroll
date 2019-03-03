package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type MusicServicePlaylistTypes struct {
	MusicServicePlaylist      *gqltag.Output `gql:"MusicServicePlaylist"`
	MusicServicePlaylistInput *gqltag.Input  `gql:"MusicServicePlaylistInput"`
}

var MusicServicePlaylistType = gqltag.Type{
	Description: `[MusicServicePlaylist Type Description Goes Here]`,
	Fields:      &models.MusicServicePlaylistOutput{},
}

var MusicServicePlaylistInputType = gqltag.Type{
	Description: `[MusicServicePlaylist Input Type Description Goes Here]`,
	Fields:      &models.MusicServicePlaylistInput{},
}

var LinkedMusicServicePlaylistTypes = MusicServicePlaylistTypes{
	MusicServicePlaylist:      gqltag.LinkOutput(MusicServicePlaylistType),
	MusicServicePlaylistInput: gqltag.LinkInput(MusicServicePlaylistInputType),
}
