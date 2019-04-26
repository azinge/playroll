import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { User, UserFragments } from '../../types';

export const LIST_FRIENDS = 'LIST_FRIENDS';

export const LIST_FRIENDS_QUERY = gql`
  query LIST_FRIENDS($offset: Int, $count: Int) {
    private {
      listFriends(offset: $offset, count: $count) {
        ...UserWithRelationships
      }
    }
  }
  ${UserFragments.withRelationships}
`;

type ListFriendsVariables = {
  offset: number;
  count: number;
};

type ListFriendsData = {
  listFriends: User[];
};

export class ListFriendsQuery extends Query<
  ListFriendsData,
  ListFriendsVariables
> {
  static defaultProps = {
    query: LIST_FRIENDS_QUERY,
  };
}
