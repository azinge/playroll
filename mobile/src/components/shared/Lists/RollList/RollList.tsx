/**
 * RollList
 */

import * as React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Roll } from '../../../../graphql/types';

import styles from './RollList.styles';
import NavigationService from '../../../../services/NavigationService';
import { Icon } from 'react-native-elements';

import RollCard from '../../../shared/Cards/RollCard';

export interface Props {
  rolls: Rollsdfdas[];
}

interface State {}

export default class RollList extends React.Component<Props, State> {
  render() {
    return (
      <FlatList
        data={this.props.rolls}
        showsVerticalScrollIndicator={false}
        keyExtractor={roll => `${roll.id}`}
        extraData={this.state}
        renderItem={({ item }) => {
          return <RollCard roll={item} />;
        }}
      />
    );
  }
}
