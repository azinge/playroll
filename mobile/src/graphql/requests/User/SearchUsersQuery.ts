import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { User, UserFragments } from '../../types';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const SEARCH_USERS = 'SEARCH_USERS';

export const GET_CURRENT_USER_QUERY = gql`
  query GET_CURRENT_USER {
    private {
      currentUser {
        ...DefaultUser
      }
    }
  }
  ${UserFragments.default}
`;

export const SEARCH_USERS_QUERY = gql`
  query SEARCH_USERS($query: String, $offset: Int, $count: Int) {
    private {
      searchUsers(query: $query, offset: $offset, count: $count) {
        ...DefaultUser
      }
    }
  }
  ${UserFragments.default}
`;

type GetCurrentUserVariables = {
  id?: number;
};

type SearchUsersVariables = {
  query: string;
  offset?: number;
  count?: number;
};

type GetCurrentUserData = {
  private: {
    currentUser?: User;
  };
};

type SearchUsersData = {
  private: {
    searchUsers?: [User];
  };
};

export class SearchUsersQuery extends Query<
  SearchUsersData,
  SearchUsersVariables
> {
  static defaultProps = {
    query: SEARCH_USERS_QUERY,
  };
}
