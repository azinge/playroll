import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Playroll, PlayrollFragments } from '../../types';

export const DELETE_PLAYROLL = 'DELETE_PLAYROLL';

export const DELETE_PLAYROLL_MUTATION = gql`
  mutation DELETE_PLAYROLL($id: ID!) {
    private {
      deleteCurrentUserPlayroll(id: $id) {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type DeletePlayrollVariables = {
  id?: number;
};

type DeletePlayrollData = {
  private: {
    deleteCurrentUserPlayroll: Playroll;
  };
};

export class DeletePlayrollMutation extends Mutation<
  DeletePlayrollData,
  DeletePlayrollVariables
> {
  static defaultProps = {
    mutation: DELETE_PLAYROLL_MUTATION,
  };
}
