import { createStackNavigator } from 'react-navigation';

import AccountScreen from './AccountScreen';
import AddFriendScreen from './AddFriendScreen';
import EditProfileScreen from './EditProfileScreen';
import SettingsScreen from './SettingsScreen';
import FriendsMenuScreen from './FriendsMenuScreen';
import ViewProfileScreen from './ViewProfileScreen';
import { MusicServiceSettingsRoutes } from '../MusicServices/Settings/router';

export const ProfileRoutes = {
  AddFriend: AddFriendScreen,
  EditProfile: EditProfileScreen,
  Settings: SettingsScreen,
  FriendsMenu: FriendsMenuScreen,
  ViewProfile: ViewProfileScreen,
  ...MusicServiceSettingsRoutes,
};

export const ProfileModalRoutes = {
  Account: AccountScreen,
};
