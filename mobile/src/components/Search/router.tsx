import { createStackNavigator } from 'react-navigation';

import SearchScreen from './SearchScreen';
import ManageRollScreen from './ManageRollScreen';

export const SearchNavigator = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      title: 'Search',
      header: null,
    },
  },
  ManageRoll: {
    screen: ManageRollScreen,
    navigationOptions: () => ({
      title: `ManageRoll`,
      header: null,
    }),
  },
});
