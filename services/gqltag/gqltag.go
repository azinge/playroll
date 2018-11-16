package gqltag

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/fatih/structs"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

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

func addObjectToTypeMap(typeName string, isInput bool, typeMap *map[string]*graphql.Object, inputTypeMap *map[string]*graphql.InputObject) {
	if isInput {
		(*inputTypeMap)[typeName] = graphql.NewInputObject(graphql.InputObjectConfig{Name: typeName, Fields: graphql.InputObjectConfigFieldMap{}})
	} else {
		(*typeMap)[typeName] = graphql.NewObject(graphql.ObjectConfig{Name: typeName, Fields: graphql.Fields{}})
	}
}

func addFieldToTypeMap(typeName string, isInput bool, field *structs.Field, typeMap *map[string]*graphql.Object, inputTypeMap *map[string]*graphql.InputObject) {
	if isInput {
		name, gqlField := parseGraphQLInputField(field.Tag("gql"), typeMap, inputTypeMap)
		(*inputTypeMap)[typeName].AddFieldConfig(name, gqlField)
	} else {
		name, gqlField := parseGraphQLField(field.Tag("gql"), typeMap, inputTypeMap)
		(*typeMap)[typeName].AddFieldConfig(name, gqlField)
	}
}

func initializeTypeMapFromStruct(struc interface{}, typeMap *map[string]*graphql.Object, inputTypeMap *map[string]*graphql.InputObject) {
	types := structs.New(struc)
	typelist := types.Fields()

	for _, t := range typelist {
		if t.Tag("gql") == "GROUP" {
			initializeTypeMapFromStruct(t.Value(), typeMap, inputTypeMap)
		} else {
			name := t.Tag("gql")
			description := t.Field("Description").Value().(string)
			switch structs.Name(t.Value()) {
			case "Output":
				(*typeMap)[name] = graphql.NewObject(graphql.ObjectConfig{Name: name, Fields: graphql.Fields{}, Description: description})
			case "Input":
				(*inputTypeMap)[name] = graphql.NewInputObject(graphql.InputObjectConfig{Name: name, Fields: graphql.InputObjectConfigFieldMap{}, Description: description})
			}
		}
	}
}

func addFieldsFromStruct(struc interface{}, typeName, objType string, typeMap *map[string]*graphql.Object, inputTypeMap *map[string]*graphql.InputObject) {
	t := structs.New(struc)
	fieldlist := t.Fields()
	for _, field := range fieldlist {
		//TODO: Recursive form of gorm model destructuring with embedded resolve aka "GROUP"
		if field.Tag("gql") == "MODEL" {
			modelfieldlist := structs.Fields(t.Field("Model").Value())
			for _, modelfield := range modelfieldlist {
				name, gqlField := parseGraphQLField(modelfield.Tag("gql"), typeMap, inputTypeMap)
				gqlField.Resolve = generateResolveFromModelField(modelfield.Name())
				(*typeMap)[typeName].AddFieldConfig(name, gqlField)
			}
		} else if field.Tag("gql") != "" {
			switch objType {
			case "Output":
				name, gqlField := parseGraphQLField(field.Tag("gql"), typeMap, inputTypeMap)
				(*typeMap)[typeName].AddFieldConfig(name, gqlField)
			case "Input":
				name, gqlField := parseGraphQLInputField(field.Tag("gql"), typeMap, inputTypeMap)
				(*inputTypeMap)[typeName].AddFieldConfig(name, gqlField)
			}
		}
	}
}

func populateTypeMapFieldsFromStruct(struc interface{}, typeMap *map[string]*graphql.Object, inputTypeMap *map[string]*graphql.InputObject) {
	types := structs.New(struc)
	typelist := types.Fields()
	for _, t := range typelist {
		tag := t.Tag("gql")
		if tag == "GROUP" {
			populateTypeMapFieldsFromStruct(t.Value(), typeMap, inputTypeMap)
		} else {
			name := t.Tag("gql")
			addFieldsFromStruct(t.Field("Fields").Value(), name, structs.Name(t.Value()), typeMap, inputTypeMap)
		}
	}
}

func populateMethodsFromStruct(struc interface{}, db *gorm.DB, rootQuery, rootMutation *graphql.Object, typeMap *map[string]*graphql.Object, inputTypeMap *map[string]*graphql.InputObject) {
	methods := structs.New(struc)
	methodlist := methods.Fields()
	for _, m := range methodlist {
		tag := m.Tag("gql")
		if tag == "GROUP" {
			populateMethodsFromStruct(m.Value(), db, rootQuery, rootMutation, typeMap, inputTypeMap)
		} else {
			name, gqlField := parseGraphQLField(tag, typeMap, inputTypeMap)
			gqlField.Resolve = generateResolveFromMethod(m, db)
			gqlField.Description = m.Field("Description").Value().(string)
			switch structs.Name(m.Value()) {
			case "Query":
				rootQuery.AddFieldConfig(name, gqlField)
			case "Mutation":
				rootMutation.AddFieldConfig(name, gqlField)
			}
		}
	}
}

//TODO: Support internal Methods/Resolvers
func GenerateGraphQLSchema(types interface{}, methods interface{}, db *gorm.DB) (graphql.Schema, error) {
	typeMap := map[string]*graphql.Object{}
	inputTypeMap := map[string]*graphql.InputObject{}

	initializeTypeMapFromStruct(types, &typeMap, &inputTypeMap)
	populateTypeMapFieldsFromStruct(types, &typeMap, &inputTypeMap)

	rootQuery := graphql.NewObject(graphql.ObjectConfig{Name: "Query", Fields: graphql.Fields{}})
	rootMutation := graphql.NewObject(graphql.ObjectConfig{Name: "Mutation", Fields: graphql.Fields{}})

	populateMethodsFromStruct(methods, db, rootQuery, rootMutation, &typeMap, &inputTypeMap)

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
	field.Type, _ = parseGraphQLType(m["Type"], typeMap, inputTypeMap)
	return m["Name"], field
}

func parseGraphQLField(t string, typeMap *map[string]*graphql.Object, inputTypeMap *map[string]*graphql.InputObject) (string, *graphql.Field) {
	fieldRegexp := regexp.MustCompile(`^(?P<Name>\w+)(\((?P<Args>[^\)]*)\))?: (?P<Type>.*)$`)
	m := getParams(fieldRegexp, t)

	field := &graphql.Field{}
	field.Type, _ = parseGraphQLType(m["Type"], typeMap, inputTypeMap)
	if m["Args"] != "" {
		field.Args = parseGraphQLArguments(m["Args"], typeMap, inputTypeMap)
	}
	return m["Name"], field
}

func parseGraphQLType(s string, typeMap *map[string]*graphql.Object, inputTypeMap *map[string]*graphql.InputObject) (graphql.Type, error) {
	nonNullRegexp := regexp.MustCompile(`^(?P<Match>.*)!$`)
	listRegexp := regexp.MustCompile(`^\[(?P<Match>[^\]]+)\]$`)
	if (*typeMap)[s] != nil {
		return (*typeMap)[s], nil
	}
	if (*inputTypeMap)[s] != nil {
		return (*inputTypeMap)[s], nil
	}
	if m := getParams(nonNullRegexp, s); len(m) != 0 {
		t, err := parseGraphQLType(m["Match"], typeMap, inputTypeMap)
		if err != nil {
			return nil, err
		}
		return graphql.NewNonNull(t), nil
	}
	if m := getParams(listRegexp, s); len(m) != 0 {
		t, err := parseGraphQLType(m["Match"], typeMap, inputTypeMap)
		if err != nil {
			return nil, err
		}
		return graphql.NewList(t), nil
	}
	switch s {
	case "Int":
		return graphql.Int, nil
	case "Float":
		return graphql.Float, nil
	case "String":
		return graphql.String, nil
	case "Boolean":
		return graphql.Boolean, nil
	case "ID":
		return graphql.ID, nil
	default:
		err := fmt.Errorf("Could not find type: %s", s)
		// TODO: Investigate why multiple errors are getting created with ""
		if s != "" {
			fmt.Println(err)
		}
		return nil, err
	}
}

func parseGraphQLArguments(s string, typeMap *map[string]*graphql.Object, inputTypeMap *map[string]*graphql.InputObject) graphql.FieldConfigArgument {
	argumentRegexp := regexp.MustCompile("^ *(?P<Name>[^: ]+) *: *(?P<Type>[^= ]+)( *= *(?P<Default>[^ ]*))? *$")
	config := &graphql.FieldConfigArgument{}
	for _, argParams := range strings.Split(s, ",") {
		m := getParams(argumentRegexp, argParams)
		arg := &graphql.ArgumentConfig{}
		arg.Type, _ = parseGraphQLType(m["Type"], typeMap, inputTypeMap)
		if m["Default"] != "" {
			arg.DefaultValue = m["Default"]
		}
		(*config)[m["Name"]] = arg
	}
	return *config
}
