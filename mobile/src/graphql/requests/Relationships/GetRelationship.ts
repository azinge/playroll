import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Relationship, RelationshipFragments } from '../../types';

export const GET_RELATIONSHIP = 'GET_RELATIONSHIP';

export const GET_RELATIONSHIP_QUERY = gql`
  query GET_RELATIONSHIP($id: ID) {
    private {
      relationship(id: $id) {
        ...DefaultRelationship
      }
    }
  }
  ${RelationshipFragments.default}
`;

type GetRelationshipVariables = {
  id?: number;
};

type GetRelationshipData = {
  relationship: Relationship;
};

export class GetRelationshipQuery extends Query<
  GetRelationshipData,
  GetRelationshipVariables
> {
  static defaultProps = {
    query: GET_RELATIONSHIP_QUERY,
  };
}
