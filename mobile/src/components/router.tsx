import { createAppContainer, createStackNavigator } from 'react-navigation';

import { AuthNavigator } from './Auth/router';
import { MainNavigator } from './Main/router';
import { CoreNavigator } from './Core/router';

const AppNavigator = createStackNavigator(
  {
    Auth: AuthNavigator, // Sign up screens
    Core: CoreNavigator, // Loading screen
    Main: MainNavigator, // Home screen
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
  }
);

export const AppContainer = createAppContainer(AppNavigator);
