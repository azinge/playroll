package private

type PrivateMethods struct {
	GenerateMethods       `gql:"GROUP"`
	SpotifyMethods        `gql:"GROUP"`
	UserMethods           `gql:"GROUP"`
	PlayrollMethods       `gql:"GROUP"`
	DiscoveryQueueMethods `gql:"GROUP"`
	RecommendationMethods `gql:"GROUP"`
	RelationshipMethods   `gql:"GROUP"`
}

var LinkedPrivateMethods = PrivateMethods{
	GenerateMethods:       LinkedGenerateMethods,
	SpotifyMethods:        LinkedSpotifyMethods,
	UserMethods:           LinkedUserMethods,
	PlayrollMethods:       LinkedPlayrollMethods,
	DiscoveryQueueMethods: LinkedDiscoveryQueueMethods,
	RecommendationMethods: LinkedRecommendationMethods,
	RelationshipMethods:   LinkedRelationshipMethods,
}
