package main

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/cazinge/playroll/services/models"
	"github.com/jinzhu/gorm"
)

func AutoMigrateHandler(context context.Context) (events.APIGatewayProxyResponse, error) {
	host := fmt.Sprintf("host=%v port=%v user=%v dbname=%v password=%v sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PASS"),
	)

	db, err := gorm.Open("postgres", host)
	if err != nil {
		fmt.Println("error opening db: " + err.Error())
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Origin":      "*",
				"Access-Control-Allow-Credentials": "true",
			},
			Body:       err.Error(),
			StatusCode: 500,
		}, err
	}
	defer db.Close()

	err = db.AutoMigrate(
		models.ModelList...,
	).Error

	if err != nil {
		fmt.Println("error auto migrating db: " + err.Error())
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Origin":      "*",
				"Access-Control-Allow-Credentials": "true",
			},
			Body:       err.Error(),
			StatusCode: 500,
		}, err
	}

	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Access-Control-Allow-Origin":      "*",
			"Access-Control-Allow-Credentials": "true",
		},
		Body:       "db successfully migrated",
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(AutoMigrateHandler)
}
