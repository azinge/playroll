package main

import (
	"fmt"
	"time"

	"github.com/fatih/structs"
)

type Model struct {
	ID        uint       `json:"id" gorm:"primary_key" gql:"id: ID!"`
	CreatedAt time.Time  `json:"created_at" gql:"created_at: String!"`
	UpdatedAt time.Time  `json:"updated_at" gql:"updated_at: String!"`
	DeletedAt *time.Time `json:"deleted_at" gql:"deleted_at: String!"`
}

func createGraphQLEntity(entity interface{}, methods interface{}) string {
	e := structs.New(entity)
	name := e.Name()
	fieldlist := e.Fields()
	for _, field := range fieldlist {
		if field.Tag("gql") == "MODEL" {
			modelfieldlist := structs.Fields(e.Field("Model").Value())
			for _, modelfield := range modelfieldlist {
				fmt.Printf("%+v\n", modelfield.Tag("gql"))
			}
		} else if field.Tag("gql") != "" {
			fmt.Printf("%+v\n", field.Tag("gql"))
		}
	}
	methodlist := structs.Fields(methods)
	for _, method := range methodlist {
		fmt.Printf("%+v\n", method.Tag("gql"))
	}
	fmt.Printf("%+v", name)
	return "\nHello World!\n"
}

func parseSimpleGraphQLType(t string) {
	fmt.Print(t)
}

type Playroll struct {
	Model `gql:"MODEL"`
	Name  string `json:"name" gql:"name: String!"`
}

type PlayrollMethods struct {
	GetPlayroll      func() `gql:"playroll: Playroll"`
	SearchPlayrolls  func() `gql:"searchPlayrolls: Playroll"`
	ListPlayrolls    func() `gql:"listPlayrolls: Playroll"`
	CreatePlayroll   func() `gql:"createPlayroll: Playroll"`
	UpdatePlayroll   func() `gql:"updatePlayroll: Playroll"`
	DeletePlayroll   func() `gql:"deletePlayroll: Playroll"`
	GenerateSonglist func() `gql:"generateSonglist: Playroll"`
}

func main() {
	resp := createGraphQLEntity(&Playroll{}, &PlayrollMethods{})
	parseSimpleGraphQLType("a")
	fmt.Print(resp)
}
