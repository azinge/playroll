/**
 * MusicSourceList
 */

import * as React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { MusicSource } from '../../../../graphql/types';

import styles from './MusicSourceList.styles';
import NavigationService from '../../../../services/NavigationService';
import { Icon } from 'react-native-elements';

export interface Props {
  sources: MusicSource[];
  // onPress?: (roll: Roll) => void;  // removing, edit icon is enough
}

interface State {}

export default class MusicSourceList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ item: source }: { item: MusicSource }) {
    // console.log(mainSource)
    return (
      <TouchableOpacity>
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
