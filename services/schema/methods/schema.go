package methods

type GeneralMethods struct {
	GenerateMethods   `gql:"GROUP"`
	SpotifyMethods    `gql:"GROUP"`
	UserMethods       `gql:"GROUP"`
	PlayrollMethods   `gql:"GROUP"`
	FriendshipMethods `gql:"GROUP"`
}

var LinkedGeneralMethods = GeneralMethods{
	GenerateMethods:   LinkedGenerateMethods,
	SpotifyMethods:    LinkedSpotifyMethods,
	UserMethods:       LinkedUserMethods,
	PlayrollMethods:   LinkedPlayrollMethods,
	FriendshipMethods: LinkedFriendshipMethods,
}
