package schema

type Types struct {
	PlayrollTypes `gql:"GROUP"`
}

type Methods struct {
	PlayrollMethods `gql:"GROUP"`
}

var LinkedTypes = gqltag.Types{
	PlayrollTypes: LinkedPlayrollTypes,
}

var LinkedMethods = gqltag.Methods{
	PlayrollMethods: LinkedPlayrollMethods,
}
