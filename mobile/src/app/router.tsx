import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { Icon } from "react-native-elements";

import Home from "../components/Home";
import Playrolls from "../components/Playrolls";
import Search from "../components/Search";
import AlertModal from "../components/shared/AlertModal";
import Create from "../components/Create";
import TracklistStyles from "components/Tracklist/Tracklist.styles";
import Tracklist from "../components/Tracklist";
import LoginScreen from "../components/LoginScreen";
import SignUpScreen from "../components/SignUpScreen";

export const Navigator = createBottomTabNavigator({
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
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      tabBarLabel: "User",
      tabBarIcon: ({ tintColor }) => (
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
  Tracklist: {
    screen: Tracklist,
    navigationOptions: {
      tabBarLabel: "Tracklist",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          type="material-community"
          name="animation"
          size={35}
          color={tintColor}
        />
      ),
    },
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      tabBarLabel: "Sign Up",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          type="material-community"
          name="clipboard-account"
          size={35}
          color={tintColor}
        />
      ),
    },
  },
});
