package private

import (
	"fmt"

	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
	"github.com/cazinge/playroll/services/models/jsonmodels"
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
	RecommendToAUser               *gqltag.Mutation `gql:"recommendToAUser(receiverID: Int, playrollID: Int, rollData: RollDataInput): Recommendation"`
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

		// TODO (dmoini): double check offset, count
		if params.Count == 0 {
			params.Count = 0
		}
		if params.Offset == 0 {
			params.Offset = 20
		}

		if err := mctx.DB.Where(models.Recommendation{UserID: user.ID, IsActive: true}).Offset(params.Offset).Limit(params.Count).Find(recommendationsModels).Error; err != nil {
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

var recommendToAUser = gqltag.Method{
	Description: `Recommends the selected Playroll to a user.`,
	Request: func(resolveParams graphql.ResolveParams, mctx *gqltag.MethodContext) (interface{}, error) {
		user, err := models.AuthorizeUser(mctx)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		type recommendToAUserParams struct {
			ReceiverID    uint
			PlayrollID    uint
			RollDataInput jsonmodels.RollDataInput
		}

		params := &recommendToAUserParams{}
		err = mapstructure.Decode(resolveParams.Args, params)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		relationship := &models.Relationship{}
		db := mctx.DB
		err = db.Where(&models.Relationship{UserID: params.ReceiverID, OtherUserID: user.ID, IsBlocking: false}).First(relationship).Error
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		rollData, err := params.RollDataInput.ToModel()
		if err != nil {
			fmt.Println(err)
			return nil, err
		}

		recommendation := models.Recommendation{Data: *rollData, UserID: params.ReceiverID, RecommenderID: user.ID, PlayrollID: params.PlayrollID}
		db.Create(&recommendation)

		return recommendation, nil
	},
}

// LinkedRecommendationMethods exports the methods for the Recommendations entity.
var LinkedRecommendationMethods = RecommendationMethods{
	ListCurrentUserRecommendations: gqltag.LinkQuery(listCurrentUserRecommendations),
	CreateRecommendation:           gqltag.LinkMutation(createRecommendation),
	DismissRecommendation:          gqltag.LinkMutation(dismissRecommendation),
	RecommendToAUser:               gqltag.LinkMutation(recommendToAUser),
}
