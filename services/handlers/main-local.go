package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/cazinge/playroll/services/schema"
	"github.com/cazinge/playroll/services/utils"

	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func HandleLocalErrors(context string) {
	err := errors.New(context)
	panic(err)
}

func localHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("called")
	host := fmt.Sprintf("host=%v port=%v user=%v dbname=%v password=%v sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PASS"),
	)

	db, err := gorm.Open("postgres", host)
	if err != nil {
		HandleLocalErrors("error opening db: " + err.Error())
	}
	fmt.Println("Connected to DB!")

	defer db.Close()

	db.AutoMigrate(
		schema.PlayrollEntity.Model,
		schema.RollEntity.Model,
		schema.MusicSourceEntity.Model,
		schema.TracklistEntity.Model,
		schema.RollOutputEntity.Model,
		schema.UserEntity.Model,
		schema.ExternalCredentialsEntity.Model,
	)

	schema, err := utils.GenerateGraphQLSchema(
		&[]*utils.Entity{
			schema.PlayrollEntity,
			schema.RollEntity,
			schema.MusicSourceEntity,
			schema.TracklistEntity,
			schema.RollOutputEntity,
			schema.UserEntity,
			schema.ExternalCredentialsEntity,
		},
		&[]*utils.Type{
			schema.RollInputType,
			schema.RollFilterType,
			schema.RollFilterInputType,
			schema.RollLengthType,
			schema.RollLengthInputType,
			schema.MusicSourceInputType,
			schema.RollOutputInputType,
			schema.SearchInputType,
			schema.PaginationInputType,
			schema.TokenType,
		},
		db,
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

func spotifyOAuth(w http.ResponseWriter, r *http.Request) {
	// redirectURL := spotify.HandleSpotifyOAuth()
	// fmt.Printf("\nredirectURL:\n%s", redirectURL)
	// // fmt.Fprintf(w, redirectURL)
	// http.Redirect(w, r, redirectURL, http.StatusSeeOther)
}

func spotifyCallbackHandler(w http.ResponseWriter, r *http.Request) {
	// code := spotify.HandleSpotifyCallback(w, r)
	fmt.Fprintf(w, string("success"))
}

func main() {
	http.HandleFunc("/graphql", localHandler)
	http.HandleFunc("/spotify/oAuth", spotifyOAuth)
	http.HandleFunc("/callback", spotifyCallbackHandler)
	fmt.Printf("\nrunning on localhost %v\n", os.Getenv("PORT"))
	log.Fatal(http.ListenAndServe(os.Getenv("PORT"), nil))
}
