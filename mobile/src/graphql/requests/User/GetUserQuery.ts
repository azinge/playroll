import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { User, UserFragments } from '../../types';

export const GET_USER = 'GET_USER';

export const GET_USER_QUERY = gql`
  query GET_USER($id: ID!) {
    private {
      user(id: $id) {
        ...UserWithRelationships
      }
    }
  }
  ${UserFragments.withRelationships}
`;

type GetUserVariables = {
  id?: number;
};

type GetUserData = {
  private: {
    user?: User;
  };
};

export class GetUserQuery extends Query<GetUserData, GetUserVariables> {
  static defaultProps = {
    query: GET_USER_QUERY,
  };
}
