package admin

import (
	"github.com/cazinge/playroll/services/gqltag"

	"github.com/cazinge/playroll/services/models"
)

type TracklistMethods struct {
	GetTracklist    *gqltag.Query    `gql:"tracklist(id: ID!): Tracklist"`
	ListTracklists  *gqltag.Query    `gql:"listTracklists(offset: Int, count: Int): [Tracklist]"`
	CreateTracklist *gqltag.Mutation `gql:"createTracklist(input: TracklistInput!): Tracklist"`
	UpdateTracklist *gqltag.Mutation `gql:"updateTracklist(id: ID!, input: TracklistInput!): Tracklist"`
	DeleteTracklist *gqltag.Mutation `gql:"deleteTracklist(id: ID!): Tracklist"`
}

var getTracklist = gqltag.Method{
	Description: `[Get Tracklist Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.Tracklist{}),
}

var listTracklists = gqltag.Method{
	Description: `[List Tracklists Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.Tracklist{}),
}

var createTracklist = gqltag.Method{
	Description: `[Create Tracklist Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.Tracklist{}, &models.TracklistInput{}),
}

var updateTracklist = gqltag.Method{
	Description: `[Update Tracklist Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.Tracklist{}, &models.TracklistInput{}),
}

var deleteTracklist = gqltag.Method{
	Description: `[Delete Tracklist Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.Tracklist{}),
}

var LinkedTracklistMethods = TracklistMethods{
	GetTracklist:    gqltag.LinkQuery(getTracklist),
	ListTracklists:  gqltag.LinkQuery(listTracklists),
	CreateTracklist: gqltag.LinkMutation(createTracklist),
	UpdateTracklist: gqltag.LinkMutation(updateTracklist),
	DeleteTracklist: gqltag.LinkMutation(deleteTracklist),
}
