import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Recommendation, RecommendationFragments } from '../../types';

export const LIST_CURRENT_USER_RECOMMENDATIONS =
  'LIST_CURRENT_USER_RECOMMENDATIONS';

export const LIST_CURRENT_USER_RECOMMENDATIONS_QUERY = gql`
  query LIST_CURRENT_USER_RECOMMENDATIONS($offset: Int, $count: Int) {
    private {
      listCurrentUserRecommendations(offset: $offset, count: $count) {
        ...DefaultRecommendation
      }
    }
  }
  ${RecommendationFragments.default}
`;

type ListCurrentUserRecommendationsVariables = {
  offset?: number;
  count?: number;
};

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
