package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/graphql-go/handler"
	"github.com/jinzhu/gorm"
)

func main() {
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
		return
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
		fmt.Println(err)
		return
	}

	h := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})
	http.Handle("/graphql", h)

	fmt.Println("Running Graphiql Server")
	http.ListenAndServe(":8080", nil)
}
