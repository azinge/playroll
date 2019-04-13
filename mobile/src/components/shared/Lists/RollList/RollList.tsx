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

    // TODO: undo router dev hacks before submitting PR

    // TODO: this mapping should be done functionally, not with a for loop
    let filterViews = [];
    for (let i = 0; i < filters.length; i++) {
      console.log('==== i: ' + i);
      const filter = filters[i];
      console.log(filter);

      console.log('FILTER');
      console.log(filter);

      const mods = filter.modifications;
      console.log('MODS');
      console.log(mods);

      const numMods = mods.length;
      console.log('NUM MODS' + numMods);

      const firstMod = roll.data.sources[mods[0]];
      console.log('FIRST MOD:');
      console.log(firstMod);

      let key = i;
      switch (filter.type) {
        case 'Filter':
          let subIcon;
          switch (filter.name) {
            case 'ExcludeSources':
              subIcon = 'block';
            default:
          }
          filterViews.push(
            <View style={styles.itemTextView} key={key}>
              <Icon
                size={25}
                name='filter-list'
                type='material'
                color='lightgrey'
                iconStyle={styles.rowIcon}
              />
              {subIcon && (
                <Icon
                  size={15}
                  name={subIcon}
                  type='material'
                  color='lightgrey'
                  iconStyle={styles.subIcon}
                />
              )}
              <Text style={[styles.text, styles.artistName]} numberOfLines={2}>
                {firstMod.name}
              </Text>
            </View>
          );
          break;
        case 'Order':
          console.log('ORDER');
          console.log(filter);
          if (filter.name !== 'Default') {
            filterViews.push(
              <View style={styles.itemTextView} key={key}>
                <Icon
                  size={25}
                  name='sort'
                  type='material'
                  color='lightgrey'
                  iconStyle={styles.rowIcon}
                />
                <Text
                  style={[styles.text, styles.artistName]}
                  numberOfLines={2}
                >
                  {filter.name}
                </Text>
              </View>
            );
          }
          break;
        case 'Length':
          let text = '';
          switch (filter.name) {
            case 'NumberOfSongs':
              text = numMods === 1 ? '1 Song' : numMods + ' Songs';
              break;
            default:
          }

          filterViews.push(
            <View style={styles.itemTextView} key={key}>
              <Icon
                size={25}
                name='av-timer'
                type='material'
                color='lightgrey'
                iconStyle={styles.rowIcon}
              />
              <Text style={[styles.text, styles.artistName]} numberOfLines={2}>
                {text}
              </Text>
            </View>
          );
          break;
        default:
      }
    }

    return (
      // Removing TouchableOpacity because the Edit Icon is enough
      // <TouchableOpacity onPress={() => this.props.onPress(roll)} key={roll.id}>
      <View style={styles.outerContainer} key={roll.id}>
        <View style={styles.innerContainer}>
          <Image style={styles.cover} source={{ uri: mainSource.cover }} />
          <View style={styles.rowsView}>
            <View style={styles.itemTextView}>
              <Icon
                size={25}
                name='music-note'
                type='material'
                color='lightgrey'
                iconStyle={styles.rowIcon}
              />
              <Text style={[styles.text, styles.artistName]} numberOfLines={2}>
                {mainSource.name}
              </Text>
            </View>

            {filterViews}
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
