import { createStackNavigator } from 'react-navigation';

import BrowseRecommendationsScreen from './BrowseRecommendationsScreen';
import DefaultSocialScreen from './DefaultSocialScreen';
import { ProfileRoutes } from '../Profile/router';

export const SocialNavigator = createStackNavigator(
  {
    BrowseRecommendations: BrowseRecommendationsScreen,
    DefaultSocial: DefaultSocialScreen,
    ...ProfileRoutes,
  },
  {
    initialRouteName: 'DefaultSocial',
    headerMode: 'none',
  }
);
