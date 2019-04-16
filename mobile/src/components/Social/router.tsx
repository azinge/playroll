import { createStackNavigator } from 'react-navigation';

import BrowseRecommendationsScreen from './BrowseRecommendationsScreen';
import SocialMenuScreen from './SocialMenuScreen';

export const SocialNavigator = createStackNavigator(
  {
    BrowseRecommendations: BrowseRecommendationsScreen,
    SocialMenu: SocialMenuScreen,
  },
  {
    initialRouteName: 'SocialMenu',
    headerMode: 'none',
  }
);
