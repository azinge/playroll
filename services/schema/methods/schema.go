package methods

//! DEPRECATION NOTICE: Moving to ./resolvers
type GeneralMethods struct {
	GenerateMethods       `gql:"GROUP"`
	SpotifyMethods        `gql:"GROUP"`
	UserMethods           `gql:"GROUP"`
	PlayrollMethods       `gql:"GROUP"`
	DiscoveryQueueMethods `gql:"GROUP"`
	RecommendationMethods `gql:"GROUP"`
	RelationshipMethods   `gql:"GROUP"`
}

var LinkedGeneralMethods = GeneralMethods{
	GenerateMethods:       LinkedGenerateMethods,
	SpotifyMethods:        LinkedSpotifyMethods,
	UserMethods:           LinkedUserMethods,
	PlayrollMethods:       LinkedPlayrollMethods,
	DiscoveryQueueMethods: LinkedDiscoveryQueueMethods,
	RecommendationMethods: LinkedRecommendationMethods,
	RelationshipMethods:   LinkedRelationshipMethods,
}
