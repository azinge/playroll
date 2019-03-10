import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Playroll, PlayrollFragments } from '../../../graphql/types';

export const LIST_PLAYROLLS = 'LIST_PLAYROLLS';

export const LIST_PLAYROLLS_QUERY = gql`
  query LIST_PLAYROLLS {
    admin {
      listPlayrolls {
        ...PlayrollWithTracklist
      }
    }
  }
  ${PlayrollFragments.withTracklist}
`;

type ListPlayrollsVariables = {};

type ListPlayrollsData = {
  admin: {
    listPlayrolls?: Playroll[];
  };
};

export class ListPlayrollsQuery extends Query<
  ListPlayrollsData,
  ListPlayrollsVariables
> {
  static defaultProps = {
    query: LIST_PLAYROLLS_QUERY,
  };
}
