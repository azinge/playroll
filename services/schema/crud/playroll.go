package crud

import (
	"github.com/cazinge/playroll/services/gqltag"

	"github.com/cazinge/playroll/services/models"
)

type PlayrollMethods struct {
	GetPlayroll    *gqltag.Query    `gql:"playroll(id: ID!): Playroll"`
	ListPlayrolls  *gqltag.Query    `gql:"listPlayrolls(offset: Int, count: Int): [Playroll]"`
	CreatePlayroll *gqltag.Mutation `gql:"createPlayroll(input: PlayrollInput!): Playroll"`
	UpdatePlayroll *gqltag.Mutation `gql:"updatePlayroll(id: ID!, input: PlayrollInput!): Playroll"`
	DeletePlayroll *gqltag.Mutation `gql:"deletePlayroll(id: ID!): Playroll"`
}

var getPlayroll = gqltag.Method{
	Description: `[Get Playroll Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.Playroll{}),
	// Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	// 	type getPlayrollParams struct {
	// 		ID string
	// 	}
	// 	params := &getPlayrollParams{}
	// 	err := mapstructure.Decode(resolveParams.Args, params)
	// 	if err != nil {
	// 		fmt.Println(err)
	// 		return nil, err
	// 	}

	// 	p := models.InitPlayrollDAO(db)
	// 	id := utils.StringIDToNumber(params.ID)

	// 	rawPlayroll, err := p.Get(id)
	// 	if err != nil {
	// 		return nil, err
	// 	}
	// 	return models.FormatPlayroll(rawPlayroll)
	// },
}

var listPlayrolls = gqltag.Method{
	Description: `[List Playrolls Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.Playroll{}),
	// Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	// 	p := models.InitPlayrollDAO(db.Preload("Rolls").Preload("Tracklists"))
	// 	type listPlayrollsParams struct {
	// 		Offset uint
	// 		Count  uint
	// 	}

	// 	params := &listPlayrollsParams{}
	// 	err := mapstructure.Decode(resolveParams.Args, params)
	// 	if err != nil {
	// 		fmt.Println(err)
	// 		return nil, err
	// 	}

	// 	rawPlayroll, err := p.List()
	// 	if err != nil {
	// 		return nil, err
	// 	}
	// 	return models.FormatPlayrollSlice(rawPlayroll)
	// },
}

var createPlayroll = gqltag.Method{
	Description: `[Create Playroll Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.Playroll{}, &models.PlayrollInput{}),
	// Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	// 	p := models.InitPlayrollDAO(db)
	// 	type createPlayrollParams struct {
	// 		ID    string
	// 		Input models.PlayrollInput
	// 	}

	// 	params := &createPlayrollParams{}
	// 	err := mapstructure.Decode(resolveParams.Args, params)
	// 	if err != nil {
	// 		fmt.Println(err)
	// 		return nil, err
	// 	}

	// 	playroll, err := params.Input.ToModel()
	// 	if err != nil {
	// 		return nil, err
	// 	}

	// 	rawPlayroll, err := p.Create(playroll)
	// 	if err != nil {
	// 		return nil, err
	// 	}
	// 	return models.FormatPlayroll(rawPlayroll)
	// },
}

var updatePlayroll = gqltag.Method{
	Description: `[Update Playroll Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.Playroll{}, &models.PlayrollInput{}),
	// Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	// 	p := models.InitPlayrollDAO(db)
	// 	type updatePlayrollParams struct {
	// 		ID    string
	// 		Input models.PlayrollInput
	// 	}

	// 	params := &updatePlayrollParams{}
	// 	err := mapstructure.Decode(resolveParams.Args, params)
	// 	if err != nil {
	// 		fmt.Println(err)
	// 		return nil, err
	// 	}

	// 	playroll, err := params.Input.ToModel()
	// 	if err != nil {
	// 		return nil, err
	// 	}
	// 	playroll.ID = utils.StringIDToNumber(params.ID)

	// 	rawPlayroll, err := p.Update(playroll)
	// 	if err != nil {
	// 		return nil, err
	// 	}
	// 	return models.FormatPlayroll(rawPlayroll)
	// },
}

var deletePlayroll = gqltag.Method{
	Description: `[Delete Playroll Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.Playroll{}),
	// Request: func(resolveParams graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	// 	p := models.InitPlayrollDAO(db)
	// 	type deletePlayrollParams struct {
	// 		ID string
	// 	}

	// 	params := &deletePlayrollParams{}
	// 	err := mapstructure.Decode(resolveParams.Args, params)
	// 	if err != nil {
	// 		fmt.Println(err)
	// 		return nil, err
	// 	}

	// 	id := utils.StringIDToNumber(params.ID)

	// 	rawPlayroll, err := p.Delete(id)
	// 	if err != nil {
	// 		return nil, err
	// 	}
	// 	return models.FormatPlayroll(rawPlayroll)
	// },
}

var LinkedPlayrollMethods = PlayrollMethods{
	GetPlayroll:    gqltag.LinkQuery(getPlayroll),
	ListPlayrolls:  gqltag.LinkQuery(listPlayrolls),
	CreatePlayroll: gqltag.LinkMutation(createPlayroll),
	UpdatePlayroll: gqltag.LinkMutation(updatePlayroll),
	DeletePlayroll: gqltag.LinkMutation(deletePlayroll),
}
