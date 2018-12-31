package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type FriendshipTypes struct {
	Friendship      *gqltag.Output `gql:"Friendship"`
	FriendshipInput *gqltag.Input  `gql:"FriendshipInput"`
}

var friendshipType = gqltag.Type{
	Description: `[Friendship Type Description Goes Here]`,
	Fields:      &models.FriendshipOutput{},
}

var friendshipInputType = gqltag.Type{
	Description: `[Friendship Input Type Description Goes Here]`,
	Fields:      &models.FriendshipInput{},
}

var LinkedFriendshipTypes = FriendshipTypes{
	Friendship:      gqltag.LinkOutput(friendshipType),
	FriendshipInput: gqltag.LinkInput(friendshipInputType),
}
