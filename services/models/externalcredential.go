package models

import (
	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/cazinge/playroll/services/utils"
)

type ExternalCredential struct {
	Model    `gql:"MODEL"`
	Provider string           `gql:"provider: String"`
	User     User             `gql:"user: User"`
	UserID   uint             `gql:"userID: ID"`
	Token    jsonmodels.Token `gql:"token: Token" gorm:"type: jsonb;not null"`
}

type ExternalCredentialInput struct {
	Provider string                `gql:"provider: String"`
	UserID   string                `gql:"userID: String"`
	Token    jsonmodels.TokenInput `gql:"token: TokenInput"`
}

type ExternalCredentialOutput struct {
	Model    `gql:"MODEL"`
	Provider string                 `gql:"provider: String"`
	User     User                   `gql:"user: User"`
	UserID   uint                   `gql:"userID: ID"`
	Token    jsonmodels.TokenOutput `gql:"token: Token" gorm:"type: jsonb;not null"`
}

func (eci *ExternalCredentialInput) ToModel() (*ExternalCredential, error) {
	ec := &ExternalCredential{}
	ec.Provider = eci.Provider
	ec.UserID = utils.StringIDToNumber(eci.UserID)
	data, err := eci.Token.ToModel()
	if err != nil {
		return nil, err
	}
	ec.Token = *data
	return ec, nil
}

func (ec *ExternalCredential) ToOutput() (*ExternalCredentialOutput, error) {
	eco := &ExternalCredentialOutput{}
	eco.Model = ec.Model
	eco.Provider = ec.Provider
	eco.User = ec.User
	eco.UserID = ec.UserID
	data, err := ec.Token.ToOutput()
	if err != nil {
		return nil, err
	}
	eco.Token = *data
	return eco, nil
}

func (ec *ExternalCredentialInput) CreateExternalCredentialFromInputFields() *ExternalCredential {
	externalCredential := &ExternalCredential{}
	externalCredential.Provider = ec.Provider
	// externalCredential.Token = ec.Token
	externalCredential.UserID = utils.StringIDToNumber(ec.UserID)
	return externalCredential
}
