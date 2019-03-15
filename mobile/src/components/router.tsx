import { createAppContainer, createStackNavigator } from 'react-navigation';

import { AuthNavigator } from './Auth/router';
import { MainNavigator } from './Main/router';
import { LibraryNavigator } from './Library/router';
import { CoreNavigator } from './Core/router';
import { ProfileNavigator } from './Profile/router';
import { SearchNavigator } from './Search/router';

const AppNavigator = createStackNavigator(
  {
    Auth: AuthNavigator,
    Core: CoreNavigator,
    Main: MainNavigator,
    Library: LibraryNavigator,
    Profile: ProfileNavigator,
    Search: SearchNavigator,
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
  }
);

export const AppContainer = createAppContainer(AppNavigator);
