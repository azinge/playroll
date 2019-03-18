import { createStackNavigator } from 'react-navigation';

import AccountScreen from './AccountScreen';
import AddFriendScreen from './AddFriendScreen';
import EditProfileScreen from './EditProfileScreen';
import SettingsScreen from './SettingsScreen';
import ViewFriendsScreen from './ViewFriendsScreen';
import ViewProfileScreen from './ViewProfileScreen';
import { MusicServiceSettingsRoutes } from '../MusicServices/Settings/router';

export const ProfileRoutes = {
  AddFriend: AddFriendScreen,
  EditProfile: EditProfileScreen,
  Settings: SettingsScreen,
  ViewFriends: ViewFriendsScreen,
  ViewProfile: ViewProfileScreen,
  ...MusicServiceSettingsRoutes,
};

export const ProfileModalRoutes = {
  Account: AccountScreen,
};
