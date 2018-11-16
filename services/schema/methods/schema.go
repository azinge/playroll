package methods

type GeneralMethods struct {
	GenerateMethods `gql:"GROUP"`
	SpotifyMethods  `gql:"GROUP"`
}

var LinkedGeneralMethods = GeneralMethods{
	GenerateMethods: LinkedGenerateMethods,
	SpotifyMethods:  LinkedSpotifyMethods,
}
