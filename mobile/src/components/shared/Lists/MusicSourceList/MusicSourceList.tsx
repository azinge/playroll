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
  onPress?: (musicSource: MusicSource) => void;
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
      <TouchableOpacity onPress={() => this.props.onPress(source)}>
        <View style={styles.outerContainer} key={source.providerID}>
          <View style={styles.innerContainer}>
            <Image style={styles.cover} source={{ uri: source.cover }} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              {/* <Text style={[styles.text, styles.rollType]} numberOfLines={2}>
                {source.type}
              </Text> */}
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
            {/* <Icon
            size={25}
            name='edit'
            color='lightgrey'
            // onPress={roll => {
            //   NavigationService.navigate('EditRoll', {
            //     roll,
            //   });
            // }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            iconStyle={styles.editIcon}
          /> */}
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
