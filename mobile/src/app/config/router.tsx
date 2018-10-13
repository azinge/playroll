import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { Icon } from "react-native-elements";

import Home from "../../components/Home";
import Playrolls from "../../components/Playrolls";
import Create from "../../components/Create";
import AlertModal from "../../components/AlertModal"

export const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={35} color={tintColor} />
      )
    }
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
      )
    }
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
      )
    }
  },
  Create: {
    screen: Create
  },
  AlertModal: {
    screen: AlertModal
  }
});
