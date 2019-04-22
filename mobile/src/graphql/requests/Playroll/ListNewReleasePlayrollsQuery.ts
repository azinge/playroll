import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Playroll, PlayrollFragments } from '../../types';

export const LIST_NEW_RELEASE_PLAYROLLS = 'LIST_NEW_RELEASE_PLAYROLLS';

export const LIST_NEW_RELEASE_PLAYROLLS_QUERY = gql`
  query LIST_NEW_RELEASE_PLAYROLLS {
    private {
      listNewReleasePlayrolls {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type ListNewReleasePlayrollsVariables = {};

type ListNewReleasePlayrollsData = {
  private: {
    listNewReleasePlayrolls?: Playroll[];
  };
};

export class ListNewReleasePlayrollsQuery extends Query<
  ListNewReleasePlayrollsData,
  ListNewReleasePlayrollsVariables
> {
  static defaultProps = {
    query: LIST_NEW_RELEASE_PLAYROLLS_QUERY,
  };
}
