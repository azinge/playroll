import { createAppContainer, createStackNavigator } from 'react-navigation';

import { AuthNavigator } from './Auth/router';
import { MainNavigator } from './Main/router';
import { CoreNavigator } from './Core/router';

const AppNavigator = createStackNavigator(
  {
    Auth: AuthNavigator,
    Core: CoreNavigator,
    Main: MainNavigator,
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
  }
);

export const AppContainer = createAppContainer(AppNavigator);
