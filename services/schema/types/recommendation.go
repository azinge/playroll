package types

import (
	"github.com/cazinge/playroll/services/gqltag"
	"github.com/cazinge/playroll/services/models"
)

type RecommendationTypes struct {
	Recommendation      *gqltag.Output `gql:"Recommendation"`
	RecommendationInput *gqltag.Input  `gql:"RecommendationInput"`
}

var recommendationType = gqltag.Type{
	Description: `[Recommendation Type Description Goes Here]`,
	Fields:      &models.RecommendationOutput{},
}

var recommendationInputType = gqltag.Type{
	Description: `[Recommendation Input Type Description Goes Here]`,
	Fields:      &models.RecommendationInput{},
}

var LinkedRecommendationTypes = RecommendationTypes{
	Recommendation:      gqltag.LinkOutput(recommendationType),
	RecommendationInput: gqltag.LinkInput(recommendationInputType),
}
