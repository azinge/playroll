import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Playroll, PlayrollFragments } from '../../types';

export const LIST_FRIENDS_PLAYROLLS = 'LIST_FRIENDS_PLAYROLLS';

export const LIST_FRIENDS_PLAYROLLS_QUERY = gql`
  query LIST_FRIENDS_PLAYROLLS {
    private {
      listFriendsPlayrolls {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type ListFriendsPlayrollsVariables = {};

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
