import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import HomeScreen from './HomeScreen';
import YourLibraryScreen from './YourLibraryScreen';
import DiscoverScreen from './DiscoverScreen';

export const MainNavigator = createBottomTabNavigator(
  {
    //   Bug where if home is default on first router then it will be default on this router too
    Home: {
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

    Discover: {
      screen: DiscoverScreen,
      navigationOptions: {
        tabBarLabel: 'Discover',
        tabBarIcon: ({ tintColor = '' }) => (
          <Icon
            type='material-community'
            name='compass'
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
            name='folder'
            size={35}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Discover',
    tabBarOptions: {
      activeTintColor: 'purple',
    },
  }
);
