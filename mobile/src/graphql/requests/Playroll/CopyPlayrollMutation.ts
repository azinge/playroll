import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Playroll, PlayrollFragments } from '../../types';

export const COPY_PLAYROLL = 'COPY_PLAYROLL';

export const COPY_PLAYROLL_MUTATION = gql`
  mutation COPY_PLAYROLL($playrollID: ID) {
    private {
      copyPlayroll(playrollID: $playrollID) {
        ...DefaultPlayroll
      }
    }
  }
  ${PlayrollFragments.default}
`;

type CopyPlayrollVariables = {
  playrollID?: number;
};

type CopyPlayrollData = {
  private: {
    copyPlayroll: Playroll;
  };
};

export class CopyPlayrollMutation extends Mutation<
  CopyPlayrollData,
  CopyPlayrollVariables
> {
  static defaultProps = {
    mutation: COPY_PLAYROLL_MUTATION,
  };
}
