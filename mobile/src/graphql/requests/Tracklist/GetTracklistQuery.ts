import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Tracklist, TracklistFragments } from '../../types';

export const GET_TRACKLIST = 'GET_TRACKLIST';

export const GET_TRACKLIST_QUERY = gql`
  query GET_TRACKLIST($id: ID!) {
    admin {
      tracklist(id: $id) {
        ...DefaultTracklist
      }
    }
  }
  ${TracklistFragments.default}
`;

type GetTracklistVariables = {
  id?: number;
};

type GetTracklistData = {
  admin: {
    tracklist?: Tracklist;
  };
};

export class GetTracklistQuery extends Query<
  GetTracklistData,
  GetTracklistVariables
> {
  static defaultProps = {
    query: GET_TRACKLIST_QUERY,
  };
}
