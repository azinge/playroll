/**
 * HorizontalMusicSourceList
 */

import * as React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
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
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.props.musicSources.map((val, idx) => {
            return (
              <View style={{ width: 125, marginHorizontal: 10 }} key={idx}>
                <Image style={styles.image} source={{ uri: val.cover }} />
                <Text style={styles.sourceTitle} numberOfLines={2}>
                  {val.name}
                </Text>
                {val.creator && (
                  <Text style={styles.sourceCreator} numberOfLines={1}>
                    {val.creator}
                  </Text>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
