package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type MusicServiceUserTypes struct {
	MusicServiceUser      *gqltag.Output `gql:"MusicServiceUser"`
	MusicServiceUserInput *gqltag.Input  `gql:"MusicServiceUserInput"`
}

var musicServiceUserType = gqltag.Type{
	Description: `[MusicServiceUser Type Description Goes Here]`,
	Fields:      &models.MusicServiceUserOutput{},
}

var musicServiceUserInputType = gqltag.Type{
	Description: `[MusicServiceUser Input Type Description Goes Here]`,
	Fields:      &models.MusicServiceUserInput{},
}

var LinkedMusicServiceUserTypes = MusicServiceUserTypes{
	MusicServiceUser:      gqltag.LinkOutput(musicServiceUserType),
	MusicServiceUserInput: gqltag.LinkInput(musicServiceUserInputType),
}
