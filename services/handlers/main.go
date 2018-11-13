package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"

	"github.com/graphql-go/graphql"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func Handler(context context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// host := fmt.Sprintf("host=%v port=%v user=%v dbname=%v password=%v sslmode=disable",
	// 	os.Getenv("DB_HOST"),
	// 	os.Getenv("DB_PORT"),
	// 	os.Getenv("DB_USER"),
	// 	os.Getenv("DB_NAME"),
	// 	os.Getenv("DB_PASS"),
	// )

	// db, err := gorm.Open("postgres", host)
	// if err != nil {
	// 	fmt.Println("error opening db: " + err.Error())
	// 	return events.APIGatewayProxyResponse{
	// 		Headers: map[string]string{
	// 			"Access-Control-Allow-Origin":      "*",
	// 			"Access-Control-Allow-Credentials": "true",
	// 		},
	// 		Body:       err.Error(),
	// 		StatusCode: 500,
	// 	}, err
	// }
	// defer db.Close()

	// db.AutoMigrate(
	// 	&schema.PlayrollEntity.Model,
	// 	&schema.RollEntity.Model,
	// 	&schema.SonglistEntity.Model,
	// 	&schema.SongEntity.Model,
	// 	&schema.GenreEntity.Model,
	// 	&schema.AlbumEntity.Model,
	// 	&schema.ArtistEntity.Model,
	// 	&schema.UserEntity.Model,
	// )

	// schema, err := utils.GenerateGraphQLSchema(
	// 	&[]*utils.Entity{
	// 		schema.PlayrollEntity,
	// 		schema.SonglistEntity,
	// 		schema.RollEntity,
	// 		schema.SongEntity,
	// 		schema.AlbumEntity,
	// 		schema.ArtistEntity,
	// 		schema.GenreEntity,
	// 		schema.UserEntity,
	// 	},
	// 	&[]*utils.Type{
	// 		schema.RollSourceType,
	// 		schema.RollSourceInputType,
	// 		schema.RollFilterType,
	// 		schema.RollFilterInputType,
	// 		schema.RollLengthType,
	// 		schema.RollLengthInputType,
	// 		schema.MusicSourceType,
	// 		schema.MusicSourceInputType,
	// 		schema.ListInputType,
	// 	},
	// 	// db,
	// 	nil,
	// )
	schema, err := gqltag.GenerateGraphQLSchemaAlt(models.LinkedTypes, models.LinkedMethods, nil)
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

	fmt.Println(schema)

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
	Handler(nil, events.APIGatewayProxyRequest{})
	// lambda.Start(Handler)
}
