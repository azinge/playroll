package jsonmodels

type SearchSpotifyOutput struct {
	Tracks    []MusicSource `gql:"tracks: [MusicSource]" json:"tracks"`
	Albums    []MusicSource `gql:"albums: [MusicSource]" json:"albums"`
	Artists   []MusicSource `gql:"artists: [MusicSource]" json:"artists"`
	Playlists []MusicSource `gql:"playlists: [MusicSource]" json:"playlists"`
}
