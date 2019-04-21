import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { User, UserFragments } from '../../types';

export const LIST_FRIENDS = 'LIST_FRIENDS';

export const LIST_FRIENDS_QUERY = gql`
  query LIST_FRIENDS {
    private {
      listFriends {
        ...UserWithRelationships
      }
    }
  }
  ${UserFragments.withRelationships}
`;

type ListFriendsVariables = {};

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
