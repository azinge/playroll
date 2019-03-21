/**
 * RollList
 */

import * as React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Roll } from '../../../../graphql/types';

import styles from './RollList.styles';
import NavigationService from '../../../../services/NavigationService';
import { Icon } from 'react-native-elements';

import RollCard from '../../../shared/Cards/RollCard';

export interface Props {
<<<<<<< HEAD
  rolls: Rollsdfdas[];
=======
  rolls: Roll[];
  onPress?: (roll: Roll) => void;
>>>>>>> origin/master
}

interface State {}

export default class RollList extends React.Component<Props, State> {
<<<<<<< HEAD
=======
  constructor(props: Props) {
    super(props);
    this.onRollPress = this.onRollPress.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  onRollPress(roll) {
    this.props.onPress(roll);
  }

  renderItem({ item: roll }: { item: Roll }) {
    const mainSource =
      (roll.data && roll.data.sources && roll.data.sources[0]) || {};
    return (
      <TouchableOpacity
        onPress={this.onRollPress.bind(this, roll)}
        key={roll.id}
      >
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
              onPress={() => NavigationService.goBack()}
            />
          </View>
          <View style={styles.spacing} />
        </View>
      </TouchableOpacity>
    );
  }

>>>>>>> origin/master
  render() {
    return (
      <FlatList
        data={this.props.rolls}
        showsVerticalScrollIndicator={false}
        keyExtractor={roll => `${roll.id}`}
        extraData={this.state}
        renderItem={({ item }) => {
          return <RollCard roll={item} />;
        }}
      />
    );
  }
}
