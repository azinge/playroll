import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const CURRENT_USER_SPOTIFY_STATUS = 'CURRENT_USER_SPOTIFY_STATUS';

export const CURRENT_USER_SPOTIFY_STATUS_QUERY = gql`
  query CURRENT_USER_SPOTIFY_STATUS {
    private {
      currentUserSpotifyStatus
    }
  }
`;

type CurrentUserSpotifyStatusVariables = {};

type CurrentUserSpotifyStatusData = {
  private: {
    currentUserSpotifyStatus?: string;
  };
};

export class CurrentUserSpotifyStatusQuery extends Query<
  CurrentUserSpotifyStatusData,
  CurrentUserSpotifyStatusVariables
> {
  static defaultProps = {
    query: CURRENT_USER_SPOTIFY_STATUS_QUERY,
  };
}
