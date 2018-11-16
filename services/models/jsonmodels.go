package models

import (
	"fmt"

	"github.com/cazinge/playroll/services/models/jsonmodels"
	"github.com/lib/pq"
)

type SourceType string

const (
	SongType   SourceType = "Song"
	AlbumType  SourceType = "Album"
	ArtistType SourceType = "Artist"
)

type ProviderType string

const (
	SpotifyType    ProviderType = "Spotify"
	AppleMusicType ProviderType = "AppleMusic"
)

type Song struct {
	Name        string                 `gql:"name: String"`
	MusicSource jsonmodels.MusicSource `gql:"musicSource: MusicSource" gorm:"type: jsonb;not null"`
}

func (s *Song) String() string {
	return fmt.Sprintf("SONG<%s (%s)>", s.Name, s.MusicSource)
}

type Artist struct {
	Title       string                 `gql:"title: String"`
	MusicSource jsonmodels.MusicSource `gql:"musicSource: MusicSource" gorm:"type: jsonb;not null"`
}

func (a *Artist) String() string {
	return fmt.Sprintf("ARTIST<%s (%s)>", a.Title, a.MusicSource)
}

type Album struct {
	Name        string                 `gql:"name: String"`
	MusicSource jsonmodels.MusicSource `gql:"musicSource: MusicSource" gorm:"type: jsonb;not null"`
}

func (a *Album) String() string {
	return fmt.Sprintf("ALBUM<%s (%s)>", a.Name, a.MusicSource)
}

type PaginationInput struct {
	Offset   int            `gql:"offset: Int"`
	Limit    int            `gql:"limit: Int"`
	OrderBy  pq.StringArray `gql:"orderBy: [String]"`
	ShowLogs bool           `gql:"showLogs: Boolean"`
}

type SearchInput struct {
	UserID          string `gql:"userID: ID"`
	PreloadModel    string `gql:"preloadModel: String"`
	PreloadArgument string `gql:"preloadArgument: String"`
	WhereClause     string `gql:"whereClause: String"`
	WhereArgument   string `gql:"whereArgument: String"`
}
