package private

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

// type RelationshipStatus string

// const (
// 	Friend                RelationshipStatus = "Friend"
// 	FriendRequestSent     RelationshipStatus = "Friend Request Sent"
// 	FriendRequestReceived RelationshipStatus = "Friend Request Received"
// 	FriendRequestIgnored  RelationshipStatus = "Friend Request Ignored"
// )

// RelationshipMethods defines the types for all relationship methods.
type RelationshipMethods struct {
	GetRelationship     *gqltag.Query    `gql:"relationship(id: ID): Relationship"`
	ListFriends         *gqltag.Query    `gql:"listFriends(offset: Int, count: Int): [User]"`
	ListFriendRequests  *gqltag.Query    `gql:"listFriendRequests(offset: Int, count: Int): [Relationship]"`
	SearchFriends       *gqltag.Query    `gql:"searchFriends(query:String, offset: Int, count: Int): [User]"`
	SendFriendRequest   *gqltag.Mutation `gql:"sendFriendRequest(userID: ID): Relationship"`
	AcceptFriendRequest *gqltag.Mutation `gql:"acceptFriendRequest(userID: ID): Relationship"`
	IgnoreFriendRequest *gqltag.Mutation `gql:"ignoreFriendRequest(userID: ID): Relationship"`
	UnfriendUser        *gqltag.Mutation `gql:"unfriendUser(userID: ID): Relationship"`
	BlockUser           *gqltag.Mutation `gql:"blockUser(userID: ID): Relationship"`
	UnblockUser         *gqltag.Mutation `gql:"unblockUser(userID: ID): Relationship"`
}

var getRelationship = gqltag.Method{
	Description: `Gets the current user's relationship.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type getRelationshipParams struct {
			UserID string
		}

		params := &getRelationshipParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		id := utils.StringIDToNumber(params.UserID)

		relationship := &models.Relationship{}
		if err := mctx.DB.Preload("OtherUser").Where(&models.Relationship{UserID: user.ID}).First(relationship, id).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		return models.FormatRelationship(relationship)
	},
}

var listFriends = gqltag.Method{
	Description: `Lists the current user's friends.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type listFriendsParams struct {
			Offset *uint
			Count  *uint
		}
		params := &listFriendsParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		offset, count := utils.InitializePaginationVariables(params.Offset, params.Count)
		db := mctx.DB.Offset(offset).Limit(count)
		users, err := models.GetFriendsByUserID(user.ID, db)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		return models.FormatUserSlice(users)
	},
}

var listFriendRequests = gqltag.Method{
	Description: `Lists the current user's friend requests.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type listFriendRequestsParams struct {
			Offset *uint
			Count  *uint
		}
		params := &listFriendRequestsParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		rs := &[]models.Relationship{}
		offset, count := utils.InitializePaginationVariables(params.Offset, params.Count)
		if err := mctx.DB.Preload("OtherUser").Where(&models.Relationship{UserID: user.ID, Status: "Friend Request Received"}).Offset(offset).Limit(count).Find(&rs).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		return models.FormatRelationshipSlice(rs)
	},
}

var searchFriends = gqltag.Method{
	Description: `Uses a search query to search through the current user's friends.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type searchFriendsParams struct {
			Query  string
			Offset *uint
			Count  *uint
		}
		params := &searchFriendsParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		db := mctx.DB.Table("relationships").
			Joins("LEFT JOIN users ON users.id = relationships.other_user_id").
			Preload("OtherUser")

		rs := &[]models.Relationship{}
		offset, count := utils.InitializePaginationVariables(params.Offset, params.Count)
		if err := db.Where(&models.Relationship{UserID: user.ID, Status: "Friend"}).Where("users.name LIKE ?", "%"+params.Query+"%").Offset(offset).Limit(count).Find(rs).Error; err != nil {
			fmt.Printf("error searching friends: %s", err.Error())
			return nil, err
		}

		otherUsers := []models.User{}
		for _, r := range *rs {
			otherUser := r.OtherUser
			otherUser.Relationships = append(otherUser.Relationships, r)
			otherUsers = append(otherUsers, otherUser)
		}

		friends, err := models.FormatUserSlice(&otherUsers)
		if err != nil {
			return nil, err
		}
		return friends, nil
	},
}

var sendFriendRequest = gqltag.Method{
	Description: `Sends a Friend Request to another User.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type sendFriendRequestParams struct {
			UserID string
		}
		params := &sendFriendRequestParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		otherUserID := utils.StringIDToNumber(params.UserID)

		if user.ID == otherUserID {
			return nil, fmt.Errorf("Same User")
		}

		r1 := &models.Relationship{}
		if err := mctx.DB.Where(&models.Relationship{UserID: user.ID, OtherUserID: otherUserID}).FirstOrCreate(r1).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		r2 := &models.Relationship{}
		if err := mctx.DB.Where(&models.Relationship{UserID: otherUserID, OtherUserID: user.ID}).FirstOrCreate(r2).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		if r2.IsBlocking {
			return nil, fmt.Errorf("Blocked by user")
		}

		if r1.Status == "Friend" || r2.Status == "Friend" {
			return nil, fmt.Errorf("Already Friends")
		}

		if r1.Status == "Friend Request Sent" || r2.Status == "Friend Request Received" || r2.Status == "Friend Request Ignored" {
			return nil, fmt.Errorf("Friend Request Already Sent")
		}

		r1.Status = "Friend Request Sent"
		r2.Status = "Friend Request Received"

		if err := mctx.DB.Save(r1).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		if err := mctx.DB.Save(r2).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		pushNotification := &models.PushNotification{
			Type:  "RECEIVED_FRIEND_REQUEST",
			Title: "Received Friend Request",
			Body:  fmt.Sprintf("%s has just sent you a friend request!", user.Name),
		}

		if err := models.SendUserPushNotification(otherUserID, pushNotification, mctx.DB); err != nil {
			return nil, err
		}

		return models.FormatRelationship(r1)
	},
}

var acceptFriendRequest = gqltag.Method{
	Description: `Accepts a Friend Request from another User.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type acceptFriendRequestParams struct {
			UserID string
		}
		params := &acceptFriendRequestParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		otherUserID := utils.StringIDToNumber(params.UserID)

		r1 := &models.Relationship{}
		if err := mctx.DB.Where(&models.Relationship{UserID: user.ID, OtherUserID: otherUserID}).FirstOrCreate(r1).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		r2 := &models.Relationship{}
		if err := mctx.DB.Where(&models.Relationship{UserID: otherUserID, OtherUserID: user.ID}).FirstOrCreate(r2).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		if r2.Status != "Friend Request Sent" || r1.Status != "Friend Request Received" {
			return nil, fmt.Errorf("No Friend Request Received")
		}

		if r1.Status == "Friend" || r2.Status == "Friend" {
			return nil, fmt.Errorf("Already Friends")
		}

		if r2.IsBlocking {
			return nil, fmt.Errorf("Blocked by user")
		}

		r1.Status = "Friend"
		r2.Status = "Friend"

		if err := mctx.DB.Save(r1).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		if err := mctx.DB.Save(r2).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		pushNotification := &models.PushNotification{
			Type:  "ACCEPTED_FRIEND_REQUEST",
			Title: "Accepted Friend Request",
			Body:  fmt.Sprintf("%s has just accepted your friend request!", user.Name),
		}

		if err := models.SendUserPushNotification(otherUserID, pushNotification, mctx.DB); err != nil {
			return nil, err
		}

		return models.FormatRelationship(r1)
	},
}

var ignoreFriendRequest = gqltag.Method{
	Description: `Ignore a Friend Request from another User.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type ignoreFriendRequestParams struct {
			UserID string
		}
		params := &ignoreFriendRequestParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		otherUserID := utils.StringIDToNumber(params.UserID)

		r1 := &models.Relationship{}
		if err := mctx.DB.Where(&models.Relationship{UserID: user.ID, OtherUserID: otherUserID}).FirstOrCreate(r1).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		r2 := &models.Relationship{}
		if err := mctx.DB.Where(&models.Relationship{UserID: otherUserID, OtherUserID: user.ID}).FirstOrCreate(r2).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		if r2.Status != "Friend Request Sent" || r1.Status != "Friend Request Received" {
			return nil, fmt.Errorf("No Friend Request Received")
		}

		if r1.Status == "Friend" || r2.Status == "Friend" {
			return nil, fmt.Errorf("Already Friends")
		}

		if r2.IsBlocking {
			return nil, fmt.Errorf("Blocked by user")
		}

		r1.Status = "Friend Request Ignored"

		if err := mctx.DB.Save(r1).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		return models.FormatRelationship(r1)
	},
}

var unfriendUser = gqltag.Method{
	Description: `Unfriends a friend of the current user.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type unfriendUserParams struct {
			UserID string
		}
		params := &unfriendUserParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		otherUserID := utils.StringIDToNumber(params.UserID)

		r1 := &models.Relationship{}
		if err := mctx.DB.Where(&models.Relationship{UserID: user.ID, OtherUserID: otherUserID}).FirstOrCreate(r1).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		r2 := &models.Relationship{}
		if err := mctx.DB.Where(&models.Relationship{UserID: otherUserID, OtherUserID: user.ID}).FirstOrCreate(r2).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		if r1.Status != "Friend" || r2.Status != "Friend" {
			return nil, fmt.Errorf("Not Friends")
		}

		r1.Status = ""
		r2.Status = ""

		if err := mctx.DB.Save(r1).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		if err := mctx.DB.Save(r2).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		return models.FormatRelationship(r1)
	},
}

var blockUser = gqltag.Method{
	Description: `Blocks another User from interacting with the current User.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type blockUserParams struct {
			UserID string
		}
		params := &blockUserParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		otherUserID := utils.StringIDToNumber(params.UserID)

		r1 := &models.Relationship{}
		if err := mctx.DB.Where(&models.Relationship{UserID: user.ID, OtherUserID: otherUserID}).FirstOrCreate(r1).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		r1.IsBlocking = true

		if err := mctx.DB.Save(r1).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		return models.FormatRelationship(r1)
	},
}

var unblockUser = gqltag.Method{
	Description: `Unblocks another User.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type blockUserParams struct {
			UserID string
		}
		params := &blockUserParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		otherUserID := utils.StringIDToNumber(params.UserID)

		r1 := &models.Relationship{}
		if err := mctx.DB.Where(&models.Relationship{UserID: user.ID, OtherUserID: otherUserID}).FirstOrCreate(r1).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		r1.IsBlocking = false

		if err := mctx.DB.Save(r1).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		return models.FormatRelationship(r1)
	},
}

// LinkedRelationshipMethods links and makes available all methods stemming from the relationship entity.
var LinkedRelationshipMethods = RelationshipMethods{
	GetRelationship:     gqltag.LinkQuery(getRelationship),
	ListFriends:         gqltag.LinkQuery(listFriends),
	ListFriendRequests:  gqltag.LinkQuery(listFriendRequests),
	SearchFriends:       gqltag.LinkQuery(searchFriends),
	SendFriendRequest:   gqltag.LinkMutation(sendFriendRequest),
	AcceptFriendRequest: gqltag.LinkMutation(acceptFriendRequest),
	IgnoreFriendRequest: gqltag.LinkMutation(ignoreFriendRequest),
	UnfriendUser:        gqltag.LinkMutation(unfriendUser),
	BlockUser:           gqltag.LinkMutation(blockUser),
	UnblockUser:         gqltag.LinkMutation(unblockUser),
}
