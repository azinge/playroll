package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/schema"

	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func HandleLocalErrors(context string) {
	err := errors.New(context)
	panic(err)
}

func adminHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("called")
	host := fmt.Sprintf(
		"host=%v port=%v user=%v dbname=%v sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_NAME"),
	)

	db, err := gorm.Open("postgres", host)
	if err != nil {
		HandleLocalErrors("error opening db: " + err.Error())
	}
	fmt.Println("Connected to DB!")

	defer db.Close()

	if db.AutoMigrate(models.ModelList...).Error != nil {
		HandleLocalErrors("error migrating db: " + err.Error())
	}

	// db.LogMode(true)
	context, _ := context.WithDeadline(context.Background(), time.Now().Add(6000*time.Millisecond))

	mctx := &gqltag.MethodContext{
		DB: db,
		// Request: request,
		Context: context,
		Debug:   true,
	}
	schema, err := gqltag.GenerateGraphQLSchema(
		schema.LinkedAdminTypes,
		schema.LinkedAdminMethods,
		mctx,
	)

	if err != nil {
		HandleLocalErrors("error generating schema: " + err.Error())
	}

	body := map[string]interface{}{}
	json.NewDecoder(r.Body).Decode(&body)

	requestString, _ := body["query"].(string)
	variableValues, _ := body["variables"].(map[string]interface{})
	operationName, _ := body["operationName"].(string)

	result := graphql.Do(graphql.Params{
		Schema:         schema,
		RequestString:  requestString,
		VariableValues: variableValues,
		OperationName:  operationName,
	})

	out, err := json.Marshal(result)
	if err != nil {
		HandleLocalErrors("json.Marshal failed: " + err.Error())
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	fmt.Fprintf(w, string(out))
}

func main() {
	http.HandleFunc("/admin_graphql", adminHandler)
	fmt.Printf("\nrunning on localhost %v\n", os.Getenv("PORT"))
	log.Fatal(http.ListenAndServe(os.Getenv("PORT"), nil))
}
