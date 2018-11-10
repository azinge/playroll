package search

import (
	"fmt"

	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	"github.com/mitchellh/mapstructure"
)

type Options struct {
	UserID          string
	PreloadModel    string
	PreloadArgument string
	WhereClause     string
	WhereArgument   string
}

func Query(params graphql.ResolveParams, db *gorm.DB, model interface{}) error {
	//TODO: Plan how to properly structure queries to handle every gorm method.
	options := params.Args["options"].(map[string]interface{})
	searchOpts := Options{}
	mapstructure.Decode(options, &searchOpts)

	query := db.Find(model, "id = ?", searchOpts.UserID)

	if searchOpts.PreloadModel != "" {
		query = db.Preload(searchOpts.PreloadModel, searchOpts.PreloadArgument).
			Find(model, "id = ?", searchOpts.UserID)
	}

	if searchOpts.WhereClause != "" {
		query = db.Where(searchOpts.WhereClause, searchOpts.WhereArgument).
			Find(model, "id = ?", searchOpts.UserID)
	}

	if err := query.Error; err != nil {
		fmt.Println("Error during search: ", err.Error())
		return err
	}

	return nil
}
