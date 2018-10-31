import gql from "graphql-tag";

export const GET_PLAYROLLS = gql`
  {
    listPlayrolls {
      name
    }
  }
`;
