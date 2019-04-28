import { createStackNavigator } from 'react-navigation';

import EditProfileScreen from './EditProfileScreen';
import ViewProfileScreen from './ViewProfileScreen';
import ViewCurrentUserProfileScreen from './ViewCurrentUserProfileScreen';
import AddFriendScreen from './AddFriendScreen';
import BrowseFriendsScreen from './BrowseFriendsScreen';
import RecommendToFriendScreen from './RecommendToFriendScreen';
import BrowseFriendRequestsScreen from './BrowseFriendRequestsScreen';
import BrowseUserPlayrollsScreen from './BrowseUserPlayrollsScreen';

export const ProfileRoutes = {
  AddFriend: AddFriendScreen,
  BrowseFriends: BrowseFriendsScreen,
  BrowseFriendRequests: BrowseFriendRequestsScreen,
  BrowseUserPlayrolls: BrowseUserPlayrollsScreen,
  EditProfile: EditProfileScreen,
  ViewProfile: ViewProfileScreen,
  ViewCurrentUserProfile: ViewCurrentUserProfileScreen,
};

export const ProfileModalRoutes = {
  RecommendToFriend: RecommendToFriendScreen,
};
