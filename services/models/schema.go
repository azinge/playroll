package main

import (
	"github.com/cazinge/playroll/services/schema"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
)

type Method struct {
	Request       func(params graphql.ResolveParams, db *gorm.DB) (interface{}, error)
	Documentation string
	Scope         string
}

type Query struct{ Method }

func LinkQuery(method Method) *Query {
	return &Query{Method: method}
}

type Mutation struct{ Method }

func LinkMutation(method Method) *Mutation {
	return &Mutation{Method: method}
}

type Types struct {
	Playroll *schema.Playroll
}

type Methods struct {
	PlayrollMethods
}

func main() {
	Types := &Types{
		Playroll: &schema.Playroll{},
	}
	Methods := &Methods{
		PlayrollMethods: LinkedPlayrollMethods,
	}
}
