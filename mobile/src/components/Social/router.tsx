import { createStackNavigator } from 'react-navigation';

import AddFriendScreen from './AddFriendScreen';
import BrowseRecommendationsScreen from './BrowseRecommendationsScreen';
import BrowseFriendsScreen from './BrowseFriendsScreen';
import SocialMenuScreen from './SocialMenuScreen';

export const SocialNavigator = createStackNavigator(
  {
    AddFriend: AddFriendScreen,
    BrowseRecommendations: BrowseRecommendationsScreen,
    BrowseFriends: BrowseFriendsScreen,
    SocialMenu: SocialMenuScreen,
  },
  {
    initialRouteName: 'SocialMenu',
    headerMode: 'none',
  }
);
