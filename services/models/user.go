package models

import (
	"fmt"
	"strconv"

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
	ExternalCredentials     []ExternalCredential
	Friendships             []Friendship
	Recommendations         []Recommendation
	DiscoveryQueue          *DiscoveryQueue
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
	ExternalCredentials     []ExternalCredentialOutput     `gql:"externalCredentials: [ExternalCredential]"` //DEPRECATED
	Friendships             []FriendshipOutput             `gql:"friendships: [Friendship]"`
	Recommendations         []RecommendationOutput         `gql:"recommendation: [Recommendation]"`
	DiscoveryQueue          *DiscoveryQueueOutput          `gql:"discoveryQueue: DiscoveryQueue"`
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

func FindUserByIdentityCredential(provider, identifier string, db *gorm.DB) (*User, error) {
	ic := &IdentityCredential{}
	if err := db.Where(&IdentityCredential{Provider: provider, Identifier: identifier}).First(ic).Error; err != nil {
		fmt.Println(err)
		return nil, err
	}
	user := &User{}
	if err := db.First(user, ic.UserID).Error; err != nil {
		fmt.Println(err)
		return nil, err
	}
	return user, nil
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
	externalCredentials, err := FormatExternalCredentialSlice(&u.ExternalCredentials)
	if err != nil {
		return nil, err
	}
	uo.ExternalCredentials = externalCredentials
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
	friendships, err := FormatFriendshipSlice(&u.Friendships)
	if err != nil {
		return nil, err
	}
	uo.Friendships = friendships
	recommendations, err := FormatRecommendationSlice(&u.Recommendations)
	if err != nil {
		return nil, err
	}
	uo.Recommendations = recommendations

	// discoveryQueue, err := FormatDiscoveryQueue(u.DiscoveryQueue)
	// if err != nil {
	// 	return nil, err
	// }
	// uo.DiscoveryQueue = discoveryQueue

	return uo, nil
}

func InitUserDAO(db *gorm.DB) *User {
	dao := &User{}
	dao.SetEntity(dao)
	dao.SetDB(db.Preload("IdentityCredentials"))
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
