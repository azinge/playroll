import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Tracklist, TracklistFragments } from '../../types';

export type ProgressiveGenerateTracklistOutput = {
  isComplete?: boolean;
  currentRollIndex?: number;
  currentSourceIndex?: number;
  tracklistID?: number;
  playrollID?: number;
};

export const ProgressiveGenerateTracklistOutputFragments = {
  default: gql`
    fragment DefaultProgressiveGenerateTracklistOutput on ProgressiveGenerateTracklistOutput {
      isComplete
      currentRollIndex
      currentSourceIndex
      tracklistID
      playrollID
    }
  `,
};

export const PROGRESSIVE_GENERATE_TRACKLIST = 'PROGRESSIVE_GENERATE_TRACKLIST';

export const PROGRESSIVE_GENERATE_TRACKLIST_MUTATION = gql`
  mutation PROGRESSIVE_GENERATE_TRACKLIST(
    $playrollID: ID!
    $tracklistID: ID
    $batchSize: Int
  ) {
    private {
      progressiveGenerateTracklist(
        playrollID: $playrollID
        tracklistID: $tracklistID
        batchSize: $batchSize
      ) {
        ...DefaultProgressiveGenerateTracklistOutput
      }
    }
  }
  ${ProgressiveGenerateTracklistOutputFragments.default}
`;

type ProgressiveGenerateTracklistVariables = {
  playrollID?: number;
  tracklistID?: number;
};

type ProgressiveGenerateTracklistData = {
  private: {
    progressiveGenerateTracklist?: Tracklist;
  };
};

export class ProgressiveGenerateTracklistMutation extends Mutation<
  ProgressiveGenerateTracklistData,
  ProgressiveGenerateTracklistVariables
> {
  static defaultProps = {
    mutation: PROGRESSIVE_GENERATE_TRACKLIST_MUTATION,
  };
}
