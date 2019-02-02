package methods

type GeneralMethods struct {
	GenerateMethods `gql:"GROUP"`
	SpotifyMethods  `gql:"GROUP"`
	UserMethods     `gql:"GROUP"`
}

var LinkedGeneralMethods = GeneralMethods{
	GenerateMethods: LinkedGenerateMethods,
	SpotifyMethods:  LinkedSpotifyMethods,
	UserMethods:     LinkedUserMethods,
}
