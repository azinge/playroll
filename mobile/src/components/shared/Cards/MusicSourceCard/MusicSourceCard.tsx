/**
 * MusicSourceCard
 */

import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import styles from './MusicSourceCard.styles';
import { MusicSource } from '../../../../graphql/types';

export interface Props {
  source: MusicSource;
  onPress?: (musicSource: MusicSource) => void;
}

interface State {}

export default class MusicSourceCard extends React.Component<Props, State> {
  render() {
    const { source = {} } = this.props;
    return (
      <TouchableOpacity onPress={() => this.props.onPress(source)}>
        <View style={styles.outerContainer} key={source.providerID}>
          <View style={styles.innerContainer}>
            <Image style={styles.cover} source={{ uri: source.cover }} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={[styles.text, styles.name]} numberOfLines={2}>
                {source.name}
              </Text>
              <Text style={[styles.text, styles.source]} numberOfLines={2}>
                {source.provider}
              </Text>
              {source.creator ? (
                <Text style={styles.artist} numberOfLines={2}>
                  {source.creator}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={styles.spacing} />
        </View>
      </TouchableOpacity>
    );
  }
}
