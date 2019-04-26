import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Playroll, PlayrollFragments } from '../../types';

export const LIST_FRIENDS_PLAYROLLS = 'LIST_FRIENDS_PLAYROLLS';

export const LIST_FRIENDS_PLAYROLLS_QUERY = gql`
  query LIST_FRIENDS_PLAYROLLS($offset: Int, $count: Int) {
    private {
      listFriendsPlayrolls(offset: $offset, count: $count) {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type ListFriendsPlayrollsVariables = {
  offset: number;
  count: number;
};

type ListFriendsPlayrollsData = {
  private: {
    listFriendsPlayrolls?: Playroll[];
  };
};

export class ListFriendsPlayrollsQuery extends Query<
  ListFriendsPlayrollsData,
  ListFriendsPlayrollsVariables
> {
  static defaultProps = {
    query: LIST_FRIENDS_PLAYROLLS_QUERY,
  };
}
