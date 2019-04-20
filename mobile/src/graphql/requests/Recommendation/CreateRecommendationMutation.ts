import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {
  Recommendation,
  RecommendationFragments,
  RecommendationInput,
} from '../../types';

export const CREATE_RECOMMENDATION = 'CREATE_RECOMMENDATION';

export const CREATE_RECOMMENDATION_MUTATION = gql`
  mutation CREATE_RECOMMENDATION($input: RecommendationInput!) {
    private {
      createRecommendation(input: $input) {
        ...DefaultRecommendation
      }
    }
  }
  ${RecommendationFragments.default}
`;

type CreateRecommendationVariables = {
  input: RecommendationInput;
};

type CreateRecommendationData = {
  private: {
    createRecommendation?: Recommendation;
  };
};

export class CreateRecommendationMutation extends Mutation<
  CreateRecommendationData,
  CreateRecommendationVariables
> {
  static defaultProps = {
    mutation: CREATE_RECOMMENDATION_MUTATION,
  };
}
