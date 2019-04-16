package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/schema"

	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

func GraphqlHandler(context context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
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

	mctx := &gqltag.MethodContext{
		DB:      db,
		Request: request,
		Context: context,
	}
	schema, err := gqltag.GenerateGraphQLSchema(
		schema.LinkedTypes,
		schema.LinkedMethods,
		mctx,
	)

	if err != nil {
		fmt.Println("error generating schema: " + err.Error())
		return events.APIGatewayProxyResponse{
			Headers: map[string]string{
				"Access-Control-Allow-Origin":      "*",
				"Access-Control-Allow-Credentials": "true",
			},
			Body:       err.Error(),
			StatusCode: 500,
		}, err
	}

	body := map[string]interface{}{}
	json.Unmarshal([]byte(request.Body), &body)

	requestString, _ := body["query"].(string)
	variableValues, _ := body["variables"].(map[string]interface{})
	operationName, _ := body["operationName"].(string)

	result := graphql.Do(graphql.Params{
		Schema:         schema,
		RequestString:  requestString,
		VariableValues: variableValues,
		OperationName:  operationName,
		Context:        context,
	})

	out, err := json.Marshal(result)
	if err != nil {
		fmt.Println("json.Marshal failed: " + err.Error())
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
		Body:       string(out),
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(GraphqlHandler)
}
