import { createStackNavigator } from 'react-navigation';

import BrowseRecommendationsScreen from './BrowseRecommendationsScreen';
import SocialMainScreen from './SocialMainScreen';

export const SocialNavigator = createStackNavigator(
  {
    BrowseRecommendations: BrowseRecommendationsScreen,
    SocialMain: SocialMainScreen,
  },
  {
    initialRouteName: 'BrowseRecommendations',
    headerMode: 'none',
  }
);
