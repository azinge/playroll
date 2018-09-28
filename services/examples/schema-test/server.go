package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"

	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func Handler(context context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
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
			Body:       err.Error(),
			StatusCode: 500,
		}, err
	}
	defer db.Close()

	db.AutoMigrate(&Playroll{})

	schema, err := GenerateGraphQLSchema(
		&[]*Entity{
			PlayrollEntity,
			SonglistEntity,
			RollEntity,
			SongEntity,
			AlbumEntity,
			ArtistEntity,
			GenreEntity,
			UserEntity,
		},
		&[]*Type{},
		db,
	)
	if err != nil {
		fmt.Println("error generating schema: " + err.Error())
		return events.APIGatewayProxyResponse{
			Body:       err.Error(),
			StatusCode: 500,
		}, err
	}

	result := graphql.Do(graphql.Params{
		Schema:        schema,
		RequestString: request.Body,
	})

	out, err := json.Marshal(result)
	if err != nil {
		fmt.Println("json.Marshal failed: " + err.Error())
		return events.APIGatewayProxyResponse{
			Body:       err.Error(),
			StatusCode: 500,
		}, err
	}

	return events.APIGatewayProxyResponse{
		Body:       string(out),
		StatusCode: 200,
	}, nil
}

func main() {
	lambda.Start(Handler)
}
