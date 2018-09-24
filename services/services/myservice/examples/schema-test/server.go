package main

import (
	"fmt"
	"net/http"

	"github.com/graphql-go/handler"
)

func main() {
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
