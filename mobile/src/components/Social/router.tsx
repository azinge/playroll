import { createStackNavigator } from 'react-navigation';

import BrowseRecommendationsScreen from './BrowseRecommendationsScreen';
import DefaultSocialScreen from './DefaultSocialScreen';
import { ProfileRoutes } from '../Profile/router';
import BrowseFriendsPlayrollsScreen from './BrowseFriendsPlayrollsScreen';

export const SocialNavigator = createStackNavigator(
  {
    BrowseRecommendations: BrowseRecommendationsScreen,
    BrowseFriendsPlayrolls: BrowseFriendsPlayrollsScreen,
    DefaultSocial: DefaultSocialScreen,
    ...ProfileRoutes,
  },
  {
    initialRouteName: 'DefaultSocial',
    headerMode: 'none',
  }
);
