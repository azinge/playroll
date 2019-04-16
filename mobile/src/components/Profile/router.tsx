import { createStackNavigator } from 'react-navigation';

import EditProfileScreen from './EditProfileScreen';
import ViewProfileScreen from './ViewProfileScreen';
import ViewCurrentUserProfileScreen from './ViewCurrentUserProfileScreen';

export const ProfileRoutes = {
  EditProfile: EditProfileScreen,
  ViewProfile: ViewProfileScreen,
  ViewCurrentUserProfile: ViewCurrentUserProfileScreen,
};

export const ProfileModalRoutes = {};
