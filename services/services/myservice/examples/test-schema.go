package main

import (
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/graphql-go/graphql"

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

func GenerateGraphQLSchema(entities *[]*Entity) (graphql.Schema, error) {
	typeMap := map[string]*graphql.Object{}
	for _, entity := range *entities {
		typeMap[entity.Name] = graphql.NewObject(graphql.ObjectConfig{Name: entity.Name})
	}
	for _, entity := range *entities {
		m := structs.New(entity.Model)
		fieldlist := m.Fields()
		for _, field := range fieldlist {
			if field.Tag("gql") == "MODEL" {
				modelfieldlist := structs.Fields(m.Field("Model").Value())
				for _, modelfield := range modelfieldlist {
					name, gqlField := parseGraphQLField(modelfield.Tag("gql"), &typeMap)
					typeMap[entity.Name].AddFieldConfig(name, gqlField)
					fmt.Printf("%+v, %+v\n", name, gqlField)
				}
			} else if field.Tag("gql") != "" {
				name, gqlField := parseGraphQLField(field.Tag("gql"), &typeMap)
				typeMap[entity.Name].AddFieldConfig(name, gqlField)
				fmt.Printf("%+v, %+v\n", name, gqlField)
			}
		}
	}
	rootQuery := graphql.NewObject(graphql.ObjectConfig{Name: "Query"})
	for _, entity := range *entities {
		querylist := structs.Fields(entity.Queries)
		for _, query := range querylist {
			name, gqlField := parseGraphQLField(query.Tag("gql"), &typeMap)
			rootQuery.AddFieldConfig(name, gqlField)
		}
	}
	rootMutation := graphql.NewObject(graphql.ObjectConfig{Name: "Mutation"})
	for _, entity := range *entities {
		mutationlist := structs.Fields(entity.Queries)
		for _, mutation := range mutationlist {
			name, gqlField := parseGraphQLField(mutation.Tag("gql"), &typeMap)
			rootMutation.AddFieldConfig(name, gqlField)
		}
	}
	return graphql.NewSchema(graphql.SchemaConfig{
		Query:    rootQuery,
		Mutation: rootMutation,
	})
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

type PlayrollQueries struct {
	GetPlayroll     func() `gql:"playroll: Playroll"`
	SearchPlayrolls func() `gql:"searchPlayrolls: Playroll"`
	ListPlayrolls   func() `gql:"listPlayrolls: Playroll"`
}

type PlayrollMutations struct {
	CreatePlayroll   func() `gql:"createPlayroll: Playroll"`
	UpdatePlayroll   func() `gql:"updatePlayroll: Playroll"`
	DeletePlayroll   func() `gql:"deletePlayroll: Playroll"`
	GenerateSonglist func() `gql:"generateSonglist: Playroll"`
}

var PlayrollEntity = &Entity{
	Name:      "Playroll",
	Model:     &Playroll{},
	Queries:   &PlayrollQueries{},
	Mutations: &PlayrollMutations{},
}

func main() {
	resp, _ := GenerateGraphQLSchema(&[]*Entity{PlayrollEntity})
	fmt.Printf("%+v\n", resp)
}
