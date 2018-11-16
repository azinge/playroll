package models

import "github.com/cazinge/playroll/services/utils"

type ExternalCredential struct {
	Model    `gql:"MODEL"`
	Provider string `gql:"provider: String"`
	Token    Token  `gql:"token: Token" gorm:"type: jsonb;not null"`
	User     User   `gql:"user: User"`
	UserID   uint   `gql:"userID: ID"`
}

type ExternalCredentialInput struct {
	Provider string `gql:"provider: String"`
	Token    Token  `gql:"token: TokenInput"`
	UserID   string `gql:"userID: String"`
}

func (ec *ExternalCredentialInput) CreateExternalCredentialFromInputFields() *ExternalCredential {
	externalCredential := &ExternalCredential{}
	externalCredential.Provider = ec.Provider
	externalCredential.Token = ec.Token
	externalCredential.UserID = utils.StringIDToNumber(ec.UserID)
	return externalCredential
}
