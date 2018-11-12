package schema

import (
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
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

type Method struct {
	Request     func(params graphql.ResolveParams, db *gorm.DB) (interface{}, error)
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
