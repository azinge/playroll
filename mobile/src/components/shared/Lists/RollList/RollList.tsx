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
    console.log('ROLL LIST > renderItem > roll:');
    console.log(roll);
    const mainSource =
      (roll.data && roll.data.sources && roll.data.sources[0]) || {};
    console.log('ROLL LIST > renderItem > mainSource:');
    console.log(mainSource);
    const filters = (roll.data && roll.data.filters) || []; // [] is required for TS to recognize 'filters' as an array
    console.log('ROLL LIST > renderItem > filters:');
    console.log(filters);
    console.log(Array.isArray(filters));

    // TODO: this mapping is broken
    // TODO: undo router dev hacks before submitting PR
    let stuff = '';
    let key = 0;
    const filterViews = filters.map(filter => {
      console.log(filter);
      console.log('FILTER TYPE: ' + filter.type);
      console.log('KEY: ' + key);
      switch (filter.type) {
        case 'Order':
          console.log('ORDER');
          console.log(filter);
          return (
            <View style={styles.itemTextView} key={key}>
              <Icon
                size={25}
                name='sort'
                type='material'
                color='lightgrey'
                iconStyle={styles.editIcon}
              />
              <Text style={[styles.text, styles.artistName]} numberOfLines={2}>
                {filter.name}
              </Text>
            </View>
          );
          break;
        case 'Length':
          return (
            <View style={styles.itemTextView} key={key}>
              <Icon
                size={25}
                name='av-timer'
                type='material'
                color='lightgrey'
                iconStyle={styles.editIcon}
              />
              <Text style={[styles.text, styles.artistName]} numberOfLines={2}>
                {filter.name}
              </Text>
            </View>
          );
          break;
        default:
      }
      key += 1;

      stuff += '*';
    });
    return (
      // Removing TouchableOpacity because the Edit Icon is enough
      // <TouchableOpacity onPress={() => this.props.onPress(roll)} key={roll.id}>
      <View style={styles.outerContainer} key={roll.id}>
        <View style={styles.innerContainer}>
          <Image style={styles.cover} source={{ uri: mainSource.cover }} />
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.itemTextView}>
              <Icon
                size={25}
                name='music-note'
                type='material'
                color='lightgrey'
                iconStyle={styles.editIcon}
              />
              <Text style={[styles.text, styles.artistName]} numberOfLines={2}>
                {mainSource.name}
              </Text>
            </View>

            <View style={styles.itemTextView}>
              <Icon
                size={25}
                name='filter-list'
                type='material'
                color='lightgrey'
                iconStyle={styles.editIcon}
              />
              <Text style={[styles.text, styles.source]} numberOfLines={2}>
                {mainSource.provider}
              </Text>
            </View>

            {/* <Text>TEST--{stuff}--TEST</Text> */}

            {filterViews}

            {/* TODO: sort icon */}
            {/* TODO: av-timer icon */}

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
            // tslint:disable-next-line:no-shadowed-variable
            onPress={() => NavigationService.navigate('EditRoll', { roll })}
            iconStyle={styles.editIcon}
          />
        </View>
        <View style={styles.spacing} />
      </View>
      // </TouchableOpacity>
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
