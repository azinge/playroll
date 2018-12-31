package crud

type CRUDMethods struct {
	PlayrollMethods            `gql:"GROUP"`
	RollMethods                `gql:"GROUP"`
	TracklistMethods           `gql:"GROUP"`
	CompiledRollMethods        `gql:"GROUP"`
	ExternalCredentialMethods  `gql:"GROUP"`
	UserMethods                `gql:"GROUP"`
	DiscoveryQueueMethods      `gql:"GROUP"`
	DiscoveryQueueEntryMethods `gql:"GROUP"`
	FriendshipMethods          `gql:"GROUP"`
	RecommendationMethods      `gql:"GROUP"`
}

var LinkedCRUDMethods = CRUDMethods{
	PlayrollMethods:            LinkedPlayrollMethods,
	RollMethods:                LinkedRollMethods,
	TracklistMethods:           LinkedTracklistMethods,
	CompiledRollMethods:        LinkedCompiledRollMethods,
	ExternalCredentialMethods:  LinkedExternalCredentialMethods,
	UserMethods:                LinkedUserMethods,
	DiscoveryQueueMethods:      LinkedDiscoveryQueueMethods,
	DiscoveryQueueEntryMethods: LinkedDiscoveryQueueEntryMethods,
	FriendshipMethods:          LinkedFriendshipMethods,
	RecommendationMethods:      LinkedRecommendationMethods,
}
