package crud

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type MusicServiceTrackMethods struct {
	GetMusicServiceTrack    *gqltag.Query    `gql:"musicServiceTrack(id: ID!): MusicServiceTrack"`
	ListMusicServiceTracks  *gqltag.Query    `gql:"listMusicServiceTracks(offset: Int, count: Int): [MusicServiceTrack]"`
	CreateMusicServiceTrack *gqltag.Mutation `gql:"createMusicServiceTrack(input: MusicServiceTrackInput!): MusicServiceTrack"`
	UpdateMusicServiceTrack *gqltag.Mutation `gql:"updateMusicServiceTrack(id: ID!, input: MusicServiceTrackInput!): MusicServiceTrack"`
	DeleteMusicServiceTrack *gqltag.Mutation `gql:"deleteMusicServiceTrack(id: ID!): MusicServiceTrack"`
}

var getMusicServiceTrack = gqltag.Method{
	Description: `[Get MusicServiceTrack Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.MusicServiceTrack{}),
}

var listMusicServiceTracks = gqltag.Method{
	Description: `[List MusicServiceTracks Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.MusicServiceTrack{}),
}

var createMusicServiceTrack = gqltag.Method{
	Description: `[Create MusicServiceTrack Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.MusicServiceTrack{}, &models.MusicServiceTrackInput{}),
}

var updateMusicServiceTrack = gqltag.Method{
	Description: `[Update MusicServiceTrack Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.MusicServiceTrack{}, &models.MusicServiceTrackInput{}),
}

var deleteMusicServiceTrack = gqltag.Method{
	Description: `[Delete MusicServiceTrack Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.MusicServiceTrack{}),
}

var LinkedMusicServiceTrackMethods = MusicServiceTrackMethods{
	GetMusicServiceTrack:    gqltag.LinkQuery(getMusicServiceTrack),
	ListMusicServiceTracks:  gqltag.LinkQuery(listMusicServiceTracks),
	CreateMusicServiceTrack: gqltag.LinkMutation(createMusicServiceTrack),
	UpdateMusicServiceTrack: gqltag.LinkMutation(updateMusicServiceTrack),
	DeleteMusicServiceTrack: gqltag.LinkMutation(deleteMusicServiceTrack),
}
