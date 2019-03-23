package private

type PrivateMethods struct {
	GenerateMethods       `gql:"GROUP"`
	SpotifyMethods        `gql:"GROUP"`
	UserMethods           `gql:"GROUP"`
	PlayrollMethods       `gql:"GROUP"`
	RollMethods           `gql:"GROUP"`
	TracklistMethods      `gql:"GROUP"`
	DiscoveryQueueMethods `gql:"GROUP"`
	RecommendationMethods `gql:"GROUP"`
	RelationshipMethods   `gql:"GROUP"`
}

var LinkedPrivateMethods = PrivateMethods{
	GenerateMethods:       LinkedGenerateMethods,
	SpotifyMethods:        LinkedSpotifyMethods,
	UserMethods:           LinkedUserMethods,
	PlayrollMethods:       LinkedPlayrollMethods,
	RollMethods:           LinkedRollMethods,
	TracklistMethods:      LinkedTracklistMethods,
	DiscoveryQueueMethods: LinkedDiscoveryQueueMethods,
	RecommendationMethods: LinkedRecommendationMethods,
	RelationshipMethods:   LinkedRelationshipMethods,
}
