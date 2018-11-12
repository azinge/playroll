package schema

type Types struct {
	PlayrollTypes `gql:"GROUP"`
}

type Methods struct {
	PlayrollMethods `gql:"GROUP"`
}

var LinkedTypes = Types{
	PlayrollTypes: LinkedPlayrollTypes,
}

var LinkedMethods = Methods{
	PlayrollMethods: LinkedPlayrollMethods,
}
