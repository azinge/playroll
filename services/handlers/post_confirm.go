package main

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/cazinge/playroll/services/models"
	"github.com/jinzhu/gorm"
	"github.com/mitchellh/mapstructure"
)

type CognitoEventRequest struct {
	DatasetName   string      `json:"datasetName"`
	TriggerSource string      `json:"triggerSource"`
	IdentityID    string      `json:"identityId"`
	UserPoolID    string      `json:"userPoolId"`
	Region        string      `json:"region"`
	Version       string      `json:"version"`
	Request       interface{} `json:"request"`
	Username      string      `json:"userName"`
}

type CognitoEventResponse struct {
	TriggerSource string   `json:"triggerSource"`
	Username      string   `json:"userName"`
	UserPoolID    string   `json:"userPoolId"`
	Region        string   `json:"region"`
	Version       int      `json:"version"`
	Response      struct{} `json:"response"`
}

type CognitoUserAttributes struct {
	Sub     string `json:"sub"`
	Email   string `json:"email"`
	Picture string `json:"picture"`
}

func PostConfirmHandler(context context.Context, request CognitoEventRequest) (CognitoEventResponse, error) {
	host := fmt.Sprintf("host=%v port=%v user=%v dbname=%v password=%v sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PASS"),
	)
	resp := CognitoEventResponse{
		Version:       1,
		TriggerSource: request.TriggerSource,
		Region:        request.Region,
		UserPoolID:    request.UserPoolID,
		Username:      request.Username,
	}

	db, err := gorm.Open("postgres", host)
	if err != nil {
		fmt.Println("error opening db: " + err.Error())
		return resp, err
	}

	fmt.Printf("%#v\n", context)
	fmt.Printf("%#v\n", request)

	type cognitoEventInternalRequest struct {
		UserAttributes CognitoUserAttributes
	}

	intReq := &cognitoEventInternalRequest{}
	err = mapstructure.Decode(request, intReq)
	if err != nil {
		fmt.Println(err)
		return resp, err
	}

	attrs := intReq.UserAttributes
	userInput := &models.UserInput{Name: request.Username, Avatar: attrs.Picture, Email: attrs.Email}
	identityCredentialInput := &models.IdentityCredentialInput{Provider: "CognitoUserPool", ProviderID: attrs.Sub}
	models.CreateUserWithIdentityCredential(userInput, identityCredentialInput, db)

	defer db.Close()
	return resp, nil
}

func main() {
	lambda.Start(PostConfirmHandler)
}
