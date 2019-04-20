import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Relationship, RelationshipFragments } from '../../types';

export const UNFRIEND_USER = 'UNFRIEND_USER';

export const UNFRIEND_USER_MUTATION = gql`
  mutation UNFRIEND_USER($userID: ID!) {
    private {
      unfriendUser(userID: $userID) {
        ...DefaultRelationship
      }
    }
  }
  ${RelationshipFragments.default}
`;

type UnfriendUserVariables = {
  userID?: number;
};

type UnfriendUserData = {
  private: {
    unfriendUser: Relationship;
  };
};

export class UnfriendUserMutation extends Mutation<
  UnfriendUserData,
  UnfriendUserVariables
> {
  static defaultProps = {
    mutation: UNFRIEND_USER_MUTATION,
  };
}
