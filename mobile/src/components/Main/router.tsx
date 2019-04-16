import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import HomeScreen from './HomeScreen';
import DiscoverScreen from './DiscoverScreen';
import { PlayrollsNavigator, PlayrollsModalRoutes } from '../Playrolls/router';
import { ProfileRoutes, ProfileModalRoutes } from '../Profile/router';
import {
  SearchRoutes,
  SearchModalRoutes,
  //   SearchNavigator,
} from '../Search/router';
import { SettingsModalRoutes, SettingsRoutes } from '../Settings/router';

// Add Avenir to all screens (for Android)
import { Font } from 'expo';
import { MusicNavigator } from '../Music/router';
import { SocialNavigator } from '../Social/router';
import AccountScreen from './AccountScreen';
Font.loadAsync({
  Avenir: require('../../assets/fonts/AvenirLTStd-Black.otf'),
});

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

    Social: {
      screen: SocialNavigator,
      navigationOptions: {
        title: `Social`,
        tabBarLabel: 'Social',
        tabBarIcon: ({ tintColor = '' }) => (
          <Icon type='material' name='chat' size={35} color={tintColor} />
        ),
      },
    },

    Playrolls: {
      screen: PlayrollsNavigator,
      navigationOptions: {
        title: `Playrolls`,
        tabBarLabel: 'Playrolls',
        tabBarIcon: ({ tintColor = '' }) => (
          <Icon
            type='material'
            name='playlist-add'
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

    Music: {
      screen: MusicNavigator,
      navigationOptions: {
        title: `Music`,
        tabBarLabel: 'Music',
        tabBarIcon: ({ tintColor = '' }) => (
          <Icon
            type='material-community'
            name='music'
            size={35}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home', // Switch this to any route above for faster reload in dev
    tabBarOptions: {
      activeTintColor: 'purple',
    },
  }
);

export const MainRoutes = {
  Account: AccountScreen,
};

export const MainWithoutModalsNavigator = createStackNavigator(
  {
    MainTabs: MainTabsNavigator,
    ...MainRoutes,
    ...SettingsRoutes,
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
    ...PlayrollsModalRoutes,
    ...SearchModalRoutes,
    ...ProfileModalRoutes,
    ...SettingsModalRoutes,
  },
  {
    initialRouteName: 'MainWithoutModals',
    mode: 'modal',
    headerMode: 'none',
    // transparentCard: true,
  }
);
