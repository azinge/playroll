import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { Icon } from "react-native-elements";

import Home from "../../components/Home";
import Playrolls from "../../components/Playrolls";
import Search from "../../components/Search";
import AlertModal from "../../components/shared/AlertModal";
import Create from "../../components/Create";

export const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home, // TODO: change back to Home
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={35} color={tintColor} />
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
          name="language-go"
          size={35}
          color={tintColor}
        />
      ),
    },
  },
  User: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "User",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          type="material-community"
          name="karate"
          size={35}
          color={tintColor}
        />
      ),
    },
  },
  Search: {
    screen: Search,
  },
  Create: {
    screen: Create,
  },
});