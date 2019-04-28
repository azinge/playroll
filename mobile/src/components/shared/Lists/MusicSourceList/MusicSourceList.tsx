/**
 * MusicSourceList
 */

import * as React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { MusicSource } from '../../../../graphql/types';

import styles from './MusicSourceList.styles';
import NavigationService from '../../../../services/NavigationService';
import { Icon } from 'react-native-elements';
import MusicSourceCard from '../../Cards/MusicSourceCard';

export interface Props {
  sources: MusicSource[];
  onPress?: (musicSource: MusicSource) => void;
}

interface State {}

export default class MusicSourceList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ item: source }: { item: MusicSource }) {
    return <MusicSourceCard source={source} onPress={this.props.onPress} />;
  }

  render() {
    return (
      <FlatList
        data={this.props.sources}
        showsVerticalScrollIndicator={false}
        keyExtractor={source => `${source.providerID}`}
        extraData={this.state}
        renderItem={this.renderItem}
      />
    );
  }
}
