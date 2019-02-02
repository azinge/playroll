import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from "react-navigation";
import { Icon } from "react-native-elements";

import { AuthNavigator } from "./Auth/router";
import { MainNavigator } from "./Main/router";
import { PlayrollsNavigator } from "./Playrolls/router";
import { LoadingNavigator } from "./Loading/router";

export const AppContainer = createStackNavigator(
  {
    Auth: AuthNavigator,
    Loading: LoadingNavigator,
    Main: MainNavigator,
    Playrolls: PlayrollsNavigator,
  },
  {
    initialRouteName: "Main",
    headerMode: "screen",
    navigationOptions: {
      header: null,
    },
  }
);