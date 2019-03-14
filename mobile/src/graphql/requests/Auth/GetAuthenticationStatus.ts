import gql from 'graphql-tag';

export const GET_AUTHENTICATION_STATUS = gql`
  {
    coreData @client {
      isAuthenticated
    }
  }
`;
