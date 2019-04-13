import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const SIGN_OUT = 'SIGN_OUT';

export const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT {
    signOut @client
  }
`;

type SignOutVariables = {};

type SignOutData = {
  signOut?: any;
};

export class SignOutMutation extends Mutation<SignOutData, SignOutVariables> {
  static defaultProps = {
    mutation: SIGN_OUT_MUTATION,
  };
}
