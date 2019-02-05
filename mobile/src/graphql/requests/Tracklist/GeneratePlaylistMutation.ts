import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export const GENERATE_PLAYLIST = "GENERATE_PLAYLIST";

export const GENERATE_PLAYLIST_MUTATION = gql`
  mutation ${GENERATE_PLAYLIST}($tracklistID: ID!, $playlistName: String) {
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
> {
  static defaultProps = {
    mutation: GENERATE_PLAYLIST_MUTATION,
  };
}
