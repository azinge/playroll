import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Playroll, PlayrollFragments } from '../../types';

export const LIST_POPULAR_PLAYROLLS = 'LIST_POPULAR_PLAYROLLS';

export const LIST_POPULAR_PLAYROLLS_QUERY = gql`
  query LIST_POPULAR_PLAYROLLS {
    private {
      listPopularPlayrolls {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type ListPopularPlayrollsVariables = {};

type ListPopularPlayrollsData = {
  private: {
    listPopularPlayrolls?: Playroll[];
  };
};

export class ListPopularPlayrollsQuery extends Query<
  ListPopularPlayrollsData,
  ListPopularPlayrollsVariables
> {
  static defaultProps = {
    query: LIST_POPULAR_PLAYROLLS_QUERY,
  };
}
