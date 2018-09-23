package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/graphql-go/graphql"
	graphiql "github.com/mnmtanish/go-graphiql"
)

func serveGraphiQL(s graphql.Schema) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		sendError := func(err error) {
			w.WriteHeader(500)
			w.Write([]byte(err.Error()))
		}

		req := &graphiql.Request{}
		if err := json.NewDecoder(r.Body).Decode(req); err != nil {
			sendError(err)
			return
		}

		res := graphql.Do(graphql.Params{
			Schema:        s,
			RequestString: req.Query,
		})

		if err := json.NewEncoder(w).Encode(res); err != nil {
			sendError(err)
		}
	}
}

func main() {
	schema, err := GenerateGraphQLSchema(&[]*Entity{
		PlayrollEntity,
		SonglistEntity,
		RollEntity,
		SongEntity,
		AlbumEntity,
		ArtistEntity,
		GenreEntity,
		UserEntity,
	})
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(schema)
	http.HandleFunc("/graphiql", serveGraphiQL(schema))
	http.ListenAndServe(":8080", nil)
}
