package crud

import (
	"github.com/cazinge/playroll/services/gqltag"

	"github.com/cazinge/playroll/services/models"
)

type FriendshipMethods struct {
	GetFriendship    *gqltag.Query    `gql:"friendship(id: ID!): Friendship"`
	ListFriendships  *gqltag.Query    `gql:"listFriendships(offset: Int, count: Int): [Friendship]"`
	CreateFriendship *gqltag.Mutation `gql:"createFriendship(input: FriendshipInput!): Friendship"`
	UpdateFriendship *gqltag.Mutation `gql:"updateFriendship(id: ID!, input: FriendshipInput!): Friendship"`
	DeleteFriendship *gqltag.Mutation `gql:"deleteFriendship(id: ID!): Friendship"`
}

var getFriendship = gqltag.Method{
	Description: `[Get Friendship Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.Friendship{}),
}

var listFriendships = gqltag.Method{
	Description: `[List Friendships Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.Friendship{}),
}

var createFriendship = gqltag.Method{
	Description: `[Create Friendship Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.Friendship{}, &models.FriendshipInput{}),
}

var updateFriendship = gqltag.Method{
	Description: `[Update Friendship Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.Friendship{}, &models.FriendshipInput{}),
}

var deleteFriendship = gqltag.Method{
	Description: `[Delete Friendship Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.Friendship{}),
}

var LinkedFriendshipMethods = FriendshipMethods{
	GetFriendship:    gqltag.LinkQuery(getFriendship),
	ListFriendships:  gqltag.LinkQuery(listFriendships),
	CreateFriendship: gqltag.LinkMutation(createFriendship),
	UpdateFriendship: gqltag.LinkMutation(updateFriendship),
	DeleteFriendship: gqltag.LinkMutation(deleteFriendship),
}
