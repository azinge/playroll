/**
 * HorizontalMusicSourceList
 */

import * as React from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { MusicSource } from '../../../../graphql/types';

import styles from './HorizontalMusicSourceList.styles';

export interface Props {
  title: string;
  musicSources: MusicSource[];
}

interface State {}

export default class HorizontalMusicSourceList extends React.Component<
  Props,
  State
> {
  render() {
    return (
      <View style={{ flex: 1, height: 220 }}>
        <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={this.props.musicSources.map((ms, i) => ({
            ...ms,
            key: `${i}`,
          }))}
          renderItem={({ item }) => (
            <View style={{ width: 125, marginHorizontal: 10 }}>
              <Image style={styles.image} source={{ uri: item.cover }} />
              <Text style={styles.sourceTitle} numberOfLines={2}>
                {item.name}
              </Text>
              {item.creator && (
                <Text style={styles.sourceCreator} numberOfLines={1}>
                  {item.creator}
                </Text>
              )}
            </View>
          )}
        />
      </View>
    );
  }
}
