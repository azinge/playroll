import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export const SIGN_UP = "SIGN_UP";

export const SIGN_UP_MUTATION = gql`
  mutation ${SIGN_UP}($username: String, $password: String, $email: String) {
    signUp(username: $username, password: $password, email: $email) @client
  }
`;

type SignUpVariables = {
  username?: string;
  password?: string;
  email?: string;
};

type SignUpData = {
  signUp?: boolean;
};

export class SignUpMutation extends Mutation<SignUpData, SignUpVariables> {
  static defaultProps = {
    mutation: SIGN_UP_MUTATION,
  };
}
