import gql from 'graphql-tag';

export const GET_AUTHENTICATION_STATUS = gql`
  query GET_AUTHENTICATION_STATUS {
    coreData @client {
      isAuthenticated
    }
  }
`;
