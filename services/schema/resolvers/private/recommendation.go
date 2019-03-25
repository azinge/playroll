package private

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/schema/resolvers/admin"
	"github.com/cazinge/playroll/services/utils"
	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

// RecommendationMethods defines the methods for the Recommendations entity.
type RecommendationMethods struct {
	ListCurrentUserRecommendations *gqltag.Query    `gql:"listCurrentUserRecommendations(offset: Int, count: Int): [Recommendation]"`
	CreateRecommendation           *gqltag.Mutation `gql:"createRecommendation(input: RecommendationInput): Recommendation"`
	DismissRecommendation          *gqltag.Mutation `gql:"dismissRecommendation(recommendationID: ID): Recommendation"`
	RecommendToAFriend             *gqltag.Mutation `gql:"recommendToAFriend(senderID: Int, receiverID: Int, playrollID: Int): Recommendation"`
}

var listCurrentUserRecommendations = gqltag.Method{
	Description: `This function lists the current user's recommendations.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type listCurrentUserRecommendationsParams struct {
			Offset uint
			Count  uint
		}
		params := &listCurrentUserRecommendationsParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		recommendationsModels := &[]models.Recommendation{}
		db := mctx.DB
		if err := db.Where(models.Recommendation{UserID: user.ID, IsActive: true}).Find(recommendationsModels).Error; err != nil {
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

// TODO(cazinge): Convert to Authenticated Endpoint

var createRecommendation = gqltag.Method{
	Description: `Dismisses the current user's recommendation.`,
	Request:     admin.GenerateCreateEntityMethod(&models.Recommendation{}, &models.RecommendationInput{}),
}

var dismissRecommendation = gqltag.Method{
	Description: `Dismisses the current user's recommendation.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type dismissRecommendationParams struct {
			RecommendationID string
		}
		params := &dismissRecommendationParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		recommendationID := utils.StringIDToNumber(params.RecommendationID)

		recommendationModel := &models.Recommendation{}
		if err := mctx.DB.Where(&models.Recommendation{UserID: user.ID}).First(recommendationModel, recommendationID).Error; err != nil {
			return nil, err
		}

		recommendationModel.IsActive = false
		if err := mctx.DB.Save(recommendationModel).Error; err != nil {
			fmt.Println(err)
			return nil, err
		}

		return models.FormatRecommendation(recommendationModel)
	},
}

var recommendToAFriend = gqltag.Method{
	Description: `Recommends the selected Playroll to a friend.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		// TODO: keep or delete commented authorization
		// user, err := models.AuthorizeUser(mctx)
		// if err != nil {
		// 	fmt.Println(err)
		// 	return nil, err
		// }
		type recommendToAFriendParams struct {
			SenderID   uint
			ReceiverID uint
			PlayrollID uint
		}

		params := &recommendToAFriendParams{}
		err := mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		// strSenderID := strconv.Itoa(int(params.SenderID))
		// strReceiverID := strconv.Itoa(int(params.ReceiverID))
		// strPlayrollID := strconv.Itoa(int(params.PlayrollID))
		// recommendationInput := models.RecommendationInput{UserID: strReceiverID, RecommenderID: strSenderID, PlayrollID: strPlayrollID}
		// recommendation := createRecommendation(recommendationInput)

		recommendation := models.Recommendation{UserID: params.ReceiverID, RecommenderID: params.SenderID, PlayrollID: params.PlayrollID}
		mctx.DB.Create(&recommendation)

		return recommendation, nil
	},
}

// LinkedRecommendationMethods exports the methods for the Recommendations entity.
var LinkedRecommendationMethods = RecommendationMethods{
	ListCurrentUserRecommendations: gqltag.LinkQuery(listCurrentUserRecommendations),
	CreateRecommendation:           gqltag.LinkMutation(createRecommendation),
	DismissRecommendation:          gqltag.LinkMutation(dismissRecommendation),
	RecommendToAFriend:             gqltag.LinkMutation(recommendToAFriend),
}
