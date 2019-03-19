import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Recommendation, RecommendationFragments } from '../../types';

export const LIST_CURRENT_USER_RECOMMENDATIONS =
  'LIST_CURRENT_USER_RECOMMENDATIONS';

export const LIST_CURRENT_USER_RECOMMENDATIONS_QUERY = gql`
  query LIST_CURRENT_USER_RECOMMENDATIONS {
    private {
      listCurrentUserRecommendations {
        ...DefaultRecommendation
      }
    }
  }
  ${RecommendationFragments.default}
`;

type ListCurrentUserRecommendationsVariables = {};

type ListCurrentUserRecommendationsData = {
  private: {
    listCurrentUserRecommendations?: Recommendation[];
  };
};

export class ListCurrentUserRecommendationsQuery extends Query<
  ListCurrentUserRecommendationsData,
  ListCurrentUserRecommendationsVariables
> {
  static defaultProps = {
    query: LIST_CURRENT_USER_RECOMMENDATIONS_QUERY,
  };
}
