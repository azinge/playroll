import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { MusicSource } from '../../types';

export const LIST_SPOTIFY_PLAYLISTS = 'LIST_SPOTIFY_PLAYLISTS';

export const LIST_SPOTIFY_PLAYLISTS_QUERY = gql`
  query LIST_SPOTIFY_PLAYLISTS($count: Int!) {
    private {
      listSpotifyPlaylists(count: $count)
    }
  }
`;

type ListSpotifyPlaylistsVariables = {};

type ListSpotifyPlaylistsData = {
  private: {
    listSpotifyPlaylists?: MusicSource[];
  };
};

export class ListSpotifyPlaylistsQuery extends Query<
  ListSpotifyPlaylistsData,
  ListSpotifyPlaylistsVariables
> {
  static defaultProps = {
    query: LIST_SPOTIFY_PLAYLISTS_QUERY,
  };
}
