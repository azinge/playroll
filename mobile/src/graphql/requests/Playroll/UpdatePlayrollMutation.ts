import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { PlayrollInput } from '../../types';

export const UPDATE_PLAYROLL = 'UPDATE_PLAYROLL';

export const UPDATE_PLAYROLL_MUTATION = gql`
  mutation ${UPDATE_PLAYROLL}($id: ID!, $input: PlayrollInput!) {
    updatePlayroll(id: $id, input: $input) {
      id
    }
  }
`;

type UpdatePlayrollVariables = {
  id?: number;
  input?: PlayrollInput;
};

type UpdatePlayrollData = {
  updatePlayroll?: { id: number };
};

export class UpdatePlayrollMutation extends Mutation<
  UpdatePlayrollData,
  UpdatePlayrollVariables
> {
  static defaultProps = {
    mutation: UPDATE_PLAYROLL_MUTATION,
  };
}
