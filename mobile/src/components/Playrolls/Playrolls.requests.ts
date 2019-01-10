import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

export const GET_PLAYROLLS = gql`
  query GET_PLAYROLLS {
    listPlayrolls {
      id
      name
      rolls {
        id
        data {
          sources {
            cover
            name
            type
          }
        }
      }
      tracklists {
        id
      }
    }
  }
`;
