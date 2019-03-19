import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { DiscoveryQueue, DiscoveryQueueFragments } from '../../types';

export const GET_CURRENT_USER_DISCOVERY_QUEUE =
  'GET_CURRENT_USER_DISCOVERY_QUEUE';

export const GET_CURRENT_USER_DISCOVERY_QUEUE_QUERY = gql`
  query GET_CURRENT_USER_DISCOVERY_QUEUE {
    private {
      currentUserDiscoveryQueue {
        ...DefaultDiscoveryQueue
      }
    }
  }
  ${DiscoveryQueueFragments.default}
`;

type GetCurrentUserDiscoveryQueueVariables = {};

type GetCurrentUserDiscoveryQueueData = {
  private: {
    currentUserDiscoveryQueue?: DiscoveryQueue;
  };
};

export class GetCurrentUserDiscoveryQueueQuery extends Query<
  GetCurrentUserDiscoveryQueueData,
  GetCurrentUserDiscoveryQueueVariables
> {
  static defaultProps = {
    query: GET_CURRENT_USER_DISCOVERY_QUEUE_QUERY,
  };
}
