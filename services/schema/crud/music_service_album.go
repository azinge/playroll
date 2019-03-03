package crud

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type MusicServiceAlbumMethods struct {
	GetMusicServiceAlbum    *gqltag.Query    `gql:"musicServiceAlbum(id: ID!): MusicServiceAlbum"`
	ListMusicServiceAlbums  *gqltag.Query    `gql:"listMusicServiceAlbums(offset: Int, count: Int): [MusicServiceAlbum]"`
	CreateMusicServiceAlbum *gqltag.Mutation `gql:"createMusicServiceAlbum(input: MusicServiceAlbumInput!): MusicServiceAlbum"`
	UpdateMusicServiceAlbum *gqltag.Mutation `gql:"updateMusicServiceAlbum(id: ID!, input: MusicServiceAlbumInput!): MusicServiceAlbum"`
	DeleteMusicServiceAlbum *gqltag.Mutation `gql:"deleteMusicServiceAlbum(id: ID!): MusicServiceAlbum"`
}

var getMusicServiceAlbum = gqltag.Method{
	Description: `[Get MusicServiceAlbum Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.MusicServiceAlbum{}),
}

var listMusicServiceAlbums = gqltag.Method{
	Description: `[List MusicServiceAlbums Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.MusicServiceAlbum{}),
}

var createMusicServiceAlbum = gqltag.Method{
	Description: `[Create MusicServiceAlbum Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.MusicServiceAlbum{}, &models.MusicServiceAlbumInput{}),
}

var updateMusicServiceAlbum = gqltag.Method{
	Description: `[Update MusicServiceAlbum Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.MusicServiceAlbum{}, &models.MusicServiceAlbumInput{}),
}

var deleteMusicServiceAlbum = gqltag.Method{
	Description: `[Delete MusicServiceAlbum Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.MusicServiceAlbum{}),
}

var LinkedMusicServiceAlbumMethods = MusicServiceAlbumMethods{
	GetMusicServiceAlbum:    gqltag.LinkQuery(getMusicServiceAlbum),
	ListMusicServiceAlbums:  gqltag.LinkQuery(listMusicServiceAlbums),
	CreateMusicServiceAlbum: gqltag.LinkMutation(createMusicServiceAlbum),
	UpdateMusicServiceAlbum: gqltag.LinkMutation(updateMusicServiceAlbum),
	DeleteMusicServiceAlbum: gqltag.LinkMutation(deleteMusicServiceAlbum),
}
