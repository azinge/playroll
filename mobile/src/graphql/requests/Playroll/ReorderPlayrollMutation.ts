import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Playroll, PlayrollInput, PlayrollFragments } from '../../types';

export const REORDER_PLAYROLL = 'REORDER_PLAYROLL';

export const REORDER_PLAYROLL_MUTATION = gql`
  mutation REORDER_PLAYROLL(
    $playrollID: ID!
    $rollIDs: [ID]!
    $orders: [Int]!
  ) {
    private {
      reorderPlayroll(
        playrollID: $playrollID
        rollIDs: $rollIDs
        orders: $orders
      ) {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type ReorderPlayrollVariables = {
  playrollID: number;
  rollIDs: number[];
  orders: number[];
};

type ReorderPlayrollData = {
  private: {
    reorderPlayroll?: Playroll;
  };
};

export class ReorderPlayrollMutation extends Mutation<
  ReorderPlayrollData,
  ReorderPlayrollVariables
> {
  static defaultProps = {
    mutation: REORDER_PLAYROLL_MUTATION,
  };
}
