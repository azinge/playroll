package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"strings"

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
	Sub               string `json:"sub"`
	Email             string `json:"email"`
	Profile           string `json:"profile"`
	PreferredUsername string `json:"preferred_username"`
}

func IsJSON(str string) bool {
	var js json.RawMessage
	return json.Unmarshal([]byte(str), &js) == nil
}

func PostConfirmHandler(context context.Context, request CognitoEventRequest) (*CognitoEventResponse, error) {
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
		return nil, err
	}
	defer db.Close()

	type cognitoEventInternalRequest struct {
		UserAttributes map[string]string
	}
	intReq := &cognitoEventInternalRequest{}

	err = mapstructure.Decode(request.Request, intReq)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	attrs := intReq.UserAttributes

	fmt.Println("%#v\n", intReq)
	fmt.Println("%#v\n", attrs)
	name := attrs["preferred_username"]
	if name == "" {
		name = request.Username
	}
	name = strings.Replace(name, " ", "_", -1)
	fmt.Println(attrs["preferred_username"], request.Username)

	avatar := attrs["profile"]
	fmt.Println(avatar, IsJSON(avatar))
	if IsJSON(avatar) {
		var data struct {
			Data struct {
				URL string `json:"url"`
			} `json:"data"`
		}
		json.Unmarshal([]byte(avatar), &data)
		fmt.Println(data)
		avatar = data.Data.URL
	}

	email := attrs["email"]
	sub := attrs["sub"]

	userInput := &models.UserInput{Name: name, Avatar: avatar, Email: email}
	identityCredentialInput := &models.IdentityCredentialInput{Provider: "CognitoUserPool", Identifier: sub}
	models.CreateUserWithIdentityCredential(userInput, identityCredentialInput, db)

	return &CognitoEventResponse{
		Version:       1,
		TriggerSource: request.TriggerSource,
		Region:        request.Region,
		UserPoolID:    request.UserPoolID,
		Username:      request.Username,
	}, nil
}

func main() {
	lambda.Start(PostConfirmHandler)
}
