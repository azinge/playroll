package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/pagination"
	"github.com/cazinge/playroll/services/utils"
)

type Playroll struct {
	utils.Model `gql:"MODEL"`
	Name        string `gql:"name: String"`
}

type CreatePlayrollInput struct {
	Name string `gql:"name: String"`
}

type UpdatePlayrollInput struct {
	ID   string `gql:"id: ID!"`
	Name string `gql:"name: String"`
}

type PlayrollMethods struct {
	GetPlayroll     *utils.Query    `gql:"playroll(id: ID!): Playroll"`
	SearchPlayrolls *utils.Query    `gql:"searchPlayrolls(query: String!): [Playroll]"`
	ListPlayrolls   *utils.Query    `gql:"listPlayrolls(options: ListInput!): [Playroll]"`
	CreatePlayroll  *utils.Mutation `gql:"createPlayroll(playroll: CreatePlayrollInput!): Playroll"`
	UpdatePlayroll  *utils.Mutation `gql:"updatePlayroll(playroll: UpdatePlayrollInput!): Playroll"`
	DeletePlayroll  *utils.Mutation `gql:"deletePlayroll(id: ID!): Playroll"`
}

func (p *Playroll) Get(id string) (*Playroll, error) {
	playroll := &Playroll{}
	db := p.DB()
	if err := db.Where("id = ?", id).First(&playroll).Error; err != nil {
		fmt.Println("Error getting playroll: " + err.Error())
		return nil, err
	}
	return playroll, nil
}

func (p *Playroll) Search() ([]Playroll, error) {
	return []Playroll{Playroll{}, Playroll{}}, nil
}

// TODO: replace with graphql formatted ListInput rather than pagination.Options
func (p *Playroll) List(input pagination.Options) ([]Playroll, error) {
	var playrolls []Playroll
	db := p.DB()
	paginator := pagination.Paginator{DB: db}
	err := paginator.Paginate(&playrolls, &input) // review actually returning a response for performance purposes
	if err != nil {
		fmt.Println("Error listing playrolls: " + err.Error())
		return nil, err
	}
	return playrolls, nil
}

func (p *Playroll) Create(input CreatePlayrollInput) (*Playroll, error) {
	playroll := &Playroll{Name: input.Name}
	db := p.DB()
	if err := db.Create(&playroll).Error; err != nil {
		fmt.Println("Error creating playroll: " + err.Error())
		return nil, err
	}
	return playroll, nil
}

func (p *Playroll) Update(input UpdatePlayrollInput) (*Playroll, error) {
	playroll := &Playroll{}
	db := p.DB()
	if err := db.Where("id = ?", input.ID).First(&playroll).Error; err != nil {
		fmt.Println("getting playroll to update: " + err.Error())
		return nil, err
	}
	playroll.Name = input.Name
	if err := db.Save(&playroll).Error; err != nil {
		fmt.Println("error updating playroll: " + err.Error())
		return nil, err
	}
	return playroll, nil
}

func (p *Playroll) Delete(id string) (*Playroll, error) {
	playroll := &Playroll{}
	db := p.DB()
	if err := db.Where("id = ?", id).First(&playroll).Error; err != nil {
		fmt.Println("Error deleting playroll: " + err.Error())
		return nil, err
	}
	db.Delete(&playroll)
	return playroll, nil
}
