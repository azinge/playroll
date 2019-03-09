import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { MusicSource, MusicSourceFragments } from '../../types';

export const SEARCH_SPOTIFY = 'SEARCH_SPOTIFY';

export const SEARCH_SPOTIFY_QUERY = gql`
  query SEARCH_SPOTIFY($query: String, $searchType: String) {
    searchSpotify(query: $query, searchType: $searchType) {
      ...DefaultMusicSource
    }
  }
  ${MusicSourceFragments.default}
`;

type SearchSpotifyVariables = {
  query?: string;
  searchType?: string;
};

type SearchSpotifyData = {
  searchSpotify?: MusicSource[];
};

export class SearchSpotifyQuery extends Query<
  SearchSpotifyData,
  SearchSpotifyVariables
> {
  static defaultProps = {
    query: SEARCH_SPOTIFY_QUERY,
  };
}
