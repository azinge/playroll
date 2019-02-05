import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { PlayrollInput } from "../../types";

export const CREATE_PLAYROLL = "CREATE_PLAYROLL";

export const CREATE_PLAYROLL_MUTATION = gql`
  mutation ${CREATE_PLAYROLL}($input: PlayrollInput!) {
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
> {
  static defaultProps = {
    mutation: CREATE_PLAYROLL_MUTATION,
  };
}
