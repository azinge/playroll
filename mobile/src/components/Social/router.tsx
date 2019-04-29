import { createStackNavigator } from 'react-navigation';

import BrowseRecommendationsScreen from './BrowseRecommendationsScreen';
import DefaultSocialScreen from './DefaultSocialScreen';
import { ProfileRoutes } from '../Profile/router';
import BrowseFriendsPlayrollsScreen from './BrowseFriendsPlayrollsScreen';
import BrowseSentRecommendationsScreen from './BrowseSentRecommendationsScreen';
import BrowseExchangedRecommendationsScreen from './BrowseExchangedRecommendationsScreen';

export const SocialNavigator = createStackNavigator(
  {
    BrowseRecommendations: BrowseRecommendationsScreen,
    BrowseSentRecommendations: BrowseSentRecommendationsScreen,
    BrowseExchangedRecommendations: BrowseExchangedRecommendationsScreen,
    BrowseFriendsPlayrolls: BrowseFriendsPlayrollsScreen,
    DefaultSocial: DefaultSocialScreen,
    ...ProfileRoutes,
  },
  {
    initialRouteName: 'DefaultSocial',
    headerMode: 'none',
  }
);
