import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Relationship, RelationshipFragements } from '../../types';

export const SEND_FRIEND_REQUEST = 'SEND_FRIEND_REQUEST';

export const SEND_FRIEND_REQUEST_MUTATION = gql`
  mutation SEND_FRIEND_REQUEST($userID: ID!) {
    private {
      sendFriendRequest(userID: $userID)
    }
  }
  ${RelationshipFragements.default}
`;

type SendFriendRequestVariables = {
  userID?: String;
};

type SendFriendRequestData = {
  private: {
    sendFriendRequest: Relationship;
  };
};

export class SendFriendRequest extends Mutation<
  SendFriendRequestVariables,
  SendFriendRequestData
> {
  static defaultProps = {
    mutation: SEND_FRIEND_REQUEST_MUTATION,
  };
}
