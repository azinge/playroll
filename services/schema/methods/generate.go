package methods

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type GenerateMethods struct {
	GetTracklistSongs *gqltag.Query    `gql:"tracklistSongs(tracklistID: ID): [MusicSource]"`
	GenerateTracklist *gqltag.Mutation `gql:"generateTracklist(playrollID: ID): Tracklist"`
}

var generateTracklist = gqltag.Method{
	Description: `[Generate Tracklist Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		return nil, nil
	},
}

var getTracklistSongs = gqltag.Method{
	Description: `[Get Tracklist Songs Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		return nil, nil
	},
}

var LinkedGenerateMethods = GenerateMethods{
	GetTracklistSongs: gqltag.LinkQuery(getTracklistSongs),
	GenerateTracklist: gqltag.LinkMutation(generateTracklist),
}
