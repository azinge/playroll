import { createStackNavigator } from 'react-navigation';

import BrowseRecommendationsScreen from './BrowseRecommendationsScreen';
import DefaultSocialScreen from './DefaultSocialScreen';

export const SocialNavigator = createStackNavigator(
  {
    BrowseRecommendations: BrowseRecommendationsScreen,
    DefaultSocial: DefaultSocialScreen,
  },
  {
    initialRouteName: 'DefaultSocial',
    headerMode: 'none',
  }
);
