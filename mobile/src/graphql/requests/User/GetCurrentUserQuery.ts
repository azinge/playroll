import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { User, UserFragments } from '../../types';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';

export const GET_CURRENT_USER_QUERY = gql`
  query GET_CURRENT_USER($deviceToken: String) {
    private {
      currentUser(deviceToken: $deviceToken) {
        ...DefaultUser
      }
    }
  }
  ${UserFragments.default}
`;

type GetCurrentUserVariables = {
  deviceToken?: string;
};

type GetCurrentUserData = {
  private: {
    currentUser?: User;
  };
};

export class GetCurrentUserQuery extends Query<
  GetCurrentUserData,
  GetCurrentUserVariables
> {
  static defaultProps = {
    query: GET_CURRENT_USER_QUERY,
  };
}
