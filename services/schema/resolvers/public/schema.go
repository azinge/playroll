package public

type PublicMethods struct {
	SpotifyMethods `gql:"GROUP"`
}

var LinkedPublicMethods = PublicMethods{
	SpotifyMethods: LinkedSpotifyMethods,
}
