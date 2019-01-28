import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from "react-navigation";
import { Icon } from "react-native-elements";

import Home from "./Home";
import Search from "./Search";
import Playrolls from "../Playrolls_/Playrolls";

export const MainNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home, // TODO: change back to Home
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="home"
            size={35}
            color={tintColor}
          />
        ),
      },
    },
    Playrolls: {
      screen: Playrolls,
      navigationOptions: {
        tabBarLabel: "Playrolls",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="playlist-play"
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
        tabBarIcon: ({ tintColor }) => (
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
