package main

import (
	"fmt"
	"os"
	"time"

	"github.com/cazinge/playroll/services/models"
	"github.com/jinzhu/gorm"
)

func main() {
	host := fmt.Sprintf(
		"host=%v port=%v user=%v dbname=%v sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_NAME"),
	)

	db, err := gorm.Open("postgres", host)
	if err != nil {
		fmt.Println("error opening db: " + err.Error())
	}
	fmt.Println("Connected to DB!")

	defer db.Close()

	if db.AutoMigrate(models.ModelList...).Error != nil {
		fmt.Println("error migrating db: " + err.Error())
	}
	playrollModel := &models.Playroll{}
	lastHour := time.Now().Add(-1 * time.Hour)
	if err := db.Where("updated_at > ?", lastHour).First(playrollModel).Error; err != nil {
		panic(err)
	}
	p, err := models.FormatPlayroll(playrollModel)
	fmt.Println(p, err)
}
