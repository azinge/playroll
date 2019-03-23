import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Playroll, PlayrollInput, PlayrollFragments } from '../../types';

export const CREATE_PLAYROLL = 'CREATE_PLAYROLL';

export const CREATE_PLAYROLL_MUTATION = gql`
  mutation CREATE_PLAYROLL($input: PlayrollInput!) {
    private {
      createCurrentUserPlayroll(input: $input) {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type CreatePlayrollVariables = {
  input?: PlayrollInput;
};

type CreatePlayrollData = {
  private: {
    createCurrentUserPlayroll: Playroll;
  };
};

export class CreatePlayrollMutation extends Mutation<
  CreatePlayrollData,
  CreatePlayrollVariables
> {
  static defaultProps = {
    mutation: CREATE_PLAYROLL_MUTATION,
  };
}
