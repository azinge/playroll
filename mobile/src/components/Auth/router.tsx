import React from "react";
import { createStackNavigator } from "react-navigation";

import SignUpScreen from "./SignUpScreen";
import LoginScreen from "./LoginScreen";
import LandingScreen from "./LandingScreen";

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
