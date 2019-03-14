package crud

import (
	"github.com/cazinge/playroll/services/gqltag"

	"github.com/cazinge/playroll/services/models"
)

type RecommendationMethods struct {
	GetRecommendation    *gqltag.Query    `gql:"recommendation(id: ID!): Recommendation"`
	ListRecommendations  *gqltag.Query    `gql:"listRecommendations(offset: Int, count: Int): [Recommendation]"`
	CreateRecommendation *gqltag.Mutation `gql:"createRecommendation(input: RecommendationInput!): Recommendation"`
	UpdateRecommendation *gqltag.Mutation `gql:"updateRecommendation(id: ID!, input: RecommendationInput!): Recommendation"`
	DeleteRecommendation *gqltag.Mutation `gql:"deleteRecommendation(id: ID!): Recommendation"`
}

var getRecommendation = gqltag.Method{
	Description: `[Get Recommendation Description Goes Here]`,
	Request:     GenerateGetEntityMethod(&models.Recommendation{}),
}

var listRecommendations = gqltag.Method{
	Description: `[List Recommendations Description Goes Here]`,
	Request:     GenerateListEntityMethod(&models.Recommendation{}),
}

var createRecommendation = gqltag.Method{
	Description: `[Create Recommendation Description Goes Here]`,
	Request:     GenerateCreateEntityMethod(&models.Recommendation{}, &models.RecommendationInput{}),
}

var updateRecommendation = gqltag.Method{
	Description: `[Update Recommendation Description Goes Here]`,
	Request:     GenerateUpdateEntityMethod(&models.Recommendation{}, &models.RecommendationInput{}),
}

var deleteRecommendation = gqltag.Method{
	Description: `[Delete Recommendation Description Goes Here]`,
	Request:     GenerateDeleteEntityMethod(&models.Recommendation{}),
}

var LinkedRecommendationMethods = RecommendationMethods{
	GetRecommendation:    gqltag.LinkQuery(getRecommendation),
	ListRecommendations:  gqltag.LinkQuery(listRecommendations),
	CreateRecommendation: gqltag.LinkMutation(createRecommendation),
	UpdateRecommendation: gqltag.LinkMutation(updateRecommendation),
	DeleteRecommendation: gqltag.LinkMutation(deleteRecommendation),
}
