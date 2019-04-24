/**
 * PlayrollList
 */

import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import PlayrollCard from '../../Cards/PlayrollCard';
import { Playroll } from '../../../../graphql/types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export interface Props {
  playrolls: Playroll[];
  onPress?: (playroll) => void;
  hideCreator?: boolean;
}

interface State {}

export default class PlayrollList extends React.Component<Props, State> {
  render() {
    const { playrolls, onPress, hideCreator } = this.props;
    return (
      <FlatList
        data={playrolls}
        contentContainerStyle={{ flex: 1, paddingBottom: hp('10%') }}
        showsVerticalScrollIndicator={false}
        keyExtractor={playroll => `${playroll.id}`}
        extraData={this.state}
        renderItem={({ item }) => (
          <View>
            <PlayrollCard
              playroll={item}
              onPress={onPress}
              hideCreator={hideCreator}
            />
          </View>
        )}
      />
    );
  }
}
