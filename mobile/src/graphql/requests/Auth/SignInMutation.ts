import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN($username: String, $password: String) {
    signIn(username: $username, password: $password) @client
  }
`;

type SignInVariables = {
  username?: string;
  password?: string;
};

type SignInData = {
  signIn?: boolean;
};

export class SignInMutation extends Mutation<SignInData, SignInVariables> {}
