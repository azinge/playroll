import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from "react-navigation";
import { Icon } from "react-native-elements";

import { AuthNavigator } from "./Auth/router";
import { HomeNavigator } from "./Home/router";
import { PlayrollsNavigator } from "./Playrolls/router";
import { LoadingNavigator } from "./Loading/router";
import { ProfileNavigator } from "./Profile/router";

export const AppContainer = createStackNavigator(
  {
    Auth: AuthNavigator,
    Loading: LoadingNavigator,
    Home: HomeNavigator,
    Playrolls: PlayrollsNavigator,
    Profile: ProfileNavigator,
  },
  {
    initialRouteName: "Loading",
    headerMode: "screen",
    navigationOptions: {
      header: null,
    },
  }
);
