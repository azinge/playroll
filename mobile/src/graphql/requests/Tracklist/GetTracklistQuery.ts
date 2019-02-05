import gql from "graphql-tag";
import { Query } from "react-apollo";

import { CompiledRoll } from "../../types";

export const GET_TRACKLIST = "GET_TRACKLIST";

export const GET_TRACKLIST_QUERY = gql`
  query ${GET_TRACKLIST}($id: ID!) {
    tracklist(id: $id) {
      compiledRolls {
        id
        data {
          tracks {
            cover
            name
            provider
            providerID
            type
          }
        }
      }
    }
  }
`;

type GetTracklistVariables = {
  id?: number;
};

type GetTracklistData = {
  tracklist?: { id?: number; compiledRolls?: CompiledRoll[] };
};

export class GetTracklistQuery extends Query<
  GetTracklistData,
  GetTracklistVariables
> {
  static defaultProps = {
    query: GET_TRACKLIST_QUERY,
  };
}
