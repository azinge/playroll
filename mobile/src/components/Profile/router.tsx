import { createStackNavigator } from 'react-navigation';

import EditProfileScreen from './EditProfileScreen';
import ViewProfileScreen from './ViewProfileScreen';
import ViewCurrentUserProfileScreen from './ViewCurrentUserProfileScreen';
import AddFriendScreen from './AddFriendScreen';
import BrowseFriendsScreen from './BrowseFriendsScreen';

export const ProfileRoutes = {
  AddFriend: AddFriendScreen,
  BrowseFriends: BrowseFriendsScreen,
  EditProfile: EditProfileScreen,
  ViewProfile: ViewProfileScreen,
  ViewCurrentUserProfile: ViewCurrentUserProfileScreen,
};

export const ProfileModalRoutes = {};
