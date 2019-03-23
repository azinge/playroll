/**
 * RollList
 */

import * as React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Roll } from '../../../../graphql/types';

import styles from './RollList.styles';
import NavigationService from '../../../../services/NavigationService';
import { Icon } from 'react-native-elements';

export interface Props {
  rolls: Roll[];
  onPress?: (roll: Roll) => void;
}

interface State {}

export default class RollList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({ item: roll }: { item: Roll }) {
    const mainSource =
      (roll.data && roll.data.sources && roll.data.sources[0]) || {};
    return (
      <TouchableOpacity onPress={() => this.props.onPress(roll)} key={roll.id}>
        <View style={{ width: '100%', alignItems: 'center' }} key={roll.id}>
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
              underlayColor='rgba(255,255,255,0)'
              onPress={() => NavigationService.goBack()}
            />
          </View>
          <View style={styles.spacing} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <FlatList
        data={this.props.rolls}
        showsVerticalScrollIndicator={false}
        keyExtractor={roll => `${roll.id}`}
        extraData={this.state}
        renderItem={this.renderItem}
      />
    );
  }
}
