import { createStackNavigator } from 'react-navigation';

import SearchScreen from './SearchScreen';
import ManageRollScreen from './ManageRollScreen';

export const SearchRoutes = {
  Search: SearchScreen,
};

export const SearchModalRoutes = {
  SearchMusicSource: SearchScreen,
  ManageRoll: ManageRollScreen,
};
