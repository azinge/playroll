import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { MusicSource } from '../../types';

export const LIST_SPOTIFY_PLAYLIST_TRACKS = 'LIST_SPOTIFY_PLAYLIST_TRACKS';

export const LIST_SPOTIFY_PLAYLIST_TRACKS_QUERY = gql`
  query LIST_SPOTIFY_PLAYLIST_TRACKS($playlistID: String!) {
    private {
      listSpotifyPlaylistTracks(playlistID: $playlistID)
    }
  }
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
