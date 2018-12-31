package types

import (
	"github.com/cazinge/playroll/services/schema/types/jsontypes"
)

type Types struct {
	PlayrollTypes            `gql:"GROUP"`
	RollTypes                `gql:"GROUP"`
	TracklistTypes           `gql:"GROUP"`
	CompiledRollTypes        `gql:"GROUP"`
	ExternalCredentialTypes  `gql:"GROUP"`
	UserTypes                `gql:"GROUP"`
	DiscoveryQueueTypes      `gql:"GROUP"`
	DiscoveryQueueEntryTypes `gql:"GROUP"`
	FriendshipTypes          `gql:"GROUP"`
	RecommendationTypes      `gql:"GROUP"`
	jsontypes.JSONTypes      `gql:"GROUP"`
}

var LinkedTypes = Types{
	PlayrollTypes:            LinkedPlayrollTypes,
	RollTypes:                LinkedRollTypes,
	TracklistTypes:           LinkedTracklistTypes,
	CompiledRollTypes:        LinkedCompiledRollTypes,
	ExternalCredentialTypes:  LinkedExternalCredentialTypes,
	UserTypes:                LinkedUserTypes,
	DiscoveryQueueTypes:      LinkedDiscoveryQueueTypes,
	DiscoveryQueueEntryTypes: LinkedDiscoveryQueueEntryTypes,
	FriendshipTypes:          LinkedFriendshipTypes,
	RecommendationTypes:      LinkedRecommendationTypes,
	JSONTypes:                jsontypes.LinkedJSONTypes,
}
