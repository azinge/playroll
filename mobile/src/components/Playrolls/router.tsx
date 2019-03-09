import React from 'react';

import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ManagePlayrollScreen from './ManagePlayrollScreen';
import ViewPlayrollScreen from './ViewPlayrollScreen';
import TracklistScreen from './TracklistScreen';
import BrowsePlayrollsScreen from './BrowsePlayrollsScreen';

export const PlayrollsNavigator = createStackNavigator(
  {
    BrowsePlayrolls: {
      screen: BrowsePlayrollsScreen,
      navigationOptions: () => ({
        title: `BrowsePlayrolls`,
        header: null,
      }),
    },
    ManagePlayroll: {
      screen: ManagePlayrollScreen,
      navigationOptions: () => ({
        title: 'ManagePlayroll',
        header: null,
      }),
    },
    ViewPlayroll: {
      screen: ViewPlayrollScreen,
      navigationOptions: () => ({
        title: 'ViewPlayroll',
        header: null,
      }),
    },
    Tracklist: {
      screen: TracklistScreen,
      navigationOptions: () => ({
        title: 'Tracklist',
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'BrowsePlayrolls',
    headerMode: 'screen',
  }
);
