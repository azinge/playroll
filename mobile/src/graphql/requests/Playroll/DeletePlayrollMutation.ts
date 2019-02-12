import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export const DELETE_PLAYROLL = "DELETE_PLAYROLL";

export const DELETE_PLAYROLL_MUTATION = gql`
  mutation ${DELETE_PLAYROLL}($id: ID!) {
    deletePlayroll(id: $id) {
      id
    }
  }
`;

type DeletePlayrollVariables = {
  id?: number;
};

type DeletePlayrollData = {
  deletePlayroll?: { id: number };
};

export class DeletePlayrollMutation extends Mutation<
  DeletePlayrollData,
  DeletePlayrollVariables
> {
  static defaultProps = {
    mutation: DELETE_PLAYROLL_MUTATION,
  };
}
