package pagination

import (
	"fmt"

	"github.com/lib/pq"

	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	"github.com/mitchellh/mapstructure"
)

type Paginator struct {
	Database *gorm.DB
	ShowLogs bool
	Options  Options
}

type Options struct {
	OrderBy pq.StringArray
	Offset  int
	Limit   int
}

func (paginator *Paginator) Paginate(model interface{}) error {
	db := paginator.Database

	if paginator.ShowLogs {
		db = db.Debug()
	}

	orderByList := paginator.Options.OrderBy
	if len(orderByList) > 0 {
		for _, orderOption := range orderByList {
			db = db.Order(orderOption)
		}
	}

	var count int
	offset := paginator.Options.Offset
	limit := paginator.Options.Limit

	done := make(chan bool, 1)
	go countDataRecords(db, model, &count, done)

	if err := db.Limit(limit).Offset(offset).Find(model).Error; err != nil {
		fmt.Println("Error processing limit and offset within Pagination: ", err.Error())
		return err
	}

	<-done
	return nil
}

func countDataRecords(db *gorm.DB, model interface{}, count *int, done chan bool) {
	db.Model(model).Count(count)
	done <- true
}

func HandlePagination(params graphql.ResolveParams, db *gorm.DB, model interface{}) error {
	options := params.Args["options"].(map[string]interface{})
	paginationOpts := Options{}
	mapstructure.Decode(options, &paginationOpts)

	paginator := Paginator{Database: db, Options: paginationOpts}
	if err := paginator.Paginate(model); err != nil {
		fmt.Println("Pagination Error: " + err.Error())
		return err
	}
	return nil
}
