import { createStackNavigator } from 'react-navigation';

import ManagePlayrollScreen from './ManagePlayrollScreen';
import ViewPlayrollScreen from './ViewPlayrollScreen';
import TracklistScreen from './TracklistScreen';

export const PlayrollsNavigator = createStackNavigator(
  {
    ManagePlayroll: {
      screen: ManagePlayrollScreen,
      navigationOptions: () => ({
        title: 'ManagePlayroll',
        header: null,
      }),
    },
    ViewPlayroll: {
      screen: ViewPlayrollScreen,
      navigationOptions: () => ({
        title: 'ViewPlayroll',
        header: null,
      }),
    },
    Tracklist: {
      screen: TracklistScreen,
      navigationOptions: () => ({
        title: 'Tracklist',
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'ManagePlayroll',
    headerMode: 'screen',
  }
);
