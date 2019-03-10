import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Roll, RollInput, RollFragments } from '../../types';

export const CREATE_ROLL = 'CREATE_ROLL';

export const CREATE_ROLL_MUTATION = gql`
  mutation CREATE_ROLL($input: RollInput!) {
    admin {
      createRoll(input: $input) {
        ...DefaultRoll
      }
    }
  }
  ${RollFragments.default}
`;

type CreateRollVariables = {
  input?: RollInput;
};

type CreateRollData = {
  admin: {
    createRoll?: Roll;
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
