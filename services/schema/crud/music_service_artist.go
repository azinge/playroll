package crud

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type MusicServiceArtistMethods struct {
	GetMusicServiceArtist    *gqltag.Query    `gql:"musicServiceArtist(id: ID!): MusicServiceArtist"`
	ListMusicServiceArtists  *gqltag.Query    `gql:"listMusicServiceArtists(offset: Int, count: Int): [MusicServiceArtist]"`
	CreateMusicServiceArtist *gqltag.Mutation `gql:"createMusicServiceArtist(input: MusicServiceArtistInput!): MusicServiceArtist"`
	UpdateMusicServiceArtist *gqltag.Mutation `gql:"updateMusicServiceArtist(id: ID!, input: MusicServiceArtistInput!): MusicServiceArtist"`
	DeleteMusicServiceArtist *gqltag.Mutation `gql:"deleteMusicServiceArtist(id: ID!): MusicServiceArtist"`
}

var getMusicServiceArtist = gqltag.Method{
	Description: `[Get MusicServiceArtist Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.MusicServiceArtist{}),
}

var listMusicServiceArtists = gqltag.Method{
	Description: `[List MusicServiceArtists Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.MusicServiceArtist{}),
}

var createMusicServiceArtist = gqltag.Method{
	Description: `[Create MusicServiceArtist Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.MusicServiceArtist{}, &models.MusicServiceArtistInput{}),
}

var updateMusicServiceArtist = gqltag.Method{
	Description: `[Update MusicServiceArtist Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.MusicServiceArtist{}, &models.MusicServiceArtistInput{}),
}

var deleteMusicServiceArtist = gqltag.Method{
	Description: `[Delete MusicServiceArtist Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.MusicServiceArtist{}),
}

var LinkedMusicServiceArtistMethods = MusicServiceArtistMethods{
	GetMusicServiceArtist:    gqltag.LinkQuery(getMusicServiceArtist),
	ListMusicServiceArtists:  gqltag.LinkQuery(listMusicServiceArtists),
	CreateMusicServiceArtist: gqltag.LinkMutation(createMusicServiceArtist),
	UpdateMusicServiceArtist: gqltag.LinkMutation(updateMusicServiceArtist),
	DeleteMusicServiceArtist: gqltag.LinkMutation(deleteMusicServiceArtist),
}
