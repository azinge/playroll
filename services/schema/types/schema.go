package types

import (
	"github.com/cazinge/playroll/services/schema/types/jsontypes"
)

type Types struct {
	PlayrollTypes               `gql:"GROUP"`
	RollTypes                   `gql:"GROUP"`
	TracklistTypes              `gql:"GROUP"`
	CompiledRollTypes           `gql:"GROUP"`
	IdentityCredentialTypes     `gql:"GROUP"`
	MusicServiceCredentialTypes `gql:"GROUP"`
	ExternalCredentialTypes     `gql:"GROUP"`
	UserTypes                   `gql:"GROUP"`
	DiscoveryQueueTypes         `gql:"GROUP"`
	DiscoveryQueueEntryTypes    `gql:"GROUP"`
	FriendshipTypes             `gql:"GROUP"`
	RecommendationTypes         `gql:"GROUP"`
	MusicServiceAlbumTypes      `gql:"GROUP"`
	MusicServiceArtistTypes     `gql:"GROUP"`
	MusicServicePlaylistTypes   `gql:"GROUP"`
	MusicServiceTrackTypes      `gql:"GROUP"`
	MusicServiceUserTypes       `gql:"GROUP"`
	RelationshipTypes           `gql:"GROUP"`
	jsontypes.JSONTypes         `gql:"GROUP"`
}

var LinkedTypes = Types{
	PlayrollTypes:               LinkedPlayrollTypes,
	RollTypes:                   LinkedRollTypes,
	TracklistTypes:              LinkedTracklistTypes,
	CompiledRollTypes:           LinkedCompiledRollTypes,
	IdentityCredentialTypes:     LinkedIdentityCredentialTypes,
	MusicServiceCredentialTypes: LinkedMusicServiceCredentialTypes,
	ExternalCredentialTypes:     LinkedExternalCredentialTypes,
	UserTypes:                   LinkedUserTypes,
	DiscoveryQueueTypes:         LinkedDiscoveryQueueTypes,
	DiscoveryQueueEntryTypes:    LinkedDiscoveryQueueEntryTypes,
	FriendshipTypes:             LinkedFriendshipTypes,
	RecommendationTypes:         LinkedRecommendationTypes,
	MusicServiceAlbumTypes:      LinkedMusicServiceAlbumTypes,
	MusicServiceArtistTypes:     LinkedMusicServiceArtistTypes,
	MusicServicePlaylistTypes:   LinkedMusicServicePlaylistTypes,
	MusicServiceTrackTypes:      LinkedMusicServiceTrackTypes,
	MusicServiceUserTypes:       LinkedMusicServiceUserTypes,
	RelationshipTypes:           LinkedRelationshipTypes,
	JSONTypes:                   jsontypes.LinkedJSONTypes,
}
