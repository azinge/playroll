import { createStackNavigator } from 'react-navigation';

import EditPlayrollScreen from './EditPlayrollScreen';
import EditRollScreen from './EditRollScreen';
import ViewTracklistScreen from './ViewTracklistScreen';
import ViewPlayrollScreen from './ViewPlayrollScreen';
import BrowsePlayrollsScreen from './BrowsePlayrollsScreen';
import GenerateTracklistScreen from './GenerateTracklistScreen';
import AddToPlayrollScreen from './AddToPlayrollScreen';
import AddRollScreen from './AddRollScreen';
import ViewExternalPlayrollScreen from './ViewExternalPlayrollScreen';

export const PlayrollsNavigator = createStackNavigator(
  {
    AddRoll: AddRollScreen,
    EditPlayroll: EditPlayrollScreen,
    ViewPlayroll: ViewPlayrollScreen,
    BrowsePlayrolls: BrowsePlayrollsScreen,
    ViewTracklist: ViewTracklistScreen,
  },
  {
    initialRouteName: 'BrowsePlayrolls', // Switch this to any route above for faster reload in dev
    headerMode: 'none',
  }
);

export const PlayrollsModalRoutes = {
  ViewExternalPlayroll: ViewExternalPlayrollScreen,
  AddToPlayroll: AddToPlayrollScreen,
  EditRoll: EditRollScreen,
  GenerateTracklist: GenerateTracklistScreen,
};
