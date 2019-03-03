package admin

import (
	"github.com/cazinge/playroll/services/gqltag"

	"github.com/cazinge/playroll/services/models"
)

type MusicServiceCredentialMethods struct {
	GetMusicServiceCredential    *gqltag.Query    `gql:"musicServiceCredential(id: ID!): MusicServiceCredential"`
	ListMusicServiceCredentials  *gqltag.Query    `gql:"listMusicServiceCredentials(offset: Int, count: Int): [MusicServiceCredential]"`
	CreateMusicServiceCredential *gqltag.Mutation `gql:"createMusicServiceCredential(input: MusicServiceCredentialInput!): MusicServiceCredential"`
	UpdateMusicServiceCredential *gqltag.Mutation `gql:"updateMusicServiceCredential(id: ID!, input: MusicServiceCredentialInput!): MusicServiceCredential"`
	DeleteMusicServiceCredential *gqltag.Mutation `gql:"deleteMusicServiceCredential(id: ID!): MusicServiceCredential"`
}

var getMusicServiceCredential = gqltag.Method{
	Description: `[Get MusicServiceCredential Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.MusicServiceCredential{}),
}

var listMusicServiceCredentials = gqltag.Method{
	Description: `[List MusicServiceCredentials Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.MusicServiceCredential{}),
}

var createMusicServiceCredential = gqltag.Method{
	Description: `[Create MusicServiceCredential Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.MusicServiceCredential{}, &models.MusicServiceCredentialInput{}),
}

var updateMusicServiceCredential = gqltag.Method{
	Description: `[Update MusicServiceCredential Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.MusicServiceCredential{}, &models.MusicServiceCredentialInput{}),
}

var deleteMusicServiceCredential = gqltag.Method{
	Description: `[Delete MusicServiceCredential Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.MusicServiceCredential{}),
}

var LinkedMusicServiceCredentialMethods = MusicServiceCredentialMethods{
	GetMusicServiceCredential:    gqltag.LinkQuery(getMusicServiceCredential),
	ListMusicServiceCredentials:  gqltag.LinkQuery(listMusicServiceCredentials),
	CreateMusicServiceCredential: gqltag.LinkMutation(createMusicServiceCredential),
	UpdateMusicServiceCredential: gqltag.LinkMutation(updateMusicServiceCredential),
	DeleteMusicServiceCredential: gqltag.LinkMutation(deleteMusicServiceCredential),
}
