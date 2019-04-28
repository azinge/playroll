import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { MusicSource, MusicSourceFragments } from '../../types';

export const LIST_SPOTIFY_PLAYLIST_TRACKS = 'LIST_SPOTIFY_PLAYLIST_TRACKS';

export const LIST_SPOTIFY_PLAYLIST_TRACKS_QUERY = gql`
  query LIST_SPOTIFY_PLAYLIST_TRACKS(
    $playlistID: String!
    $offset: Int!
    $count: Int!
  ) {
    private {
      listSpotifyPlaylistTracks(
        playlistID: $playlistID
        offset: $offset
        count: $count
      ) {
        ...DefaultMusicSource
      }
    }
  }
  ${MusicSourceFragments.default}
`;

type ListSpotifyPlaylistTracksVariables = {
  playlistID?: number;
  offset?: number;
  count?: number;
};

type ListSpotifyPlaylistTracksData = {
  private: {
    listSpotifyPlaylistTracks?: MusicSource[];
  };
};

export class ListSpotifyPlaylistTracksQuery extends Query<
  ListSpotifyPlaylistTracksData,
  ListSpotifyPlaylistTracksVariables
> {
  static defaultProps = {
    query: LIST_SPOTIFY_PLAYLIST_TRACKS_QUERY,
  };
}
