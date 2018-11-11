package schema

import (
	"fmt"

	"github.com/cazinge/playroll/services/utils"
	"github.com/cazinge/playroll/services/utils/pagination"
	"github.com/cazinge/playroll/services/utils/search"
	"github.com/graphql-go/graphql"
	"github.com/jinzhu/gorm"
	"github.com/zmb3/spotify"
)

type ExternalCredentials struct {
	utils.Model `gql:"MODEL"`
	Provider    ProviderType `gql:"provider: String"`
	User        User
	UserID      uint
	Token       Token `gql:"token: Token" gorm:"type: jsonb;not null"`
}

type ExternalCredentialsMethods struct {
	GetExternalCredentials    *utils.Query    `gql:"externalCredentials(id: ID!): ExternalCredentials"`
	SearchExternalCredentials *utils.Query    `gql:"searchExternalCredentials(options: SearchInput!): [ExternalCredentials]"`
	ListExternalCredentials   *utils.Query    `gql:"listExternalCredentials(options: PaginationInput!): [ExternalCredentials]"`
	CreateExternalCredentials *utils.Mutation `gql:"createExternalCredentials(credentials: CreateExternalCredentialsInput!): ExternalCredentials"`
	DeleteExternalCredentials *utils.Mutation `gql:"deleteExternalCredentials(id: ID!): ExternalCredentials"`
}

func getExternalCredentials(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var externalCredentials ExternalCredentials
	if err := utils.HandleGetSingularModel(params, db, &externalCredentials); err != nil {
		return nil, err
	}
	return externalCredentials, nil
}

func searchExternalCredentials(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var extCreds []ExternalCredentials
	if err := search.Query(params, db, &extCreds); err != nil {
		return nil, err
	}
	return extCreds, nil
}

func listExternalCredentials(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	var externalCredentials []ExternalCredentials
	pagination.HandlePagination(params, db, &externalCredentials)
	return externalCredentials, nil
}

type CreateExternalCredentialsInput struct {
	UserID   string `gql:"userID: String"`
	Provider string `gql:"provider: String"`
}

func createExternalCredentials(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	user := &User{}

	userID, ok := params.Args["credentials"].(map[string]interface{})["userID"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("userID")
	}

	provider, ok := params.Args["credentials"].(map[string]interface{})["provider"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("provider")
	}

	if err := db.Preload("ExternalCredentials").First(&user, "id = ?", userID).Error; err != nil {
		fmt.Println("error preloading ExtCreds for User: " + err.Error())
		return nil, err
	}

	redirectURL := "http://localhost:4444/callback"
	spotifyScopes := []string{
		spotify.ScopeUserReadPrivate,
		spotify.ScopeUserLibraryRead,
		spotify.ScopeUserReadEmail,
		spotify.ScopePlaylistModifyPublic,
		spotify.ScopePlaylistModifyPrivate,
	}

	auth := spotify.NewAuthenticator(redirectURL, spotifyScopes...)
	url := auth.AuthURL("")
	fmt.Println(url)

	// NOTE: For now we need to enter the authURL and change the value below to create
	// a fresh access token before generating a tracklist.
	providerToken, _ := auth.Exchange(
		"AQAYpgkLbX-XSRm9XCHA3gi2220IrfHA8ld48COF2tJZTBr626A0B2RcSZ-vGaXMLYd10LcegAj8dfKMfsY5ttIQHUyQhuFA4C-KpUMePqi50AecvEF8ceBhfC4usI33pmPrv3XrTrOdc4A1ZHJdOxykKo0OeM_59QJkDECNz7TgIpsRjhbuCfNmmYhpiIvaizZnTT5nb0j1BI1VLKGaG9qXO3nWQl3XUw1rWmh-tgf5zM-q2YC_r9FBBEK4Xh6B7yyp8ZazdsuMNNKMsZRnv21WOv6ryYtvSgLU9YwHr6rSLPULaYKM77SZ4Xps-N9gcPlWCn4XPhLxnt7PblU",
	)
	token := Token{
		AccessToken:  providerToken.AccessToken,
		RefreshToken: providerToken.RefreshToken,
		TokenType:    providerToken.TokenType,
		Expiry:       providerToken.Expiry,
	}
	extCreds := &ExternalCredentials{
		Provider: ProviderType(provider),
		Token:    token,
	}

	db.Model(&user).Association("ExternalCredentials").Append(extCreds)
	return extCreds, nil
}

func deleteExternalCredentials(params graphql.ResolveParams, db *gorm.DB) (interface{}, error) {
	ExternalCredentials := &ExternalCredentials{}

	id, ok := params.Args["id"].(string)
	if !ok {
		return nil, utils.HandleTypeAssertionError("id")
	}

	if err := db.Where("id = ?", id).First(&ExternalCredentials).Error; err != nil {
		fmt.Println("Error deleting ExternalCredentials: " + err.Error())
		return nil, err
	}

	associationsToRemove := []string{"User"}
	utils.HandleRemoveAssociationReferences(db, ExternalCredentials, associationsToRemove)
	db.Delete(&ExternalCredentials)
	return ExternalCredentials, nil
}

var ExternalCredentialsEntity = &utils.Entity{
	Name:  "ExternalCredentials",
	Model: &ExternalCredentials{},
	Methods: &ExternalCredentialsMethods{
		GetExternalCredentials:    &utils.Query{Request: getExternalCredentials, Scope: "Public"},
		SearchExternalCredentials: &utils.Query{Request: searchExternalCredentials, Scope: "Public"},
		ListExternalCredentials:   &utils.Query{Request: listExternalCredentials, Scope: "Admin"},
		CreateExternalCredentials: &utils.Mutation{Request: createExternalCredentials, Scope: "Admin"},
		DeleteExternalCredentials: &utils.Mutation{Request: deleteExternalCredentials, Scope: "Admin"},
	},
	Types: &[]*utils.Type{
		&utils.Type{Name: "CreateExternalCredentialsInput", IsInput: true, Model: &CreateExternalCredentialsInput{}},
	},
}
