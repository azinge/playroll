/**
 * DiscoveryQueueEntryCard
 */

import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import styles from './DiscoveryQueueEntryCard.styles';
import { DiscoveryQueueEntry } from '../../../../graphql/types';
import { Icon } from 'react-native-elements';
import NavigationService from '../../../../services/NavigationService';

export interface Props {
  entry: DiscoveryQueueEntry;
  onPress?: (entry: DiscoveryQueueEntry) => void;
}

interface State {}

export default class DiscoveryQueueEntryCard extends React.Component<
  Props,
  State
> {
  render() {
    const { entry } = this.props;
    const mainSource =
      (entry.data && entry.data.sources && entry.data.sources[0]) || {};
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress(entry)}
        key={entry.id}
      >
        <View style={{ width: '100%', alignItems: 'center' }} key={entry.id}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <Image style={styles.cover} source={{ uri: mainSource.cover }} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.artist} numberOfLines={2}>
                {mainSource.name}
              </Text>
              <Text style={styles.noArtist} numberOfLines={2}>
                {mainSource.creator}
              </Text>
            </View>
            <Icon
              size={35}
              name='more-vert'
              color='lightgrey'
              onPress={() => NavigationService.goBack()}
            />
          </View>
          <View style={styles.spacing} />
        </View>
      </TouchableOpacity>
    );
  }
}
