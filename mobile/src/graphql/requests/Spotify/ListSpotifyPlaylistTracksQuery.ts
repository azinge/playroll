import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { MusicSource, MusicSourceFragments } from '../../types';

export const LIST_SPOTIFY_PLAYLIST_TRACKS = 'LIST_SPOTIFY_PLAYLIST_TRACKS';

export const LIST_SPOTIFY_PLAYLIST_TRACKS_QUERY = gql`
  query LIST_SPOTIFY_PLAYLIST_TRACKS($playlistID: String!) {
    private {
      listSpotifyPlaylistTracks(playlistID: $playlistID) {
        ...DefaultMusicSource
      }
    }
  }
  ${MusicSourceFragments.default}
`;

type ListSpotifyPlaylistTracksVariables = {
  playlistID?: number;
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
