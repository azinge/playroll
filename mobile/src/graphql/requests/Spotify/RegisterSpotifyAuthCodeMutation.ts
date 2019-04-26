import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const REGISTER_SPOTIFY_AUTH_CODE = 'REGISTER_SPOTIFY_AUTH_CODE';

export const REGISTER_SPOTIFY_AUTH_CODE_MUTATION = gql`
  mutation REGISTER_SPOTIFY_AUTH_CODE($code: String, $devMode: Boolean) {
    private {
      registerSpotifyAuthCode(code: $code, devMode: $devMode) {
        id
      }
    }
  }
`;

type RegisterSpotifyAuthCodeVariables = {
  code?: string;
  devMode?: boolean;
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
