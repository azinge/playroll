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
  // onPress?: () => void;  // TODO: is this required?
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
    // console.log(mainSource)
    return (
      // Removing TouchableOpacity because the Edit Icon is enough
      // <TouchableOpacity onPress={() => this.props.onPress(roll)} key={roll.id}>
      <View style={styles.outerContainer} key={roll.id}>
        <View style={styles.innerContainer}>
          <Image style={styles.cover} source={{ uri: mainSource.cover }} />
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={[styles.text, styles.rollType]} numberOfLines={2}>
              {mainSource.type}
            </Text>
            <Text style={[styles.text, styles.artistName]} numberOfLines={2}>
              {mainSource.name}
            </Text>
            <Text style={[styles.text, styles.source]} numberOfLines={2}>
              {mainSource.provider}
            </Text>
            {mainSource.creator ? (
              <Text style={styles.noArtist} numberOfLines={2}>
                {mainSource.creator}
              </Text>
            ) : null}
          </View>
          <Icon
            size={25}
            name='edit'
            color='lightgrey'
            onPress={() => NavigationService.navigate('EditRoll', roll)}
            iconStyle={styles.editIcon}
          />
        </View>
        <View style={styles.spacing} />
      </View>
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
