package crud

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type MusicServiceUserMethods struct {
	GetMusicServiceUser    *gqltag.Query    `gql:"musicServiceUser(id: ID!): MusicServiceUser"`
	ListMusicServiceUsers  *gqltag.Query    `gql:"listMusicServiceUsers(offset: Int, count: Int): [MusicServiceUser]"`
	CreateMusicServiceUser *gqltag.Mutation `gql:"createMusicServiceUser(input: MusicServiceUserInput!): MusicServiceUser"`
	UpdateMusicServiceUser *gqltag.Mutation `gql:"updateMusicServiceUser(id: ID!, input: MusicServiceUserInput!): MusicServiceUser"`
	DeleteMusicServiceUser *gqltag.Mutation `gql:"deleteMusicServiceUser(id: ID!): MusicServiceUser"`
}

var getMusicServiceUser = gqltag.Method{
	Description: `[Get MusicServiceUser Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.MusicServiceUser{}),
}

var listMusicServiceUsers = gqltag.Method{
	Description: `[List MusicServiceUsers Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.MusicServiceUser{}),
}

var createMusicServiceUser = gqltag.Method{
	Description: `[Create MusicServiceUser Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.MusicServiceUser{}, &models.MusicServiceUserInput{}),
}

var updateMusicServiceUser = gqltag.Method{
	Description: `[Update MusicServiceUser Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.MusicServiceUser{}, &models.MusicServiceUserInput{}),
}

var deleteMusicServiceUser = gqltag.Method{
	Description: `[Delete MusicServiceUser Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.MusicServiceUser{}),
}

var LinkedMusicServiceUserMethods = MusicServiceUserMethods{
	GetMusicServiceUser:    gqltag.LinkQuery(getMusicServiceUser),
	ListMusicServiceUsers:  gqltag.LinkQuery(listMusicServiceUsers),
	CreateMusicServiceUser: gqltag.LinkMutation(createMusicServiceUser),
	UpdateMusicServiceUser: gqltag.LinkMutation(updateMusicServiceUser),
	DeleteMusicServiceUser: gqltag.LinkMutation(deleteMusicServiceUser),
}
