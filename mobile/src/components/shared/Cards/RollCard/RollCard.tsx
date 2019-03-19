/**
 * RollCard
 */

import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import NavigationService from '../../../../services/NavigationService';

import { Roll } from '../../../../graphql/types';

import styles from './RollCard.styles';

export interface Props {
  roll: Roll;
}

interface State {}

export default class RollCard extends React.Component<Props, State> {
  render() {
    const roll = this.props.roll;

    const mainSource =
      (roll.data && roll.data.sources && roll.data.sources[0]) || {};

    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <Image style={styles.cover} source={{ uri: mainSource.cover }} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.artist} numberOfLines={2}>
                {mainSource.name}
              </Text>
              {mainSource.creator ? (
                <Text style={styles.noArtist} numberOfLines={2}>
                  {mainSource.creator}
                </Text>
              ) : null}
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
