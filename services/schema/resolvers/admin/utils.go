package admin

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"

	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

func GenerateGetEntityMethod(e models.Entity) func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
	return func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		dao := e.InitDAO(mctx.DB)

		type getEntityParams struct {
			ID string
		}
		params := &getEntityParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)

		rawEntity, err := dao.Get(id)
		if err != nil {
			return nil, err
		}
		return dao.Format(rawEntity)
	}
}

func GenerateListEntityMethod(e models.Entity) func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
	return func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		dao := e.InitDAO(mctx.DB)

		type listEntityParams struct {
			Offset uint
			Count  uint
		}
		params := &listEntityParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		rawEntities, err := dao.List()
		if err != nil {
			return nil, err
		}
		return dao.FormatSlice(rawEntities)
	}
}

func GenerateCreateEntityMethod(e models.Entity, entityInput models.EntityInput) func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
	return func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		dao := e.InitDAO(mctx.DB)

		type createEntityParams struct {
			Input models.EntityInput
		}
		params := &createEntityParams{Input: entityInput}
		err := mapstructure.Decode(resolveParams.Args, params)
		fmt.Printf("%#v\n", params)
		fmt.Printf("%#v\n", params.Input)

		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		entity, err := params.Input.ToModel()
		if err != nil {
			return nil, err
		}

		rawEntity, err := dao.Create(entity)
		if err != nil {
			return nil, err
		}
		return dao.Format(rawEntity)
	}
}

func GenerateUpdateEntityMethod(e models.Entity, entityInput models.EntityInput) func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
	return func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		dao := e.InitDAO(mctx.DB)

		type updateEntityParams struct {
			ID    string
			Input models.EntityInput
		}
		params := &updateEntityParams{Input: entityInput}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		entity, err := params.Input.ToModel()
		if err != nil {
			return nil, err
		}
		id := utils.StringIDToNumber(params.ID)
		entity.SetID(id)

		rawEntity, err := dao.Update(entity)
		if err != nil {
			return nil, err
		}
		return dao.Format(rawEntity)
	}
}

func GenerateDeleteEntityMethod(e models.Entity) func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
	return func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		dao := e.InitDAO(mctx.DB)

		type deleteEntityParams struct {
			ID string
		}

		params := &deleteEntityParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.ID)

		rawEntity, err := dao.Delete(id)
		if err != nil {
			return nil, err
		}
		return dao.Format(rawEntity)
	}
}
