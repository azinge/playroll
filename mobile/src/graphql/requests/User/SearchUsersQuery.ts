import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { User, UserFragments } from '../../types';

export const SEARCH_USERS = 'SEARCH_USERS';

export const SEARCH_USERS_QUERY = gql`
  query SEARCH_USERS($query: String, $offset: Int, $count: Int) {
    private {
      searchUsers(query: $query, offset: $offset, count: $count) {
        ...UserWithRelationships
      }
    }
  }
  ${UserFragments.withRelationships}
`;

type SearchUsersVariables = {
  query: string;
  offset?: number;
  count?: number;
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
