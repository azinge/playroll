import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const REGISTER_SPOTIFY_AUTH_CODE = 'REGISTER_SPOTIFY_AUTH_CODE';

export const REGISTER_SPOTIFY_AUTH_CODE_MUTATION = gql`
  mutation REGISTER_SPOTIFY_AUTH_CODE($code: String) {
    private {
      registerSpotifyAuthCode(code: $code) {
        id
      }
    }
  }
`;

type RegisterSpotifyAuthCodeVariables = {
  code?: string;
};

type RegisterSpotifyAuthCodeData = {
  private: {
    registerSpotifyAuthCode?: { id: string };
  };
};

export class RegisterSpotifyAuthCodeMutation extends Mutation<
  RegisterSpotifyAuthCodeData,
  RegisterSpotifyAuthCodeVariables
> {
  static defaultProps = {
    mutation: REGISTER_SPOTIFY_AUTH_CODE_MUTATION,
  };
}
