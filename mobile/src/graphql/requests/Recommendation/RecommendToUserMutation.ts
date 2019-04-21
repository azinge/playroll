import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import {
  Recommendation,
  RecommendationFragments,
  RollDataInput,
} from '../../types';

export const RECOMMEND_TO_USER = 'RECOMMEND_TO_USER';

export const RECOMMEND_TO_USER_MUTATION = gql`
  mutation RECOMMEND_TO_USER(
    $receiverID: Int
    $playrollID: Int
    $rollData: RollDataInput
  ) {
    private {
      recommendToAUser(
        receiverID: $receiverID
        playrollID: $playrollID
        rollData: $rollData
      ) {
        ...DefaultRecommendation
      }
    }
  }
  ${RecommendationFragments.default}
`;

type RecommendToUserVariables = {
  receiverID: number;
  playrollID: number;
  rollData: RollDataInput;
};

type RecommendToUserData = {
  private: {
    recommendToAUser?: Recommendation;
  };
};

export class RecommendToUserMutation extends Mutation<
  RecommendToUserData,
  RecommendToUserVariables
> {
  static defaultProps = {
    mutation: RECOMMEND_TO_USER_MUTATION,
  };
}
