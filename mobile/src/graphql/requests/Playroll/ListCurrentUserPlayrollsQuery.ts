import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Playroll, PlayrollFragments } from '../../types';

export const LIST_CURRENT_USER_PLAYROLLS = 'LIST_CURRENT_USER_PLAYROLLS';

export const LIST_CURRENT_USER_PLAYROLLS_QUERY = gql`
  query LIST_CURRENT_USER_PLAYROLLS($offset: Int, $count: Int) {
    private {
      listCurrentUserPlayrolls(offset: $offset, count: $count) {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type ListCurrentUserPlayrollsVariables = {
  offset: number;
  count: number;
};

type ListCurrentUserPlayrollsData = {
  private: {
    listCurrentUserPlayrolls?: Playroll[];
  };
};

export class ListCurrentUserPlayrollsQuery extends Query<
  ListCurrentUserPlayrollsData,
  ListCurrentUserPlayrollsVariables
> {
  static defaultProps = {
    query: LIST_CURRENT_USER_PLAYROLLS_QUERY,
  };
}
