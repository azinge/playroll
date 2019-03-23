package admin

type AdminMethods struct {
	PlayrollMethods               `gql:"GROUP"`
	RollMethods                   `gql:"GROUP"`
	TracklistMethods              `gql:"GROUP"`
	CompiledRollMethods           `gql:"GROUP"`
	IdentityCredentialMethods     `gql:"GROUP"`
	MusicServiceCredentialMethods `gql:"GROUP"`
	UserMethods                   `gql:"GROUP"`
	DiscoveryQueueMethods         `gql:"GROUP"`
	DiscoveryQueueEntryMethods    `gql:"GROUP"`
	RecommendationMethods         `gql:"GROUP"`
	MusicServiceAlbumMethods      `gql:"GROUP"`
	MusicServiceArtistMethods     `gql:"GROUP"`
	MusicServicePlaylistMethods   `gql:"GROUP"`
	MusicServiceTrackMethods      `gql:"GROUP"`
	MusicServiceUserMethods       `gql:"GROUP"`
	RelationshipMethods           `gql:"GROUP"`
	SpotifyMethods                `gql:"GROUP"`
}

var LinkedAdminMethods = AdminMethods{
	PlayrollMethods:               LinkedPlayrollMethods,
	RollMethods:                   LinkedRollMethods,
	TracklistMethods:              LinkedTracklistMethods,
	CompiledRollMethods:           LinkedCompiledRollMethods,
	IdentityCredentialMethods:     LinkedIdentityCredentialMethods,
	MusicServiceCredentialMethods: LinkedMusicServiceCredentialMethods,
	UserMethods:                   LinkedUserMethods,
	DiscoveryQueueMethods:         LinkedDiscoveryQueueMethods,
	DiscoveryQueueEntryMethods:    LinkedDiscoveryQueueEntryMethods,
	RecommendationMethods:         LinkedRecommendationMethods,
	MusicServiceAlbumMethods:      LinkedMusicServiceAlbumMethods,
	MusicServiceArtistMethods:     LinkedMusicServiceArtistMethods,
	MusicServicePlaylistMethods:   LinkedMusicServicePlaylistMethods,
	MusicServiceTrackMethods:      LinkedMusicServiceTrackMethods,
	MusicServiceUserMethods:       LinkedMusicServiceUserMethods,
	RelationshipMethods:           LinkedRelationshipMethods,
	SpotifyMethods:                LinkedSpotifyMethods,
}
