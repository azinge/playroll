import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from "react-navigation";
import { Icon } from "react-native-elements";

import HomeScreen from "./HomeScreen";
import BrowsePlayrollsScreen from "./BrowsePlayrollsScreen";
import Search from "./Search";
import ProfileScreen from "./ProfileScreen";

export const MainNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: `Home`,
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor = "" }) => (
          <Icon
            type="material-community"
            name="home"
            size={35}
            color={tintColor}
          />
        ),
      },
    },
    BrowsePlayrolls: {
      screen: BrowsePlayrollsScreen,
      navigationOptions: {
        title: `BrowsePlayrolls`,
        tabBarLabel: "Playrolls",
        tabBarIcon: ({ tintColor = "" }) => (
          <Icon
            type="material-community"
            name="playlist-play"
            size={35}
            color={tintColor}
          />
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: `Profile`,
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor = "" }) => (
          <Icon
            type="material-community"
            name="account"
            size={35}
            color={tintColor}
          />
        ),
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor = "" }) => (
          <Icon
            type="material-community"
            name="spotify"
            size={35}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    // initialRouteName: "Home",
    initialRouteName: "Home", // for debug
  }
);
