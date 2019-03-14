import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Playroll, PlayrollInput, PlayrollFragments } from '../../types';

export const UPDATE_PLAYROLL = 'UPDATE_PLAYROLL';

export const UPDATE_PLAYROLL_MUTATION = gql`
  mutation UPDATE_PLAYROLL($id: ID!, $input: PlayrollInput!) {
    private {
      updateCurrentUserPlayroll(id: $id, input: $input) {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type UpdatePlayrollVariables = {
  id?: number;
  input?: PlayrollInput;
};

type UpdatePlayrollData = {
  private: {
    updateCurrentUserPlayroll?: Playroll;
  };
};

export class UpdatePlayrollMutation extends Mutation<
  UpdatePlayrollData,
  UpdatePlayrollVariables
> {
  static defaultProps = {
    mutation: UPDATE_PLAYROLL_MUTATION,
  };
}
