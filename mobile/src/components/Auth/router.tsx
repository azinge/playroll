import React from 'react';
import { createStackNavigator } from 'react-navigation';

import SignUpScreen from './SignUpScreen';
import ConfirmationScreen from './ConfirmationScreen';
import LandingScreen from './LandingScreen';

export const AuthNavigator = createStackNavigator(
  {
    SignUp: SignUpScreen,
    Confirmation: ConfirmationScreen,
    Landing: LandingScreen,
  },
  {
    initialRouteName: 'Landing',
    headerMode: 'none',
  }
);
