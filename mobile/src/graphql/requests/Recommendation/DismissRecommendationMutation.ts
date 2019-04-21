import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Recommendation, RecommendationFragments } from '../../types';

export const DISMISS_RECOMMENDATION = 'DISMISS_RECOMMENDATION';

export const DISMISS_RECOMMENDATION_MUTATION = gql`
  mutation DISMISS_RECOMMENDATION($recommendationID: ID) {
    private {
      dismissRecommendation(recommendationID: $recommendationID) {
        ...DefaultRecommendation
      }
    }
  }
  ${RecommendationFragments.default}
`;

type DismissRecommendationVariables = {
  recommendationID: number;
};

type DismissRecommendationData = {
  private: {
    dismissRecommendation?: Recommendation;
  };
};

export class DismissRecommendationMutation extends Mutation<
  DismissRecommendationData,
  DismissRecommendationVariables
> {
  static defaultProps = {
    mutation: DISMISS_RECOMMENDATION_MUTATION,
  };
}
