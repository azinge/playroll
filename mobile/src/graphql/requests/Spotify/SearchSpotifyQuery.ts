import gql from "graphql-tag";
import { Query } from "react-apollo";
import { MusicSource } from "../../types";

export const SEARCH_SPOTIFY = "SEARCH_SPOTIFY";

export const SEARCH_SPOTIFY_QUERY = gql`
  query ${SEARCH_SPOTIFY}($query: String, $searchType: String) {
    searchSpotify(query: $query, searchType: $searchType) {
      cover
      creator
      name
      provider
      providerID
      type
    }
  }
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
