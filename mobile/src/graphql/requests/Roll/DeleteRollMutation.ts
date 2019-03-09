import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Roll, RollFragments } from '../../types';

export const DELETE_ROLL = 'DELETE_ROLL';

export const DELETE_ROLL_MUTATION = gql`
  mutation DELETE_ROLL($id: ID!) {
    deleteRoll(id: $id) {
      ...DefaultRoll
    }
  }
  ${RollFragments.default}
`;

type DeleteRollVariables = {
  id?: number;
};

type DeleteRollData = {
  deleteRoll?: Roll;
};

export class DeleteRollMutation extends Mutation<
  DeleteRollData,
  DeleteRollVariables
> {
  static defaultProps = {
    mutation: DELETE_ROLL_MUTATION,
  };
}
