package currentuser

//! DEPRECATION NOTICE: Moving to ./resolvers
type CurrentUserMethods struct {
	GenerateMethods       `gql:"GROUP"`
	SpotifyMethods        `gql:"GROUP"`
	UserMethods           `gql:"GROUP"`
	PlayrollMethods       `gql:"GROUP"`
	DiscoveryQueueMethods `gql:"GROUP"`
	RecommendationMethods `gql:"GROUP"`
	RelationshipMethods   `gql:"GROUP"`
}

var LinkedCurrentUserMethods = CurrentUserMethods{
	GenerateMethods:       LinkedGenerateMethods,
	SpotifyMethods:        LinkedSpotifyMethods,
	UserMethods:           LinkedUserMethods,
	PlayrollMethods:       LinkedPlayrollMethods,
	DiscoveryQueueMethods: LinkedDiscoveryQueueMethods,
	RecommendationMethods: LinkedRecommendationMethods,
	RelationshipMethods:   LinkedRelationshipMethods,
}
