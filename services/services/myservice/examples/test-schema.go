package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/graphql-go/graphql"
	graphiql "github.com/mnmtanish/go-graphiql"

	"github.com/fatih/structs"
)

type Model struct {
	ID        uint       `json:"id" gorm:"primary_key" gql:"id: ID!"`
	CreatedAt time.Time  `json:"createdAt" gql:"createdAt: String!"`
	UpdatedAt time.Time  `json:"updatedAt" gql:"updatedAt: String!"`
	DeletedAt *time.Time `json:"deletedAt" gql:"deletedAt: String!"`
}

type Entity struct {
	Name      string
	Model     interface{}
	Queries   interface{}
	Mutations interface{}
}

type Query struct {
	Request func(params graphql.ResolveParams) (interface{}, error)
}

type Mutation struct {
	Request func(params graphql.ResolveParams) (interface{}, error)
}

func GenerateGraphQLSchema(entities *[]*Entity) (rootQuery, rootMutation *graphql.Object) {
	typeMap := map[string]*graphql.Object{}
	for _, entity := range *entities {
		typeMap[entity.Name] = graphql.NewObject(graphql.ObjectConfig{Name: entity.Name, Fields: graphql.Fields{}})
	}
	for _, entity := range *entities {
		t := typeMap[entity.Name]
		m := structs.New(entity.Model)
		fieldlist := m.Fields()
		for _, field := range fieldlist {
			if field.Tag("gql") == "MODEL" {
				modelfieldlist := structs.Fields(m.Field("Model").Value())
				for _, modelfield := range modelfieldlist {
					name, gqlField := parseGraphQLField(modelfield.Tag("gql"), &typeMap)
					t.AddFieldConfig(name, gqlField)
				}
			} else if field.Tag("gql") != "" {
				name, gqlField := parseGraphQLField(field.Tag("gql"), &typeMap)
				t.AddFieldConfig(name, gqlField)
			}
		}
	}
	rootQuery = graphql.NewObject(graphql.ObjectConfig{Name: "Query", Fields: graphql.Fields{}})
	rootMutation = graphql.NewObject(graphql.ObjectConfig{Name: "Mutation", Fields: graphql.Fields{}})
	for _, entity := range *entities {
		methodlist := structs.Fields(entity.Queries)
		for _, method := range methodlist {
			name, gqlField := parseGraphQLField(method.Tag("gql"), &typeMap)
			gqlField.Resolve = method.Field("Request").Value().(func(params graphql.ResolveParams) (interface{}, error))
			switch structs.Name(method.Value()) {
			case "Query":
				rootQuery.AddFieldConfig(name, gqlField)
			case "Mutation":
				rootMutation.AddFieldConfig(name, gqlField)
			}
		}
	}
	return
}

/**
 * Parses url with the given regular expression and returns the
 * group values defined in the expression.
 *
 */
func getParams(regEx *regexp.Regexp, url string) map[string]string {
	match := regEx.FindStringSubmatch(url)
	paramsMap := make(map[string]string)
	for i, name := range regEx.SubexpNames() {
		if i > 0 && i <= len(match) {
			paramsMap[name] = match[i]
		}
	}
	return paramsMap
}

func parseGraphQLField(t string, typeMap *map[string]*graphql.Object) (string, *graphql.Field) {
	fieldRegexp := regexp.MustCompile(`^(?P<Name>\w+)(\((?P<Args>[^\)]*)\))?: (?P<Type>.*)$`)
	m := getParams(fieldRegexp, t)

	field := &graphql.Field{}
	field.Type = parseGraphQLType(m["Type"], typeMap)
	if m["Args"] != "" {
		field.Args = parseGraphQLArguments(m["Args"], typeMap)
	}
	return m["Name"], field
}

func parseGraphQLType(s string, typeMap *map[string]*graphql.Object) graphql.Type {
	nonNullRegexp := regexp.MustCompile(`^(?P<Match>.*)!$`)
	listRegexp := regexp.MustCompile(`^\[(?P<Match>[^\]]+)\]$`)
	if (*typeMap)[s] != nil {
		return (*typeMap)[s]
	}
	if m := getParams(nonNullRegexp, s); len(m) != 0 {
		return graphql.NewNonNull(parseGraphQLType(m["Match"], typeMap))
	}
	if m := getParams(listRegexp, s); len(m) != 0 {
		return graphql.NewList(parseGraphQLType(m["Match"], typeMap))
	}
	switch s {
	case "String":
		return graphql.String
	case "Float":
		return graphql.Float
	default:
		return graphql.String // throw error later
	}
}

func parseGraphQLArguments(s string, typeMap *map[string]*graphql.Object) graphql.FieldConfigArgument {
	argumentRegexp := regexp.MustCompile("^(?P<Name>[^: ]+) *: *(?P<Type>[^= ]+)( *= *(?P<Default>[^ ]*))? *$")
	config := &graphql.FieldConfigArgument{}
	for _, argParams := range strings.Split(s, ",") {
		m := getParams(argumentRegexp, argParams)
		arg := &graphql.ArgumentConfig{}
		arg.Type = parseGraphQLType(m["Type"], typeMap)
		if m["Default"] != "" {
			arg.DefaultValue = m["Default"]
		}
		(*config)[m["Name"]] = arg
	}
	return *config
}

type Playroll struct {
	Model `gql:"MODEL"`
	Name  string `json:"name" gql:"name: String!"`
}

type PlayrollMethods struct {
	GetPlayroll      *Query    `gql:"playroll: Playroll"`
	SearchPlayrolls  *Query    `gql:"searchPlayrolls: Playroll"`
	ListPlayrolls    *Query    `gql:"listPlayrolls: Playroll"`
	CreatePlayroll   *Mutation `gql:"createPlayroll: Playroll"`
	UpdatePlayroll   *Mutation `gql:"updatePlayroll: Playroll"`
	DeletePlayroll   *Mutation `gql:"deletePlayroll: Playroll"`
	GenerateSonglist *Mutation `gql:"generateSonglist: Playroll"`
}

func getPlayroll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("getPlayroll, args:%+v\n", params.Args)
	return nil, nil
}

func searchPlayrolls(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("searchPlayrolls, args:%+v\n", params.Args)
	return nil, nil
}

func listPlayrolls(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("listPlayrolls, args:%+v\n", params.Args)
	return nil, nil
}

func createPlayroll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("createPlayroll, args:%+v\n", params.Args)
	return nil, nil
}

func updatePlayroll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("updatePlayroll, args:%+v\n", params.Args)
	return nil, nil
}

func deletePlayroll(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("deletePlayroll, args:%+v\n", params.Args)
	return nil, nil
}

func generateSonglist(params graphql.ResolveParams) (interface{}, error) {
	fmt.Printf("generateSonglist, args:%+v\n", params.Args)
	return nil, nil
}

var PlayrollEntity = &Entity{
	Name:  "Playroll",
	Model: &Playroll{},
	Queries: &PlayrollMethods{
		GetPlayroll:      &Query{Request: getPlayroll},
		SearchPlayrolls:  &Query{Request: searchPlayrolls},
		ListPlayrolls:    &Query{Request: listPlayrolls},
		CreatePlayroll:   &Mutation{Request: createPlayroll},
		UpdatePlayroll:   &Mutation{Request: updatePlayroll},
		DeletePlayroll:   &Mutation{Request: deletePlayroll},
		GenerateSonglist: &Mutation{Request: generateSonglist},
	},
}

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
	rootQuery, rootMutation := GenerateGraphQLSchema(&[]*Entity{PlayrollEntity})
	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query:    rootQuery,
		Mutation: rootMutation,
	})
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(schema)
	http.HandleFunc("/graphiql", serveGraphiQL(schema))
	http.ListenAndServe(":8080", nil)
}
