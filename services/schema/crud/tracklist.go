package crud

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/utils"
	"github.com/mitchellh/mapstructure"

	"github.com/cazinge/playroll/services/models"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type TracklistMethods struct {
	GetTracklist    *gqltag.Query    `gql:"tracklist(id: ID!): Tracklist"`
	ListTracklists  *gqltag.Query    `gql:"listTracklists(offset: Int, count: Int): [Tracklist]"`
	CreateTracklist *gqltag.Mutation `gql:"createTracklist(input: TracklistInput!): Tracklist"`
	UpdateTracklist *gqltag.Mutation `gql:"updateTracklist(id: ID!, input: TracklistInput!): Tracklist"`
	DeleteTracklist *gqltag.Mutation `gql:"deleteTracklist(id: ID!): Tracklist"`
}

func initTracklist(db *gorm.DB) *models.Tracklist {
	tracklist := &models.Tracklist{}
	tracklist.SetEntity(tracklist)
	tracklist.SetDB(db)
	return tracklist
}

var getTracklist = gqltag.Method{
	Description: `[Get Tracklist Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		t := initTracklist(db)
		type getTracklistParams struct {
			ID string
		}

		params := &getTracklistParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)
		return t.Get(id)
	},
}

var listTracklists = gqltag.Method{
	Description: `[List Tracklists Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		t := initTracklist(db)
		type listTracklistsParams struct {
			Offset uint
			Count  uint
		}

		params := &listTracklistsParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		return t.List()
	},
}

var createTracklist = gqltag.Method{
	Description: `[Create Tracklist Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		t := initTracklist(db)
		type createTracklistParams struct {
			Input models.TracklistInput
		}

		params := &createTracklistParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		tracklist := params.Input.CreateTracklistFromInputFields()
		return t.Create(tracklist)
	},
}

var updateTracklist = gqltag.Method{
	Description: `[Update Tracklist Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		t := initTracklist(db)
		type updateTracklistParams struct {
			ID    string
			Input models.TracklistInput
		}

		params := &updateTracklistParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		tracklist := params.Input.CreateTracklistFromInputFields()
		tracklist.ID = utils.StringIDToNumber(params.ID)
		return t.Update(tracklist)
	},
}

var deleteTracklist = gqltag.Method{
	Description: `[Delete Tracklist Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		t := initTracklist(db)
		type deleteTracklistParams struct {
			ID string
		}

		params := &deleteTracklistParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)
		return t.Delete(id)
	},
}

var LinkedTracklistMethods = TracklistMethods{
	GetTracklist:    gqltag.LinkQuery(getTracklist),
	ListTracklists:  gqltag.LinkQuery(listTracklists),
	CreateTracklist: gqltag.LinkMutation(createTracklist),
	UpdateTracklist: gqltag.LinkMutation(updateTracklist),
	DeleteTracklist: gqltag.LinkMutation(deleteTracklist),
}
