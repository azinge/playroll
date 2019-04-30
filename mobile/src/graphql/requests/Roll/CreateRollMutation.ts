import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Playroll, RollInput, PlayrollFragments } from '../../types';

export const CREATE_ROLL = 'CREATE_ROLL';

export const CREATE_ROLL_MUTATION = gql`
  mutation CREATE_ROLL($input: RollInput!) {
    private {
      createCurrentUserRoll(input: $input) {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type CreateRollVariables = {
  input?: RollInput;
};

type CreateRollData = {
  private: {
    createCurrentUserRoll?: Playroll;
  };
};

export class CreateRollMutation extends Mutation<
  CreateRollData,
  CreateRollVariables
> {
  static defaultProps = {
    mutation: CREATE_ROLL_MUTATION,
  };
}
