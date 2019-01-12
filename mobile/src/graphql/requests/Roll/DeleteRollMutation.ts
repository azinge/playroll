import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export const DELETE_ROLL_MUTATION = gql`
  mutation DELETE_ROLL($id: ID!) {
    deleteRoll(id: $id) {
      id
    }
  }
`;

type DeleteRollVariables = {
  id?: number;
};

type DeleteRollData = {
  deleteRoll?: { id: number };
};

export class DeleteRollMutation extends Mutation<
  DeleteRollData,
  DeleteRollVariables
> {}
