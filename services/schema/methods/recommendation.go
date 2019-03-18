package methods

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

// RecommendationMethods defines the methods for the Recommendations entity.
type RecommendationMethods struct {
	ListCurrentUserRecommendations *gqltag.Query `gql:"listCurrentUserRecommendations(userID: ID): [Recommendation]"`
	// TODO: RecommendToAFriend
	RecommendToAFriend *gqltag.Query `gql: recommendToAFriend(friendID: ID, roll: RollInput): User`
}

var listCurrentUserRecommendations = gqltag.Method{
	Description: `This function lists the current user's recommendations.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		// user, err := models.AuthorizeUser(mctx)
		// if err != nil {
		// 	fmt.Println(err)
		// 	return nil, err
		// }
		type listCurrentUserRecommendationsParams struct {
			UserID string
		}
		params := &listCurrentUserRecommendationsParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		userID := utils.StringIDToNumber(params.UserID)

		recommendationsModels := &[]models.Recommendation{}
		db := mctx.DB
		if err := db.Where(models.Recommendation{UserID: userID}).Find(recommendationsModels).Error; err != nil {
			fmt.Printf("error getting recommendations: %s", err.Error())
			return nil, err
		}

		recommendations, err := models.FormatRecommendationSlice(recommendationsModels)
		if err != nil {
			return nil, err
		}
		return recommendations, nil
	},
}

var recommendToAFriend = gqltag.Method{
	Description: `Recommends the selected Playroll to a friend.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		// user, err := models.AuthorizeUser(mctx)
		// if err != nil {
		// 	fmt.Println(err)
		// 	return nil, err
		// }
		type recommendToAFriendParams struct {
			FriendID string
			RollID   string
		}
		params := &recommendToAFriendParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		friendID := utils.StringIDToNumber(params.FriendID)
		friends, err := models.GetFriendsByUserID(friendID, mctx.DB)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		// db := mctx.DB
		// friend, err := friend.Where(models.Friendship(FriendID: friendID))
		// friend := db.Where(models.Friendship{FriendID: friendID}).First().Error
		// if err != nil {
		// 	fmt.Println(err)
		// 	return nil, err
		// }

		// recommendations = friend.Recommendations

		// playrollID := utils.StringIDToNumber(params.PlayrollID)
		// playRoll :=

		// recommendationsModels := &[]models.Recommendation{}

		// TODO
		// if err := db.Select("Recommendations").Where(models.Recommendation{UserID: friendID}); err != nill {
		// 	fmt.Printf("error getting recommendations: %s", err.Error())
		// 	return nil, err
		// }

		// recommendations, err := models.FormatRecommendationSlice(recommendationsModels)
		// if err != nil {
		// 	return nil, err
		// }
		// return recommendations, nil
		return friends, nil
	},
}

// LinkedRecommendationMethods exports the methods for the Recommendations entity.
var LinkedRecommendationMethods = RecommendationMethods{
	ListCurrentUserRecommendations: gqltag.LinkQuery(listCurrentUserRecommendations),
}
