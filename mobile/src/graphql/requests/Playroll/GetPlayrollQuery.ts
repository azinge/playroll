import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Playroll, PlayrollFragments } from '../../types';

export const GET_PLAYROLL = 'GET_PLAYROLL';

export const GET_PLAYROLL_QUERY = gql`
  query GET_PLAYROLL($id: ID!) {
    private {
      playroll(id: $id) {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type GetPlayrollVariables = {
  id?: number;
};

type GetPlayrollData = {
  private: {
    playroll?: Playroll;
  };
};

export class GetPlayrollQuery extends Query<
  GetPlayrollData,
  GetPlayrollVariables
> {
  static defaultProps = {
    query: GET_PLAYROLL_QUERY,
  };
}
