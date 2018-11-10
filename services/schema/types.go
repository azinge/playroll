package schema

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/cazinge/playroll/services/utils"
	"github.com/lib/pq"
)

type Song struct {
	Name        string      `gql:"name: String"`
	MusicSource MusicSource `gql:"musicSource: MusicSource" gorm:"type:jsonb;not null"`
}

func (s *Song) String() string {
	return fmt.Sprintf("SONG<%s (%s)>", s.Name, s.MusicSource)
}

type Artist struct {
	Title       string      `gql:"title: String"`
	MusicSource MusicSource `gql:"musicSource: MusicSource" gorm:"type:jsonb;not null"`
}

func (a *Artist) String() string {
	return fmt.Sprintf("ARTIST<%s (%s)>", a.Title, a.MusicSource)
}

type Album struct {
	Name        string      `gql:"name: String"`
	MusicSource MusicSource `gql:"musicSource: MusicSource" gorm:"type:jsonb;not null"`
}

func (a *Album) String() string {
	return fmt.Sprintf("ALBUM<%s (%s)>", a.Name, a.MusicSource)
}

type RollFilter struct {
	Type          string         `gql:"type: String" json:"type"`
	Modifications pq.StringArray `gql:"modifications: [String]" json:"modifications"`
}

var RollFilterType = &utils.Type{Name: "RollFilter", Model: RollFilter{}}
var RollFilterInputType = &utils.Type{Name: "RollFilterInput", IsInput: true, Model: RollFilter{}}

func (rf RollFilter) Value() (driver.Value, error) {
	value, err := json.Marshal(rf)
	if err != nil {
		printError := fmt.Sprintf("Error trying to Marshal RollFilter: " + err.Error())
		fmt.Println(printError)
		return nil, errors.New(printError)
	}
	return string(value), nil
}

func (rf *RollFilter) Scan(value interface{}) error {
	if err := json.Unmarshal(value.([]byte), &rf); err != nil {
		printError := fmt.Sprintf("Error trying to Unmarshal RollFilter: " + err.Error())
		fmt.Println(printError)
		return errors.New(printError)
	}
	return nil
}

type RollLength struct {
	Type          string         `gql:"type: String" json:"type"`
	Modifications pq.StringArray `gql:"modifications: [String]" json:"modifications"`
}

var RollLengthType = &utils.Type{Name: "RollLength", Model: RollLength{}}
var RollLengthInputType = &utils.Type{Name: "RollLengthInput", IsInput: true, Model: RollLength{}}

func (rl RollLength) Value() (driver.Value, error) {
	value, err := json.Marshal(rl)
	if err != nil {
		fmt.Println("Error trying to Marshal RollLength: " + err.Error())
		return nil, err
	}
	return string(value), nil
}

func (rl *RollLength) Scan(value interface{}) error {
	if err := json.Unmarshal(value.([]byte), &rl); err != nil {
		fmt.Println("Error trying to Unmarshal RollLength: " + err.Error())
		return err
	}
	return nil
}

type Token struct {
	AccessToken  string    `gql:"accessToken: String" json:"accessToken"`
	RefreshToken string    `gql:"refreshToken: String" json:"refreshToken"`
	TokenType    string    `gql:"tokenType: String" json:"tokenType"`
	Expiry       time.Time `gql:"Expiry: String" json:"expiry"`
}

func (token Token) Value() (driver.Value, error) {
	value, err := json.Marshal(token)
	if err != nil {
		fmt.Println("Error trying to Marshal Token: " + err.Error())
		return nil, err
	}
	return string(value), nil
}

func (token *Token) Scan(value interface{}) error {
	if err := json.Unmarshal(value.([]byte), &token); err != nil {
		fmt.Println("Error trying to Unmarshal Token: " + err.Error())
		return err
	}
	return nil
}

var TokenType = &utils.Type{Name: "Token", Model: &Token{}}

type PaginationInput struct {
	Offset   int            `gql:"offset: Int"`
	Limit    int            `gql:"limit: Int"`
	OrderBy  pq.StringArray `gql:"orderBy: [String]"`
	ShowLogs bool           `gql:"showLogs: Boolean"`
}

var PaginationInputType = &utils.Type{Name: "PaginationInput", IsInput: true, Model: &PaginationInput{}}

type SearchInput struct {
	UserID          string `gql:"userID: ID"`
	PreloadModel    string `gql:"preloadModel: String"`
	PreloadArgument string `gql:"preloadArgument: String"`
	WhereClause     string `gql:"whereClause: String"`
	WhereArgument   string `gql:"whereArgument: String"`
}

var SearchInputType = &utils.Type{Name: "SearchInput", IsInput: true, Model: &SearchInput{}}
