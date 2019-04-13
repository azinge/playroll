/**
 * PlayrollList
 */

import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import PlayrollCard from '../../Cards/PlayrollCard';
import { Playroll } from '../../../../graphql/types';

export interface Props {
  playrolls: Playroll[];
  onPress?: (playroll) => void;
}

interface State {}

export default class PlayrollList extends React.Component<Props, State> {
  render() {
    const { playrolls, onPress } = this.props;
    return (
      <FlatList
        data={playrolls}
        showsVerticalScrollIndicator={false}
        keyExtractor={playroll => `${playroll.id}`}
        extraData={this.state}
        renderItem={({ item }) => (
          <PlayrollCard playroll={item} onPress={onPress} />
        )}
      />
    );
  }
}
