import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Roll, RollInput, RollFragments } from '../../types';

export const UPDATE_ROLL = 'UPDATE_ROLL';

export const UPDATE_ROLL_MUTATION = gql`
  mutation UPDATE_ROLL($id: ID, $input: RollInput!) {
    private {
      updateCurrentUserRoll(id: $id, input: $input) {
        ...DefaultRoll
      }
    }
  }
  ${RollFragments.default}
`;

type UpdateRollVariables = {
  id?: number;
  input?: RollInput;
};

type UpdateRollData = {
  private: {
    updateCurrentUserRoll?: Roll;
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
