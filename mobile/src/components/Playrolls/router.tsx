import React from "react";
import { createStackNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import { HeaderBackButton } from "react-navigation";

import ManagePlayrollScreen from "./ManagePlayrollScreen";
import TracklistScreen from "./TracklistScreen";

export const PlayrollsNavigator = createStackNavigator(
  {
    ManagePlayroll: {
      screen: ManagePlayrollScreen,
      navigationOptions: () => ({
        title: `ManagePlayroll`,
        header: null,
      }),
    },
    Tracklist: {
      screen: TracklistScreen,
      navigationOptions: () => ({
        title: `Tracklist`,
        header: null,
      }),
    },
  },
  {
    initialRouteName: "ManagePlayroll",
    headerMode: "screen",
  }
);
