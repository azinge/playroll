/**
 * RollList
 */

import * as React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Roll } from '../../../../graphql/types';

import styles from './RollList.styles';
import NavigationService from '../../../../services/NavigationService';
import { Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { DeleteRollMutation } from '../../../../graphql/requests/Roll';
import { GET_CURRENT_USER_PLAYROLL } from '../../../../graphql/requests/Playroll/GetCurrentUserPlayrollQuery';

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

    const filters = (roll.data && roll.data.filters) || []; // [] is required for TS to recognize 'filters' as an array

    // console.log('MAIN SOURCE');
    // console.log(mainSource);

    // console.log('SOURCES');
    // console.log(roll.data.sources);

    // Loop through all filters and generate icon/text per row
    // TODO: this mapping should be done functionally, not with a for loop
    let filterViews = [];
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      const mods = filter.modifications;
      const firstMod = roll.data.sources[mods[0]];

      // console.log('FILTER:');
      // console.log(filter);

      let key = i;
      switch (filter.type) {
        case 'Filter':
          let subIcon;
          switch (filter.name) {
            case 'ExcludeSources':
              subIcon = 'block';
              break;
            case 'IncludeSources':
              subIcon = 'add-circle-outline';
              break;
            default:
          }
          filterViews.push(
            <View style={styles.itemTextView} key={key}>
              <Icon
                size={25}
                name='filter-list'
                type='material'
                color='purple'
                iconStyle={styles.rowIcon}
              />
              {subIcon && (
                <Icon
                  size={15}
                  name={subIcon}
                  type='material'
                  iconStyle={
                    filter.name === 'ExcludeSources'
                      ? styles.subIconExclude
                      : styles.subIconInclude
                  }
                />
              )}
              <Text
                style={[styles.text, styles.artistName]}
                numberOfLines={1}
                ellipsizeMode='tail' // TODO: this does not work at the moment
              >
                {firstMod.name}
              </Text>
            </View>
          );
          break;

        case 'Order':
          if (filter.name !== 'Default') {
            filterViews.push(
              <View style={styles.itemTextView} key={key}>
                <Icon
                  size={25}
                  name='sort'
                  type='material'
                  color='purple'
                  iconStyle={styles.rowIcon}
                />
                <Text style={[styles.text, styles.artistName]}>
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
              const numSongs = parseInt(mods[1], 10);
              text = numSongs === 1 ? '1 Song' : numSongs + ' Songs';
              break;
            default:
          }
          console.log('FILTER NAME: ' + filter.name);
          if (filter.name !== 'Default') {
            filterViews.push(
              <View style={styles.itemTextView} key={key}>
                <Icon
                  size={25}
                  name='av-timer'
                  type='material'
                  color='purple'
                  iconStyle={styles.rowIcon}
                />
                <Text
                  style={[styles.text, styles.artistName]}
                  numberOfLines={2}
                >
                  {text}
                </Text>
              </View>
            );
          }
          break;
        default:
      }
    }

    return (
      // Removing TouchableOpacity because the Edit Icon is enough
      // <TouchableOpacity onPress={() => this.props.onPress(roll)} key={roll.id}>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: 'lightgrey',
          //   marginTop: 5,
        }}
      >
        <DeleteRollMutation
          variables={{
            id: roll.id,
          }}
          refetchQueries={() => [GET_CURRENT_USER_PLAYROLL]} // Anon function required for subsequent delete calls
        >
          {(deleteRoll, { loading, error }) => {
            return (
              <Swipeout
                right={[
                  {
                    text: 'Delete',
                    backgroundColor: 'red',
                    onPress: () => deleteRoll(),
                  },
                ]}
                backgroundColor={'transparent'}
                autoClose={true}
              >
                <View style={styles.outerContainer} key={roll.id}>
                  <View style={styles.innerContainer}>
                    <Image
                      style={styles.cover}
                      source={{ uri: mainSource.cover }}
                    />
                    <View style={styles.rowsView}>
                      {/* Main source icon/text row */}
                      <View style={styles.itemTextView}>
                        <Icon
                          size={25}
                          name='music-note'
                          type='material'
                          color='purple'
                          iconStyle={styles.rowIcon}
                        />
                        <Text style={[styles.text, styles.artistName]}>
                          {mainSource.name}
                        </Text>
                      </View>
                      {/* Filter info per row, see loop above */}
                      {filterViews}
                    </View>
                    {/* Right side menu icons */}
                    <Icon
                      size={25}
                      name='edit'
                      color='lightgrey'
                      onPress={() =>
                        NavigationService.navigate('EditRoll', { roll })
                      }
                      iconStyle={styles.editIcon}
                    />
                  </View>
                  <View style={styles.spacing} />
                </View>
              </Swipeout>
            );
          }}
        </DeleteRollMutation>
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
