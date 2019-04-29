import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Recommendation, RecommendationFragments } from '../../types';

export const LIST_SENT_RECOMMENDATIONS = 'LIST_SENT_RECOMMENDATIONS';

export const LIST_SENT_RECOMMENDATIONS_QUERY = gql`
  query LIST_SENT_RECOMMENDATIONS($offset: Int, $count: Int) {
    private {
      listSentRecommendations(offset: $offset, count: $count) {
        ...DefaultRecommendation
      }
    }
  }
  ${RecommendationFragments.default}
`;

type ListSentRecommendationsVariables = {
  offset?: number;
  count?: number;
};

type ListSentRecommendationsData = {
  private: {
    listSentRecommendations?: Recommendation[];
  };
};

export class ListSentRecommendationsQuery extends Query<
  ListSentRecommendationsData,
  ListSentRecommendationsVariables
> {
  static defaultProps = {
    query: LIST_SENT_RECOMMENDATIONS_QUERY,
  };
}
