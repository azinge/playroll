import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { MusicSource } from "components/Search/Search.requests";

export interface CompiledRoll {
  id?: number;
  data?: { tracks?: MusicSource[] };
}

export const GET_TRACKLIST_QUERY = gql`
  query GET_TRACKLIST($id: ID!) {
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
> {}

// TODO: Pull playlist name from Playroll
export const GENERATE_PLAYLIST_MUTATION = gql`
  mutation GENERATE_PLAYLIST($tracklistID: ID!, $playlistName: String) {
    generatePlaylist(tracklistID: $tracklistID, playlistName: $playlistName)
  }
`;

type GeneratePlaylistVariables = {
  tracklistID?: number;
  playlistName?: string;
};

type GeneratePlaylistData = {
  generatePlaylist: string[];
};

export class GeneratePlaylistMutation extends Mutation<
  GeneratePlaylistData,
  GeneratePlaylistVariables
> {}
