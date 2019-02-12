import gql from "graphql-tag";
import { Query } from "react-apollo";

export const GET_AUTHENTICATION_STATUS = gql`
  {
    coreData @client {
      isAuthenticated
    }
  }
`;
