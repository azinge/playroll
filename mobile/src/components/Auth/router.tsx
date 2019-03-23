import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SignUpScreen from './SignUpScreen';
import ConfirmationScreen from './ConfirmationScreen';
import SignInScreen from './SignInScreen';
import LandingScreen from './LandingScreen';

export const AuthNavigator = createStackNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: () => ({
        title: `SignIn`,
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
    Confirmation: {
      screen: ConfirmationScreen,
      navigationOptions: () => ({
        title: `Confirmation`,
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
    initialRouteName: 'Landing',
    headerMode: 'screen',
  }
);
