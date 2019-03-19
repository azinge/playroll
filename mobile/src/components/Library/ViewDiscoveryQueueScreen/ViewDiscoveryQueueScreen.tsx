/**
 * ViewDiscoveryQueueScreen
 */

import * as React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import { ListCurrentUserDiscoveryQueuesQuery } from '../../../graphql/requests/DiscoveryQueue/ListCurrentUserDiscoveryQueuesQuery';
import DiscoveryQueueEntryCard from '../../shared/Cards/DiscoveryQueueEntryCard';

export default class ViewDiscoveryQueueScreen extends React.Component {
  render() {
    const extractDiscoveryQueue = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0 ||
        data.private.listCurrentUserDiscoveryQueues.length === 0
      ) {
        return {};
      }
      return data.private.listCurrentUserDiscoveryQueues[0];
    };
    return (
      <ListCurrentUserDiscoveryQueuesQuery>
        {({ loading, error, data }) => {
          const discoveryQueue = extractDiscoveryQueue(data);
          return (
            <SubScreenContainer
              title={'My Discovery Queue'}
              flatList={!loading && !error}
              contentContainerStyle={{ marginTop: 10 }}
              data={discoveryQueue.entries || []}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return (
                  <DiscoveryQueueEntryCard entry={item} onPress={() => {}} />
                );
              }}
            >
              {loading && (
                <ActivityIndicator color={'gray'} style={{ paddingTop: 50 }} />
              )}
              {error && (
                <Text style={{ paddingTop: 50 }}>
                  Error Loading Discovery Queue
                </Text>
              )}
            </SubScreenContainer>
          );
        }}
      </ListCurrentUserDiscoveryQueuesQuery>
    );
  }
}
