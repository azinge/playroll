import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Recommendation, RecommendationFragments } from '../../types';

export const LIST_EXCHANGED_RECOMMENDATIONS = 'LIST_EXCHANGED_RECOMMENDATIONS';

export const LIST_EXCHANGED_RECOMMENDATIONS_QUERY = gql`
  query LIST_EXCHANGED_RECOMMENDATIONS(
    $userID: ID!
    $offset: Int
    $count: Int
  ) {
    private {
      listExchangedRecommendations(
        userID: $userID
        offset: $offset
        count: $count
      ) {
        ...DefaultRecommendation
      }
    }
  }
  ${RecommendationFragments.default}
`;

type ListExchangedRecommendationsVariables = {
  userID?: number;
  offset?: number;
  count?: number;
};

type ListExchangedRecommendationsData = {
  private: {
    listExchangedRecommendations?: Recommendation[];
  };
};

export class ListExchangedRecommendationsQuery extends Query<
  ListExchangedRecommendationsData,
  ListExchangedRecommendationsVariables
> {
  static defaultProps = {
    query: LIST_EXCHANGED_RECOMMENDATIONS_QUERY,
  };
}
