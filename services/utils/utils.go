package utils

import (
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/jinzhu/gorm"

	"github.com/fatih/structs"
	"github.com/graphql-go/graphql"
)

type Model struct {
	ID        uint       `gql:"id: ID" gorm:"primary_key"`
	CreatedAt time.Time  `gql:"createdAt: String"`
	UpdatedAt time.Time  `gql:"updatedAt: String"`
	DeletedAt *time.Time `gql:"deletedAt: String"`
}

type Type struct {
	Name    string
	IsInput bool
	Model   interface{}
}

type Entity struct {
	Name    string
	Model   interface{}
	Methods interface{}
	Types   *[]*Type
}

type Query struct {
	Request func(params graphql.ResolveParams, db *gorm.DB) (interface{}, error)
	Scope   string
}

type Mutation struct {
	Request func(params graphql.ResolveParams, db *gorm.DB) (interface{}, error)
	Scope   string
}

func generateResolveFromMethod(method *structs.Field, db *gorm.DB) func(params graphql.ResolveParams) (interface{}, error) {
	return func(params graphql.ResolveParams) (interface{}, error) {
		fmt.Printf("%s, args:%+v\n", params.Info.FieldName, params.Args)
		return method.Field("Request").Value().(func(graphql.ResolveParams, *gorm.DB) (interface{}, error))(params, db)
	}
}

func generateResolveFromModelField(name string) func(params graphql.ResolveParams) (interface{}, error) {
	return func(p graphql.ResolveParams) (interface{}, error) {
		m := structs.Map(p.Source)
		if model, ok := m["Model"].(map[string]interface{}); ok {
			return model[name], nil
		}
		return nil, fmt.Errorf("error when parsing model field")
	}
}

func GenerateGraphQLSchema(entities *[]*Entity, types *[]*Type, db *gorm.DB) (graphql.Schema, error) {
	typeMap := map[string]*graphql.Object{}
	inputTypeMap := map[string]*graphql.InputObject{}
	for _, entity := range *entities {
		typeMap[entity.Name] = graphql.NewObject(graphql.ObjectConfig{Name: entity.Name, Fields: graphql.Fields{}})
		if entity.Types != nil {
			for _, t := range *entity.Types {
				if t.IsInput {
					inputTypeMap[t.Name] = graphql.NewInputObject(graphql.InputObjectConfig{Name: t.Name, Fields: graphql.InputObjectConfigFieldMap{}})
				} else {
					typeMap[t.Name] = graphql.NewObject(graphql.ObjectConfig{Name: t.Name, Fields: graphql.Fields{}})
				}
			}
		}
	}
	for _, t := range *types {
		if t.IsInput {
			inputTypeMap[t.Name] = graphql.NewInputObject(graphql.InputObjectConfig{Name: t.Name, Fields: graphql.InputObjectConfigFieldMap{}})
		} else {
			typeMap[t.Name] = graphql.NewObject(graphql.ObjectConfig{Name: t.Name, Fields: graphql.Fields{}})
		}
	}
	for _, t := range *types {
		m := structs.New(t.Model)
		fieldlist := m.Fields()
		for _, field := range fieldlist {
			if t.IsInput {
				name, gqlField := parseGraphQLInputField(field.Tag("gql"), &typeMap, &inputTypeMap)
				inputTypeMap[t.Name].AddFieldConfig(name, gqlField)
			} else {
				name, gqlField := parseGraphQLField(field.Tag("gql"), &typeMap, &inputTypeMap)
				typeMap[t.Name].AddFieldConfig(name, gqlField)
			}
		}
	}
	for _, entity := range *entities {
		t := typeMap[entity.Name]
		m := structs.New(entity.Model)
		fieldlist := m.Fields()
		for _, field := range fieldlist {
			if field.Tag("gql") == "MODEL" {
				modelfieldlist := structs.Fields(m.Field("Model").Value())
				for _, modelfield := range modelfieldlist {
					name, gqlField := parseGraphQLField(modelfield.Tag("gql"), &typeMap, &inputTypeMap)
					gqlField.Resolve = generateResolveFromModelField(modelfield.Name())
					t.AddFieldConfig(name, gqlField)
				}
			} else if field.Tag("gql") != "" {
				name, gqlField := parseGraphQLField(field.Tag("gql"), &typeMap, &inputTypeMap)
				t.AddFieldConfig(name, gqlField)
			}
		}
		if entity.Types != nil {
			for _, t := range *entity.Types {
				m := structs.New(t.Model)
				fieldlist := m.Fields()
				for _, field := range fieldlist {
					if t.IsInput {
						name, gqlField := parseGraphQLInputField(field.Tag("gql"), &typeMap, &inputTypeMap)
						inputTypeMap[t.Name].AddFieldConfig(name, gqlField)
					} else {
						name, gqlField := parseGraphQLField(field.Tag("gql"), &typeMap, &inputTypeMap)
						typeMap[t.Name].AddFieldConfig(name, gqlField)
					}
				}
			}
		}
	}
	rootQuery := graphql.NewObject(graphql.ObjectConfig{Name: "Query", Fields: graphql.Fields{}})
	rootMutation := graphql.NewObject(graphql.ObjectConfig{Name: "Mutation", Fields: graphql.Fields{}})
	for _, entity := range *entities {
		methodlist := structs.Fields(entity.Methods)
		for _, method := range methodlist {
			name, gqlField := parseGraphQLField(method.Tag("gql"), &typeMap, &inputTypeMap)
			gqlField.Resolve = generateResolveFromMethod(method, db)
			switch structs.Name(method.Value()) {
			case "Query":
				rootQuery.AddFieldConfig(name, gqlField)
			case "Mutation":
				rootMutation.AddFieldConfig(name, gqlField)
			}
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
 * Credit: https://stackoverflow.com/a/39635221/8072376
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

func parseGraphQLInputField(t string, typeMap *map[string]*graphql.Object, inputTypeMap *map[string]*graphql.InputObject) (string, *graphql.InputObjectFieldConfig) {
	fieldRegexp := regexp.MustCompile(`^(?P<Name>\w+)(\((?P<Args>[^\)]*)\))?: (?P<Type>.*)$`)
	m := getParams(fieldRegexp, t)

	field := &graphql.InputObjectFieldConfig{}
	field.Type = parseGraphQLType(m["Type"], typeMap, inputTypeMap)
	return m["Name"], field
}

func parseGraphQLField(t string, typeMap *map[string]*graphql.Object, inputTypeMap *map[string]*graphql.InputObject) (string, *graphql.Field) {
	fieldRegexp := regexp.MustCompile(`^(?P<Name>\w+)(\((?P<Args>[^\)]*)\))?: (?P<Type>.*)$`)
	m := getParams(fieldRegexp, t)

	field := &graphql.Field{}
	field.Type = parseGraphQLType(m["Type"], typeMap, inputTypeMap)
	if m["Args"] != "" {
		field.Args = parseGraphQLArguments(m["Args"], typeMap, inputTypeMap)
	}
	return m["Name"], field
}

func parseGraphQLType(s string, typeMap *map[string]*graphql.Object, inputTypeMap *map[string]*graphql.InputObject) graphql.Type {
	nonNullRegexp := regexp.MustCompile(`^(?P<Match>.*)!$`)
	listRegexp := regexp.MustCompile(`^\[(?P<Match>[^\]]+)\]$`)
	if (*typeMap)[s] != nil {
		return (*typeMap)[s]
	}
	if (*inputTypeMap)[s] != nil {
		return (*inputTypeMap)[s]
	}
	if m := getParams(nonNullRegexp, s); len(m) != 0 {
		return graphql.NewNonNull(parseGraphQLType(m["Match"], typeMap, inputTypeMap))
	}
	if m := getParams(listRegexp, s); len(m) != 0 {
		return graphql.NewList(parseGraphQLType(m["Match"], typeMap, inputTypeMap))
	}
	switch s {
	case "Int":
		return graphql.Int
	case "Float":
		return graphql.Float
	case "String":
		return graphql.String
	case "Boolean":
		return graphql.Boolean
	case "ID":
		return graphql.ID
	default:
		// TODO: throw error
		return graphql.NewObject(graphql.ObjectConfig{})
	}
}

func parseGraphQLArguments(s string, typeMap *map[string]*graphql.Object, inputTypeMap *map[string]*graphql.InputObject) graphql.FieldConfigArgument {
	argumentRegexp := regexp.MustCompile("^ *(?P<Name>[^: ]+) *: *(?P<Type>[^= ]+)( *= *(?P<Default>[^ ]*))? *$")
	config := &graphql.FieldConfigArgument{}
	for _, argParams := range strings.Split(s, ",") {
		m := getParams(argumentRegexp, argParams)
		arg := &graphql.ArgumentConfig{}
		arg.Type = parseGraphQLType(m["Type"], typeMap, inputTypeMap)
		if m["Default"] != "" {
			arg.DefaultValue = m["Default"]
		}
		(*config)[m["Name"]] = arg
	}
	return *config
}
