import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const RESEND_SIGN_UP = 'RESEND_SIGN_UP';

export const RESEND_SIGN_UP_MUTATION = gql`
  mutation RESEND_SIGN_UP($username: String) {
    resendSignUp(username: $username) @client
  }
`;

type ResendSignUpVariables = {
  username?: string;
};

type ResendSignUpData = {
  resendSignUp?: any;
};

export class ResendSignUpMutation extends Mutation<
  ResendSignUpData,
  ResendSignUpVariables
> {
  static defaultProps = {
    mutation: RESEND_SIGN_UP_MUTATION,
  };
}
