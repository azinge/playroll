import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { RollInput } from '../../types';

export const CREATE_ROLL = 'CREATE_ROLL';

export const CREATE_ROLL_MUTATION = gql`
  mutation ${CREATE_ROLL}($input: RollInput!) {
    createRoll(input: $input) {
      id
    }
  }
`;

type CreateRollVariables = {
  input?: RollInput;
};

type CreateRollData = {
  createRoll?: { id: number };
};

export class CreateRollMutation extends Mutation<
  CreateRollData,
  CreateRollVariables
> {
  static defaultProps = {
    mutation: CREATE_ROLL_MUTATION,
  };
}
