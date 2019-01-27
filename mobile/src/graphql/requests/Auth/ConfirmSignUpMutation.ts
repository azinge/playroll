import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export const CONFIRM_SIGN_UP_MUTATION = gql`
  mutation CONFIRM_SIGN_UP($username: String, $code: String) {
    confirmSignUp(username: $username, code: $code) @client
  }
`;

type ConfirmSignUpVariables = {
  username?: string;
  code?: string;
};

type ConfirmSignUpData = {
  confirmSignUp?: boolean;
};

export class ConfirmSignUpMutation extends Mutation<
  ConfirmSignUpData,
  ConfirmSignUpVariables
> {}
