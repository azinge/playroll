package main

import (
	"fmt"
	"os"

	"github.com/apex/gateway"
	"github.com/cazinge/playroll/services/schema"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/handler"
	"github.com/jinzhu/gorm"

	_ "github.com/graphql-go/graphql"
	_ "github.com/jinzhu/gorm/dialects/postgres"
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

	db.AutoMigrate(&schema.Playroll{})

	gqlSchema, err := utils.GenerateGraphQLSchema(
		&[]*utils.Entity{
			schema.PlayrollEntity,
			schema.SonglistEntity,
			schema.RollEntity,
			schema.SongEntity,
			schema.AlbumEntity,
			schema.ArtistEntity,
			schema.GenreEntity,
			schema.UserEntity,
		},
		&[]*utils.Type{},
		db,
	)
	if err != nil {
		fmt.Println(err)
		return
	}

	h := handler.New(&handler.Config{
		Schema:   &gqlSchema,
		Pretty:   true,
		GraphiQL: true,
	})
	gateway.ListenAndServe(":8080", h)
}
