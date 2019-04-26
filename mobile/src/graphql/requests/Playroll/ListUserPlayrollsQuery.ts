import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Playroll, PlayrollFragments } from '../../types';

export const LIST_USER_PLAYROLLS = 'LIST_USER_PLAYROLLS';

export const LIST_USER_PLAYROLLS_QUERY = gql`
  query LIST_USER_PLAYROLLS($userID: ID, $offset: Int, $count: Int) {
    private {
      listUserPlayrolls(userID: $userID, offset: $offset, count: $count) {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type ListUserPlayrollsVariables = {
  userID: number;
  offset: number;
  count: number;
};

type ListUserPlayrollsData = {
  private: {
    listUserPlayrolls?: Playroll[];
  };
};

export class ListUserPlayrollsQuery extends Query<
  ListUserPlayrollsData,
  ListUserPlayrollsVariables
> {
  static defaultProps = {
    query: LIST_USER_PLAYROLLS_QUERY,
  };
}
