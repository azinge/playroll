import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Relationship, RelationshipFragments } from '../../types';

export const LIST_FRIEND_REQUESTS = 'LIST_FRIEND_REQUESTS';

export const LIST_FRIEND_REQUESTS_QUERY = gql`
  query LIST_FRIEND_REQUESTS {
    private {
      listFriendRequests {
        ...RelationshipWithOtherUser
      }
    }
  }
  ${RelationshipFragments.withOtherUser}
`;

type ListFriendRequestsVariables = {};

type ListFriendRequestsData = {
  listFriendRequests: Relationship[];
};

export class ListFriendRequestsQuery extends Query<
  ListFriendRequestsData,
  ListFriendRequestsVariables
> {
  static defaultProps = {
    query: LIST_FRIEND_REQUESTS_QUERY,
  };
}
