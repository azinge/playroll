import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Relationship, RelationshipFragments } from '../../types';

export const SEND_FRIEND_REQUEST = 'SEND_FRIEND_REQUEST';

export const SEND_FRIEND_REQUEST_MUTATION = gql`
  mutation SEND_FRIEND_REQUEST($userID: ID!) {
    private {
      sendFriendRequest(userID: $userID) {
        ...DefaultRelationship
      }
    }
  }
  ${RelationshipFragments.default}
`;

type SendFriendRequestVariables = {
  userID?: number;
};

type SendFriendRequestData = {
  sendFriendRequest: Relationship;
};

export class SendFriendRequestMutation extends Mutation<
  SendFriendRequestData,
  SendFriendRequestVariables
> {
  static defaultProps = {
    mutation: SEND_FRIEND_REQUEST_MUTATION,
  };
}
