import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Playroll } from "../../types";

export const GET_PLAYROLL_QUERY = gql`
  query GET_PLAYROLL($id: ID!) {
    playroll(id: $id) {
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

type GetPlayrollVariables = {
  id?: number;
};

type GetPlayrollData = {
  playroll?: Playroll;
};

export class GetPlayrollQuery extends Query<
  GetPlayrollData,
  GetPlayrollVariables
> {}
