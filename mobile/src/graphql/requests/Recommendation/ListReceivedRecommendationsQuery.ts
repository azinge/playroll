import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Recommendation, RecommendationFragments } from '../../types';

export const LIST_RECEIVED_RECOMMENDATIONS = 'LIST_RECEIVED_RECOMMENDATIONS';

export const LIST_RECEIVED_RECOMMENDATIONS_QUERY = gql`
  query LIST_RECEIVED_RECOMMENDATIONS($offset: Int, $count: Int) {
    private {
      listReceivedRecommendations(offset: $offset, count: $count) {
        ...DefaultRecommendation
      }
    }
  }
  ${RecommendationFragments.default}
`;

type ListReceivedRecommendationsVariables = {
  offset?: number;
  count?: number;
};

type ListReceivedRecommendationsData = {
  private: {
    listReceivedRecommendations?: Recommendation[];
  };
};

export class ListReceivedRecommendationsQuery extends Query<
  ListReceivedRecommendationsData,
  ListReceivedRecommendationsVariables
> {
  static defaultProps = {
    query: LIST_RECEIVED_RECOMMENDATIONS_QUERY,
  };
}
