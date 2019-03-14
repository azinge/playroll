import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Playroll, PlayrollFragments } from '../../types';

export const GET_CURRENT_USER_PLAYROLL = 'GET_CURRENT_USER_PLAYROLL';

export const GET_CURRENT_USER_PLAYROLL_QUERY = gql`
  query GET_CURRENT_USER_PLAYROLL($id: ID!) {
    private {
      currentUserPlayroll(id: $id) {
        ...PlayrollWithTracklist
      }
    }
  }
  ${PlayrollFragments.withTracklist}
`;

type GetCurrentUserPlayrollVariables = {
  id?: number;
};

type GetCurrentUserPlayrollData = {
  private: {
    currentUserPlayroll?: Playroll;
  };
};

export class GetCurrentUserPlayrollQuery extends Query<
  GetCurrentUserPlayrollData,
  GetCurrentUserPlayrollVariables
> {
  static defaultProps = {
    query: GET_CURRENT_USER_PLAYROLL_QUERY,
  };
}
