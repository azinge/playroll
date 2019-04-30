/**
 * RollCard
 */

import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import styles from './RollCard.styles';
import { Icon } from 'react-native-elements';
import { DeleteRollMutation } from '../../../../graphql/requests/Roll';
import { GET_CURRENT_USER_PLAYROLL } from '../../../../graphql/requests/Playroll/GetCurrentUserPlayrollQuery';
import Swipeout from 'react-native-swipeout';
import NavigationService from '../../../../services/NavigationService';
import { Roll } from '../../../../graphql/types';

export interface Props {
  roll: Roll;
  readOnly?: boolean;
  disableManage?: boolean;
  onDragEnd?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
}

interface State {}

const rollFilterNameToLabel = {
  Union: 'Union',
  Intersection: 'Intersection',
  'N/A': 'Not Selected',
  ExcludeSources: 'Exclude Sources',
  IncludeSources: 'Include Sources',
  Default: 'Default',
  Popularity: 'By Popularity',
  Random: 'Random',
  NumberOfSongs: 'Number Of Songs',
};

export default class RollCard extends React.Component<Props, State> {
  render() {
    const roll = this.props.roll;
    const mainSource =
      (roll.data && roll.data.sources && roll.data.sources[0]) || {};

    const filters = (roll.data && roll.data.filters) || []; // [] is required for TS to recognize 'filters' as an array

    // console.log('MAIN SOURCE');
    // console.log(mainSource);

    // Main Source is the first row in the informational part of each Roll in the RollList
    let mainSourceIcon;
    switch (mainSource.type) {
      case 'Artist':
        mainSourceIcon = 'mic';
        break;
      case 'Album':
        mainSourceIcon = 'album';
        break;
      case 'Track':
        mainSourceIcon = 'audiotrack';
        break;
      case 'Playlist':
        mainSourceIcon = 'playlist-play';
        break;
      default:
        mainSourceIcon = 'music-note';
    }

    const mainSourceView = (
      <View style={styles.itemTextView}>
        <Icon
          size={25}
          name={mainSourceIcon}
          type='material'
          color='purple'
          iconStyle={styles.rowIcon}
        />
        <View>
          <Text style={[styles.text, styles.artistName]} numberOfLines={1}>
            {mainSource.name}
          </Text>
          {mainSource.creator !== '' && (
            <Text
              style={[
                styles.text,
                {
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: 'gray',
                },
              ]}
              numberOfLines={1}
            >
              {mainSource.creator}
            </Text>
          )}
        </View>
      </View>
    );

    // console.log('SOURCES');
    // console.log(roll.data.sources);

    // Loop through all filters and generate icon/text per Roll in the RollList
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
                  {rollFilterNameToLabel[filter.name]}
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
          // console.log('FILTER NAME: ' + filter.name);
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
      // Does not refetch after multiple deletions
      <DeleteRollMutation>
        {deleteRoll => {
          return (
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: 'lightgrey',
                //   marginTop: 5,
              }}
            >
              <Swipeout
                right={[
                  {
                    text: 'Delete',
                    backgroundColor: 'red',
                    onPress: () => deleteRoll({ variables: { id: roll.id } }),
                  },
                ]}
                backgroundColor={'transparent'}
                autoClose={true}
                disabled={this.props.readOnly}
              >
                <TouchableOpacity
                  disabled={this.props.disableManage}
                  onPress={() => {
                    // @ts-ignore
                    delete roll.data.__typename;
                    roll.data.filters.forEach(filter => {
                      // @ts-ignore
                      delete filter.__typename;
                    });
                    NavigationService.navigate('ManageRoll', {
                      rollData: roll.data,
                      currentSource: mainSource,
                    });
                  }}
                >
                  <View style={styles.outerContainer} key={roll.id}>
                    <View style={styles.innerContainer}>
                      {!this.props.readOnly && (
                        <TouchableOpacity
                          onPressIn={this.props.onPressIn}
                          onPressOut={this.props.onPressOut}
                        >
                          <Icon
                            size={25}
                            name='menu'
                            color='lightgrey'
                            iconStyle={{ marginLeft: 20 }}
                          />
                        </TouchableOpacity>
                      )}
                      <Image
                        style={styles.cover}
                        source={{ uri: mainSource.cover }}
                      />
                      <View style={styles.rowsView}>
                        {/* Main source icon/text row */}
                        {mainSourceView}
                        {/* Filter info per row, see loop above */}
                        {filterViews}
                      </View>
                      {/* Right side menu icons */}
                      {!this.props.readOnly && (
                        <Icon
                          size={25}
                          name='edit'
                          color='lightgrey'
                          onPress={() =>
                            NavigationService.navigate('EditRoll', { roll })
                          }
                          iconStyle={styles.editIcon}
                        />
                      )}
                    </View>
                    <View style={styles.spacing} />
                  </View>
                </TouchableOpacity>
              </Swipeout>
            </View>
          );
        }}
      </DeleteRollMutation>
    );
  }
}
