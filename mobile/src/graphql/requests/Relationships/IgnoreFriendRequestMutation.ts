import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Relationship, RelationshipFragments } from '../../types';

export const IGNORE_FRIEND_REQUEST = 'IGNORE_FRIEND_REQUEST';

export const IGNORE_FRIEND_REQUEST_MUTATION = gql`
  mutation IGNORE_FRIEND_REQUEST($userID: ID!) {
    private {
      ignoreFriendRequest(userID: $userID) {
        ...DefaultRelationship
      }
    }
  }
  ${RelationshipFragments.default}
`;

type IgnoreFriendRequestVariables = {
  userID?: number;
};

type IgnoreFriendRequestData = {
  private: {
    ignoreFriendRequest: Relationship;
  };
};

export class IgnoreFriendRequestMutation extends Mutation<
  IgnoreFriendRequestData,
  IgnoreFriendRequestVariables
> {
  static defaultProps = {
    mutation: IGNORE_FRIEND_REQUEST_MUTATION,
  };
}
