package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type MusicServiceCredentialTypes struct {
	MusicServiceCredential      *gqltag.Output `gql:"MusicServiceCredential"`
	MusicServiceCredentialInput *gqltag.Input  `gql:"MusicServiceCredentialInput"`
}

var musicServiceCredentialType = gqltag.Type{
	Description: `[MusicServiceCredential Type Description Goes Here]`,
	Fields:      &models.MusicServiceCredentialOutput{},
}

var musicServiceCredentialInputType = gqltag.Type{
	Description: `[MusicServiceCredential Input Type Description Goes Here]`,
	Fields:      &models.MusicServiceCredentialInput{},
}

var LinkedMusicServiceCredentialTypes = MusicServiceCredentialTypes{
	MusicServiceCredential:      gqltag.LinkOutput(musicServiceCredentialType),
	MusicServiceCredentialInput: gqltag.LinkInput(musicServiceCredentialInputType),
}
