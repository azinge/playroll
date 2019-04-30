import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Playroll, RollInput, PlayrollFragments } from '../../types';

export const UPDATE_ROLL = 'UPDATE_ROLL';

export const UPDATE_ROLL_MUTATION = gql`
  mutation UPDATE_ROLL($id: ID, $input: RollInput!) {
    private {
      updateCurrentUserRoll(id: $id, input: $input) {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type UpdateRollVariables = {
  id?: number;
  input?: RollInput;
};

type UpdateRollData = {
  private: {
    updateCurrentUserRoll?: Playroll;
  };
};

export class UpdateRollMutation extends Mutation<
  UpdateRollData,
  UpdateRollVariables
> {
  static defaultProps = {
    mutation: UPDATE_ROLL_MUTATION,
  };
}
