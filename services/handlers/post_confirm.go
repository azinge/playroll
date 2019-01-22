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

func PostConfirmHandler(context context.Context, request events.CognitoEventUserPoolsPostConfirmationRequest) (events.CognitoEventUserPoolsPostConfirmationResponse, error) {
	host := fmt.Sprintf("host=%v port=%v user=%v dbname=%v password=%v sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PASS"),
	)
	resp := events.CognitoEventUserPoolsPostConfirmationResponse{}

	db, err := gorm.Open("postgres", host)
	if err != nil {
		fmt.Println("error opening db: " + err.Error())
		return resp, err
	}
	// tx := db.Begin()
	userInput := models.UserInput{Name: "testing"}
	user, err := userInput.ToModel()
	if err != nil {
		return resp, err
	}
	tDAO := models.InitUserDAO(db)

	rawuser, err := tDAO.Create(user)
	if err != nil {
		return resp, err
	}
	_, err = models.FormatUser(rawuser)
	defer db.Close()

	return resp, nil
}

func main() {
	lambda.Start(PostConfirmHandler)
}
