import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Relationship, RelationshipFragments } from '../../types';

export const ACCEPT_FRIEND_REQUEST = 'ACCEPT_FRIEND_REQUEST';

export const ACCEPT_FRIEND_REQUEST_MUTATION = gql`
  mutation ACCEPT_FRIEND_REQUEST($userID: ID!) {
    private {
      acceptFriendRequest(userID: $userID) {
        ...DefaultRelationship
      }
    }
  }
  ${RelationshipFragments.default}
`;

type AcceptFriendRequestVariables = {
  userID?: number;
};

type AcceptFriendRequestData = {
  private: {
    acceptFriendRequest: Relationship;
  };
};

export class AcceptFriendRequestMutation extends Mutation<
  AcceptFriendRequestData,
  AcceptFriendRequestVariables
> {
  static defaultProps = {
    mutation: ACCEPT_FRIEND_REQUEST_MUTATION,
  };
}
