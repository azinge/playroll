import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { MusicSource, MusicSourceFragments } from '../../types';

export const LIST_SPOTIFY_SAVED_TRACKS = 'LIST_SPOTIFY_SAVED_TRACKS';

export const LIST_SPOTIFY_SAVED_TRACKS_QUERY = gql`
  query LIST_SPOTIFY_SAVED_TRACKS($offset: Int!, $count: Int!) {
    private {
      listSpotifySavedTracks(offset: $offset, count: $count) {
        ...DefaultMusicSource
      }
    }
  }
  ${MusicSourceFragments.default}
`;

type ListSpotifySavedTracksVariables = {
  offset?: number;
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
