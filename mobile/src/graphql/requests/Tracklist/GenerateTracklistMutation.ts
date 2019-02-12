import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const GENERATE_TRACKLIST = 'GENERATE_TRACKLIST';

export const GENERATE_TRACKLIST_MUTATION = gql`
  mutation ${GENERATE_TRACKLIST}($playrollID: ID!) {
    generateTracklist(playrollID: $playrollID) {
      id
    }
  }
`;

type GenerateTracklistVariables = {
  playrollID?: number;
};

type GenerateTracklistData = {
  generateTracklist?: { id: number };
};

export class GenerateTracklistMutation extends Mutation<
  GenerateTracklistData,
  GenerateTracklistVariables
> {
  static defaultProps = {
    mutation: GENERATE_TRACKLIST_MUTATION,
  };
}
