import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Playroll, PlayrollFragments } from '../../types';

export const LIST_FEATURED_PLAYROLLS = 'LIST_FEATURED_PLAYROLLS';

export const LIST_FEATURED_PLAYROLLS_QUERY = gql`
  query LIST_FEATURED_PLAYROLLS {
    private {
      listFeaturedPlayrolls {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type ListFeaturedPlayrollsVariables = {};

type ListFeaturedPlayrollsData = {
  private: {
    listFeaturedPlayrolls?: Playroll[];
  };
};

export class ListFeaturedPlayrollsQuery extends Query<
  ListFeaturedPlayrollsData,
  ListFeaturedPlayrollsVariables
> {
  static defaultProps = {
    query: LIST_FEATURED_PLAYROLLS_QUERY,
  };
}
