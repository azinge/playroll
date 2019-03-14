import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import ManageRollScreen from './ManageRollScreen';
import YourLibraryScreen from './YourLibraryScreen';

const SearchNavigator = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        title: 'Search',
        header: null,
      },
    },
    ManageRoll: {
      screen: ManageRollScreen,
      navigationOptions: () => ({
        title: `ManageRoll`,
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'Search',
    navigationOptions: () => ({
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor = '' }) => (
        <Icon
          type='material-community'
          name='spotify'
          size={35}
          // color={tintColor}
        />
      ),
    }),
  }
);

export const HomeNavigator = createBottomTabNavigator(
  {
    //   Bug where if home is default on first router then it will be default on this router too
    HomeView: {
      screen: HomeScreen,
      navigationOptions: {
        title: `Home`,
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor = '' }) => (
          <Icon
            type='material-community'
            name='home'
            size={35}
            color={tintColor}
          />
        ),
      },
    },

    Search: {
      screen: SearchNavigator,
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor = '' }) => (
          <Icon
            type='material-community'
            name='spotify'
            size={35}
            color={tintColor}
          />
        ),
      },
    },

    YourLibrary: {
      screen: YourLibraryScreen,
      navigationOptions: {
        title: `Library`,
        tabBarLabel: 'Your Library',
        tabBarIcon: ({ tintColor = '' }) => (
          <Icon
            type='material-community'
            name='library-music'
            size={35}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Search',
  }
);
