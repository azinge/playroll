import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SignUpScreen from './SignUpScreen';
import ConfirmationScreen from './ConfirmationScreen';
import LandingScreen from './LandingScreen';

export const AuthNavigator = createStackNavigator(
  {
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
