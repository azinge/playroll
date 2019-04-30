import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Playroll, PlayrollFragments } from '../../types';

export const DELETE_ROLL = 'DELETE_ROLL';

export const DELETE_ROLL_MUTATION = gql`
  mutation DELETE_ROLL($id: ID!) {
    private {
      deleteCurrentUserRoll(id: $id) {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type DeleteRollVariables = {
  id?: number;
};

type DeleteRollData = {
  private: {
    deleteCurrentUserRoll?: Playroll;
  };
};

export class DeleteRollMutation extends Mutation<
  DeleteRollData,
  DeleteRollVariables
> {
  static defaultProps = {
    mutation: DELETE_ROLL_MUTATION,
  };
}
