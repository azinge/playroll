package pagination

import "github.com/jinzhu/gorm"

type Paginator struct {
  DB *gorm.DB
  ShowLogs bool
}

type Options struct {
  OrderBy []interface{}
  Page int
  Limit int
}

func (paginator *Paginator) Paginate(model interface{}, options *Options) error {
    db := paginator.DB

    if paginator.ShowLogs {
      db = db.Debug()
    }
    if len(options.OrderBy) > 0 {
      for _, orderOption := range options.OrderBy {
        db = db.Order(orderOption)
      }
    }

    var count int
    var offset int
    done := make(chan bool, 1)
    go countDataRecords(db, model, &count, done);

    if options.Page == 1 {
      offset = 0
    } else {
      offset = (options.Page - 1) * options.Limit
    }

    if err := db.Limit(options.Limit).Offset(offset).Find(model).Error; err != nil {
      return err
    }

    <-done
    return nil
  }

  func countDataRecords(db *gorm.DB, model interface{}, count *int, done chan bool) {
    db.Model(model).Count(count)
    done <- true
  }
