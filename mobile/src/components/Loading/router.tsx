import { createStackNavigator } from 'react-navigation';

import LoadingScreen from './LoadingScreen';

export const LoadingNavigator = createStackNavigator(
  {
    Loading: {
      screen: LoadingScreen,
      navigationOptions: () => ({
        title: 'Loading',
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'screen',
  }
);
