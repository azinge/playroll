import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { User } from '../../types';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';

export const GET_CURRENT_USER_QUERY = gql`
  query ${GET_CURRENT_USER} {
    currentUser {
      id
      name
      avatar
      email
      accountType
    }
  }
`;

type GetCurrentUserVariables = {
  id?: number;
};

type GetCurrentUserData = {
  currentUser?: User;
};

export class GetCurrentUserQuery extends Query<
  GetCurrentUserData,
  GetCurrentUserVariables
> {
  static defaultProps = {
    query: GET_CURRENT_USER_QUERY,
  };
}
