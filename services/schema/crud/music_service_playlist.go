package crud

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type MusicServicePlaylistMethods struct {
	GetMusicServicePlaylist    *gqltag.Query    `gql:"musicServicePlaylist(id: ID!): MusicServicePlaylist"`
	ListMusicServicePlaylists  *gqltag.Query    `gql:"listMusicServicePlaylists(offset: Int, count: Int): [MusicServicePlaylist]"`
	CreateMusicServicePlaylist *gqltag.Mutation `gql:"createMusicServicePlaylist(input: MusicServicePlaylistInput!): MusicServicePlaylist"`
	UpdateMusicServicePlaylist *gqltag.Mutation `gql:"updateMusicServicePlaylist(id: ID!, input: MusicServicePlaylistInput!): MusicServicePlaylist"`
	DeleteMusicServicePlaylist *gqltag.Mutation `gql:"deleteMusicServicePlaylist(id: ID!): MusicServicePlaylist"`
}

var getMusicServicePlaylist = gqltag.Method{
	Description: `[Get MusicServicePlaylist Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.MusicServicePlaylist{}),
}

var listMusicServicePlaylists = gqltag.Method{
	Description: `[List MusicServicePlaylists Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.MusicServicePlaylist{}),
}

var createMusicServicePlaylist = gqltag.Method{
	Description: `[Create MusicServicePlaylist Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.MusicServicePlaylist{}, &models.MusicServicePlaylistInput{}),
}

var updateMusicServicePlaylist = gqltag.Method{
	Description: `[Update MusicServicePlaylist Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.MusicServicePlaylist{}, &models.MusicServicePlaylistInput{}),
}

var deleteMusicServicePlaylist = gqltag.Method{
	Description: `[Delete MusicServicePlaylist Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.MusicServicePlaylist{}),
}

var LinkedMusicServicePlaylistMethods = MusicServicePlaylistMethods{
	GetMusicServicePlaylist:    gqltag.LinkQuery(getMusicServicePlaylist),
	ListMusicServicePlaylists:  gqltag.LinkQuery(listMusicServicePlaylists),
	CreateMusicServicePlaylist: gqltag.LinkMutation(createMusicServicePlaylist),
	UpdateMusicServicePlaylist: gqltag.LinkMutation(updateMusicServicePlaylist),
	DeleteMusicServicePlaylist: gqltag.LinkMutation(deleteMusicServicePlaylist),
}
