package models

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/cazinge/playroll/services/gqltag"

	"github.com/jinzhu/gorm"
)

type User struct {
	Model
	Name                    string
	Avatar                  string
	Email                   string
	AccountType             string
	Playrolls               []Playroll
	IdentityCredentials     []IdentityCredential
	MusicServiceCredentials []MusicServiceCredential
	Relationships           []Relationship
	Recommendations         []Recommendation
	DiscoveryQueues         []DiscoveryQueue
}

type UserInput struct {
	Name        string `gql:"name: String"`
	Avatar      string `gql:"avatar: String"`
	Email       string `gql:"email: String"`
	AccountType string `gql:"accountType: String"`
}

type UserOutput struct {
	Model                   `gql:"MODEL"`
	Name                    string                         `gql:"name: String"`
	Avatar                  string                         `gql:"avatar: String"`
	Email                   string                         `gql:"email: String"`
	AccountType             string                         `gql:"accountType: String"`
	Playrolls               []PlayrollOutput               `gql:"playrolls: [Playroll]"`
	IdentityCredentials     []IdentityCredentialOutput     `gql:"identityCredentials: [IdentityCredential]"`
	MusicServiceCredentials []MusicServiceCredentialOutput `gql:"musicServiceCredentials: [MusicServiceCredential]"`
	Relationships           []RelationshipOutput           `gql:"relationships: [Relationship]"`
	Recommendations         []RecommendationOutput         `gql:"recommendations: [Recommendation]"`
	DiscoveryQueues         []DiscoveryQueueOutput         `gql:"discoveryQueues: [DiscoveryQueue]"`
}

// Utility Methods

func CreateUserWithIdentityCredential(userInput *UserInput, identityCredentialInput *IdentityCredentialInput, db *gorm.DB) (*UserOutput, error) {
	tx := db.Begin()
	uDAO := InitUserDAO(tx)

	user, err := userInput.ToModel()
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	rawUser, err := uDAO.Create(user)
	if err != nil {
		return nil, err
	}
	userOutput, err := FormatUser(rawUser)

	icDAO := InitIdentityCredentialDAO(tx)

	identityCredentialInput.UserID = strconv.Itoa(int(userOutput.ID))
	identityCredential, err := identityCredentialInput.ToModel()
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	rawIdentityCredential, err := icDAO.Create(identityCredential)
	if err != nil {
		return nil, err
	}
	identityCredentialOutput, err := FormatIdentityCredential(rawIdentityCredential)

	err = tx.Commit().Error
	if err != nil {
		return nil, err
	}
	userOutput.IdentityCredentials = append(userOutput.IdentityCredentials, *identityCredentialOutput)
	fmt.Println(userOutput)
	return userOutput, nil
}

func FindUserByIdentityCredential(provider, identifier string, db *gorm.DB) (*UserOutput, error) {
	ic := &IdentityCredential{}
	if err := db.Where(&IdentityCredential{Provider: provider, Identifier: identifier}).First(ic).Error; err != nil {
		fmt.Println(err)
		return nil, err
	}
	userModel := &User{}
	if err := db.First(userModel, ic.UserID).Error; err != nil {
		fmt.Println(err)
		return nil, err
	}
	user, err := UserModelToOutput(userModel)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func AuthorizeUser(mctx *gqltag.MethodContext) (*UserOutput, error) {
	// Unauthenticated
	authenticated := mctx.Request.RequestContext.Identity.CognitoAuthenticationType == "authenticated"
	if !authenticated {
		return nil, fmt.Errorf("current user is unauthenticated")
	}

	// Cognito User Pool
	provider := mctx.Request.RequestContext.Identity.CognitoAuthenticationProvider
	userPoolID := "us-west-2_u1L3OQa8W" //TODO(cazinge): Use environment variables here.
	cognitoUserPoolPrefix := fmt.Sprintf("cognito-idp.us-west-2.amazonaws.com/%v,cognito-idp.us-west-2.amazonaws.com/%v:CognitoSignIn:", userPoolID, userPoolID)
	if strings.HasPrefix(provider, cognitoUserPoolPrefix) {
		cognitoUserPoolSub := strings.TrimPrefix(provider, cognitoUserPoolPrefix)
		fmt.Println(cognitoUserPoolSub)
		user, err := FindUserByIdentityCredential("CognitoUserPool", cognitoUserPoolSub, mctx.DB)
		if err != nil {
			fmt.Println(err)
			return nil, fmt.Errorf("could not find matching user in database")
		}
		return user, nil
	}

	return nil, fmt.Errorf("could not find matching user in database")
}

// Entity Specific Methods

func UserInputToModel(ui *UserInput) (*User, error) {
	u := &User{}
	u.Name = ui.Name
	u.Avatar = ui.Avatar
	u.Email = ui.Email
	u.AccountType = ui.AccountType
	return u, nil
}

func UserOutputToModel(uo *UserOutput) (*User, error) {
	return nil, fmt.Errorf("UserOutputToModel Not Implemented")
}

func UserModelToOutput(u *User) (*UserOutput, error) {
	uo := &UserOutput{}
	uo.Model = u.Model
	uo.Name = u.Name
	uo.Avatar = u.Avatar
	uo.Email = u.Email
	uo.AccountType = u.AccountType
	playrolls, err := FormatPlayrollSlice(&u.Playrolls)
	if err != nil {
		return nil, err
	}
	uo.Playrolls = playrolls
	identityCredentials, err := FormatIdentityCredentialSlice(&u.IdentityCredentials)
	if err != nil {
		return nil, err
	}
	uo.IdentityCredentials = identityCredentials
	musicServiceCredentials, err := FormatMusicServiceCredentialSlice(&u.MusicServiceCredentials)
	if err != nil {
		return nil, err
	}
	uo.MusicServiceCredentials = musicServiceCredentials
	relationships, err := FormatRelationshipSlice(&u.Relationships)
	if err != nil {
		return nil, err
	}
	uo.Relationships = relationships
	recommendations, err := FormatRecommendationSlice(&u.Recommendations)
	if err != nil {
		return nil, err
	}
	uo.Recommendations = recommendations
	discoveryQueues, err := FormatDiscoveryQueueSlice(&u.DiscoveryQueues)
	if err != nil {
		return nil, err
	}
	uo.DiscoveryQueues = discoveryQueues

	return uo, nil
}

func InitUserDAO(db *gorm.DB) *User {
	dao := &User{}
	dao.SetEntity(dao)
	dao.SetDB(db)
	return dao
}

func FormatUser(val interface{}) (*UserOutput, error) {
	u, ok := val.(*User)
	if !ok {
		return nil, fmt.Errorf("error converting to User")
	}
	return UserModelToOutput(u)
}

func FormatUserSlice(val interface{}) ([]UserOutput, error) {
	us, ok := val.(*[]User)
	if !ok {
		return nil, fmt.Errorf("error converting to User Slice")
	}
	output := []UserOutput{}
	for _, u := range *us {
		uo, err := UserModelToOutput(&u)
		if err != nil {
			return nil, err
		}
		output = append(output, *uo)
	}
	return output, nil
}

// Interface Generalization Methods

func (ui *UserInput) ToModel() (Entity, error) {
	return UserInputToModel(ui)
}

func (uo *UserOutput) ToModel() (Entity, error) {
	return UserOutputToModel(uo)
}

func (u *User) ToOutput() (EntityOutput, error) {
	return UserModelToOutput(u)
}

func (_ *User) InitDAO(db *gorm.DB) Entity {
	return InitUserDAO(db)
}

func (_ *User) Format(val interface{}) (EntityOutput, error) {
	return FormatUser(val)
}

func (_ *User) FormatSlice(val interface{}) (interface{}, error) {
	return FormatUserSlice(val)
}
