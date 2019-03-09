import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Playroll, PlayrollFragments } from '../../types';

export const LIST_CURRENT_USER_PLAYROLLS = 'LIST_CURRENT_USER_PLAYROLLS';

export const LIST_CURRENT_USER_PLAYROLLS_QUERY = gql`
  query LIST_CURRENT_USER_PLAYROLLS {
    listCurrentUserPlayrolls {
      ...PlayrollWithTracklist
    }
  }
  ${PlayrollFragments.withTracklist}
`;

type ListCurrentUserPlayrollsVariables = {};

type ListCurrentUserPlayrollsData = {
  listCurrentUserPlayrolls?: Playroll[];
};

export class ListCurrentUserPlayrollsQuery extends Query<
  ListCurrentUserPlayrollsData,
  ListCurrentUserPlayrollsVariables
> {
  static defaultProps = {
    query: LIST_CURRENT_USER_PLAYROLLS_QUERY,
  };
}
