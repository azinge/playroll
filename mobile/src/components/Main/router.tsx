import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import HomeScreen from './HomeScreen';
import DiscoverScreen from './DiscoverScreen';
import { LibraryNavigator, LibraryModalRoutes } from '../Library/router';
import { ProfileRoutes, ProfileModalRoutes } from '../Profile/router';
import { SearchRoutes, SearchModalRoutes } from '../Search/router';
import { MusicServiceSettingsModalRoutes } from '../MusicServices/Settings/router';

export const MainTabsNavigator = createBottomTabNavigator(
  {
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
    Library: {
      screen: LibraryNavigator,
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
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: 'purple',
    },
  }
);

export const MainWithoutModalsNavigator = createStackNavigator(
  {
    MainTabs: MainTabsNavigator,
    ...ProfileRoutes,
    ...SearchRoutes,
  },
  {
    initialRouteName: 'MainTabs',
    headerMode: 'none',
  }
);

export const MainNavigator = createStackNavigator(
  {
    MainWithoutModals: MainWithoutModalsNavigator,
    ...LibraryModalRoutes,
    ...SearchModalRoutes,
    ...ProfileModalRoutes,
    ...MusicServiceSettingsModalRoutes,
  },
  {
    initialRouteName: 'EditRoll',
    // initialRouteName: 'MainWithoutModals',
    mode: 'modal',
    headerMode: 'none',
  }
);
