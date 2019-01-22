package main

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/jinzhu/gorm"
)

func PostConfirmHandler(context context.Context, request events.CognitoEventUserPoolsPostConfirmationRequest) (events.CognitoEventUserPoolsPostConfirmationResponse, error) {
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
		return events.CognitoEventUserPoolsPostConfirmationResponse{}, err
	}
	fmt.Println("PostConfirm!")
	fmt.Printf("%#v\n", context)
	defer db.Close()

	return events.CognitoEventUserPoolsPostConfirmationResponse{}, nil
}

func main() {
	lambda.Start(PostConfirmHandler)
}
