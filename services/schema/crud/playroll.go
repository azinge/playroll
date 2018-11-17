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

type PlayrollMethods struct {
	GetPlayroll    *gqltag.Query    `gql:"playroll(id: ID!): Playroll"`
	ListPlayrolls  *gqltag.Query    `gql:"listPlayrolls(offset: Int, count: Int): [Playroll]"`
	CreatePlayroll *gqltag.Mutation `gql:"createPlayroll(input: PlayrollInput!): Playroll"`
	UpdatePlayroll *gqltag.Mutation `gql:"updatePlayroll(id: ID!, input: PlayrollInput!): Playroll"`
	DeletePlayroll *gqltag.Mutation `gql:"deletePlayroll(id: ID!): Playroll"`
}

func initPlayroll(db *gorm.DB) *models.Playroll {
	playroll := &models.Playroll{}
	playroll.SetEntity(playroll)
	playroll.SetDB(db.Preload("Rolls"))
	return playroll
}

func formatPlayroll(val interface{}, err error) (*models.PlayrollOutput, error) {
	if err != nil {
		return nil, err
	}
	p, ok := val.(*models.Playroll)
	if !ok {
		return nil, fmt.Errorf("error converting to Playroll")
	}
	return p.ToOutput()
}

func formatPlayrolls(val interface{}, err error) (*[]models.PlayrollOutput, error) {
	if err != nil {
		return nil, err
	}
	ps, ok := val.(*[]models.Playroll)
	if !ok {
		return nil, fmt.Errorf("error converting to Playroll Slice")
	}
	output := []models.PlayrollOutput{}
	for _, p := range *ps {
		po, err := p.ToOutput()
		if err != nil {
			return nil, err
		}
		output = append(output, *po)
	}
	return &output, nil
}

var getPlayroll = gqltag.Method{
	Description: `[Get Playroll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		type getPlayrollParams struct {
			ID string
		}
		params := &getPlayrollParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		p := initPlayroll(db)
		id := utils.StringIDToNumber(params.ID)
		return formatPlayroll(p.Get(id))
	},
}

var listPlayrolls = gqltag.Method{
	Description: `[List Playrolls Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		p := initPlayroll(db.Preload("Rolls").Preload("Tracklists"))
		type listPlayrollsParams struct {
			Offset uint
			Count  uint
		}

		params := &listPlayrollsParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		return formatPlayrolls(p.List())
	},
}

var createPlayroll = gqltag.Method{
	Description: `[Create Playroll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		p := initPlayroll(db)
		type createPlayrollParams struct {
			ID    string
			Input models.PlayrollInput
		}

		params := &createPlayrollParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		playroll, err := params.Input.ToModel()
		if err != nil {
			return nil, err
		}
		return formatPlayroll(p.Create(playroll))
	},
}

var updatePlayroll = gqltag.Method{
	Description: `[Update Playroll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		p := initPlayroll(db)
		type updatePlayrollParams struct {
			ID    string
			Input models.PlayrollInput
		}

		params := &updatePlayrollParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		playroll, err := params.Input.ToModel()
		if err != nil {
			return nil, err
		}
		playroll.ID = utils.StringIDToNumber(params.ID)
		return formatPlayroll(p.Update(playroll))
	},
}

var deletePlayroll = gqltag.Method{
	Description: `[Delete Playroll Description Goes Here]`,
	Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
		p := initPlayroll(db)
		type deletePlayrollParams struct {
			ID string
		}

		params := &deletePlayrollParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)
		return formatPlayroll(p.Delete(id))
	},
}

var LinkedPlayrollMethods = PlayrollMethods{
	GetPlayroll:    gqltag.LinkQuery(getPlayroll),
	ListPlayrolls:  gqltag.LinkQuery(listPlayrolls),
	CreatePlayroll: gqltag.LinkMutation(createPlayroll),
	UpdatePlayroll: gqltag.LinkMutation(updatePlayroll),
	DeletePlayroll: gqltag.LinkMutation(deletePlayroll),
}
