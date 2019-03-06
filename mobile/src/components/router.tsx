import { createAppContainer, createStackNavigator } from 'react-navigation';

import { AuthNavigator } from './Auth/router';
import { HomeNavigator } from './Home/router';
import { PlayrollsNavigator } from './Playrolls/router';
import { LoadingNavigator } from './Loading/router';
import { ProfileNavigator } from './Profile/router';

const AppNavigator = createStackNavigator(
  {
    Auth: AuthNavigator,
    Loading: LoadingNavigator,
    Home: HomeNavigator,
    Playrolls: PlayrollsNavigator,
    Profile: ProfileNavigator,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
  }
);

export const AppContainer = createAppContainer(AppNavigator);
