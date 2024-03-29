import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { MusicSource, MusicSourceFragments } from '../../types';

export const LIST_SPOTIFY_PLAYLISTS = 'LIST_SPOTIFY_PLAYLISTS';

export const LIST_SPOTIFY_PLAYLISTS_QUERY = gql`
  query LIST_SPOTIFY_PLAYLISTS($offset: Int!, $count: Int!) {
    private {
      listSpotifyPlaylists(offset: $offset, count: $count) {
        ...DefaultMusicSource
      }
    }
  }
  ${MusicSourceFragments.default}
`;

type ListSpotifyPlaylistsVariables = {
  offset?: number;
  count?: number;
};

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
