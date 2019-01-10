import gql from "graphql-tag";
import { Query } from "react-apollo";

export interface MusicSource {
  cover?: string;
  name?: string;
  provider?: string;
  providerID?: string;
  type?: string;
}

export const SEARCH_SPOTIFY_QUERY = gql`
  query SEARCH_SPOTIFY($query: String, $searchType: String) {
    searchSpotify(query: $query, searchType: $searchType) {
      cover
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
> {}
