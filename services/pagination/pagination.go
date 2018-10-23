package pagination
import (
  "math"
  "github.com/jinzhu/gorm"
)
type Paginator struct {
  Database *gorm.DB
  ShowLogs bool
}
type Options struct {
  OrderBy []interface{}
  Page int
  Limit int
}
type Response struct {
  TotalDataRecords int `json:"totalDataRecords"`
  TotalPages int `json:"totalPages"`
  Offset int `json:"offset"`
  Limit int `json:"limit"`
  CurrentPage int `json:"currentPage"`
  DataRecords interface{} `json:"dataRecords"`
}
func (paginator *Paginator) Paginate(model interface{}, options *Options) (*Response, error) {
  db := paginator.Database
  if paginator.ShowLogs {
    db = db.Debug()
  }
  if len(options.OrderBy) > 0 {
    for _, orderOption := range options.OrderBy {
      db = db.Order(orderOption)
    }
  }
  var response Response
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
      return nil, err
    }
    <-done
    response.TotalDataRecords = count
    response.TotalPages = totalPages(options.Limit, count)
    response.Offset = offset
    response.Limit = options.Limit
    response.CurrentPage = options.Page
    response.DataRecords = model
    return &response, nil
  }
  func countDataRecords(db *gorm.DB, model interface{}, count *int, done chan bool) {
    db.Model(model).Count(count)
    done <- true
  }
  func totalPages(limit int, totalDataRecords int) int {
    return int(math.Round(float64(totalDataRecords)/float64(limit)))
  }
