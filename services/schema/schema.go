package schema

type Types struct {
	PlayrollTypes `gql:"GROUP"`
}

type Methods struct {
	PlayrollMethods `gql:"GROUP"`

	OmniSearch `gql:"omniSearch(query: String!): [MusicSource]"`
}

var LinkedTypes = Types{
	PlayrollTypes: LinkedPlayrollTypes,
}

var LinkedMethods = Methods{
	PlayrollMethods: LinkedPlayrollMethods,
}
