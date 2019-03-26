import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { MusicSource } from '../../types';

export const LIST_SPOTIFY_SAVED_TRACKS = 'LIST_SPOTIFY_SAVED_TRACKS';

export const LIST_SPOTIFY_SAVED_TRACKS_QUERY = gql`
  query LIST_SPOTIFY_SAVED_TRACKS($count: Int!) {
    private {
      listSpotifySavedTracks(count: $count) {
        provider
        providerID
        cover
        name
        creator
      }
    }
  }
`;

type ListSpotifySavedTracksVariables = {
  count?: number;
};

type ListSpotifySavedTracksData = {
  private: {
    listSpotifySavedTracks?: MusicSource[];
  };
};

export class ListSpotifySavedTracksQuery extends Query<
  ListSpotifySavedTracksData,
  ListSpotifySavedTracksVariables
> {
  static defaultProps = {
    query: LIST_SPOTIFY_SAVED_TRACKS_QUERY,
  };
}
