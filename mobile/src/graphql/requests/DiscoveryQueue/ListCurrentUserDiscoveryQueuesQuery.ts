import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { DiscoveryQueue, DiscoveryQueueFragments } from '../../types';

export const LIST_CURRENT_USER_DISCOVERY_QUEUES =
  'LIST_CURRENT_USER_DISCOVERY_QUEUES';

export const LIST_CURRENT_USER_DISCOVERY_QUEUES_QUERY = gql`
  query LIST_CURRENT_USER_DISCOVERY_QUEUES {
    private {
      listCurrentUserDiscoveryQueues {
        ...DefaultDiscoveryQueue
      }
    }
  }
  ${DiscoveryQueueFragments.default}
`;

type ListCurrentUserDiscoveryQueuesVariables = {};

type ListCurrentUserDiscoveryQueuesData = {
  private: {
    listCurrentUserDiscoveryQueues?: DiscoveryQueue;
  };
};

export class ListCurrentUserDiscoveryQueuesQuery extends Query<
  ListCurrentUserDiscoveryQueuesData,
  ListCurrentUserDiscoveryQueuesVariables
> {
  static defaultProps = {
    query: LIST_CURRENT_USER_DISCOVERY_QUEUES_QUERY,
  };
}
