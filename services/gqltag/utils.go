package gqltag

import (
	"unicode"

	"github.com/aws/aws-lambda-go/events"
	ast "github.com/graphql-go/graphql/language/ast"
	"github.com/jinzhu/gorm"

	"github.com/graphql-go/graphql"
)

type Type struct {
	Fields      interface{}
	Description string
}

type Input struct{ Type }

func LinkInput(t Type) *Input {
	return &Input{Type: t}
}

type Output struct{ Type }

func LinkOutput(t Type) *Output {
	return &Output{Type: t}
}

type MethodContext struct {
	DB      *gorm.DB
	Request events.APIGatewayProxyRequest
}
type Method struct {
	Request     func(params graphql.ResolveParams, mctx *MethodContext) (interface{}, error)
	Description string
	Scope       string
}

type Query struct{ Method }

func LinkQuery(m Method) *Query {
	return &Query{Method: m}
}

type Mutation struct{ Method }

func LinkMutation(m Method) *Mutation {
	return &Mutation{Method: m}
}

func GetSelectedFields(selectionPath []string,
	resolveParams graphql.ResolveParams) []string {
	fields := resolveParams.Info.FieldASTs
	for _, propName := range selectionPath {
		found := false
		for _, field := range fields {
			if field.Name.Value == propName {
				selections := field.SelectionSet.Selections
				fields = make([]*ast.Field, 0)
				for _, selection := range selections {
					fields = append(fields, selection.(*ast.Field))
				}
				found = true
				break
			}
		}
		if !found {
			return []string{}
		}
	}
	var collect []string
	for _, field := range fields {
		collect = append(collect, field.Name.Value)
	}
	return collect
}

func LowercaseFirst(str string) string {
	for i, v := range str {
		return string(unicode.ToLower(v)) + str[i+1:]
	}
	return ""
}
