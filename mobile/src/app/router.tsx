import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from "react-navigation";
import { Icon } from "react-native-elements";

import Home from "../components/Home";
import Playrolls from "../components/Playrolls";
import Search from "../components/Search";
import Tracklist from "../components/Tracklist";
import SignUpScreen from "../components/SignUpScreen";
import LoginScreen from "../components/LoginScreen";
import LandingScreen from "../components/LandingScreen";

export const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        title: `Login`,
        header: null,
      }),
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: () => ({
        title: `SignUp`,
        header: null,
      }),
    },
    Landing: {
      screen: LandingScreen,
      navigationOptions: () => ({
        title: `Landing`,
        header: null,
      }),
    },
  },
  {
    initialRouteName: "Landing",
    headerMode: "screen",
  }
);

export const AppNavigator = createBottomTabNavigator({
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
});

export const AppContainer = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    App: AppNavigator,
  },
  {
    // initialRouteName: "Auth",
    initialRouteName: "App", // for debug
  }
);
