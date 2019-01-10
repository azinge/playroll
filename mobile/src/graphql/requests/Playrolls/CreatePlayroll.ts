import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export interface PlayrollInput {
  name: string;
  userID: number;
}

export const CREATE_PLAYROLL_MUTATION = gql`
  mutation CREATE_PLAYROLL($input: PlayrollInput!) {
    createPlayroll(input: $input) {
      id
    }
  }
`;

type CreatePlayrollVariables = {
  input?: PlayrollInput;
};

type CreatePlayrollData = {
  createPlayroll?: { id: number };
};

export class CreatePlayrollMutation extends Mutation<
  CreatePlayrollData,
  CreatePlayrollVariables
> {}
