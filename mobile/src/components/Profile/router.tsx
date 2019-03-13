import { createStackNavigator } from 'react-navigation';

import ManageProfileScreen from './ManageProfileScreen';
import BrowseFriendsScreen from './BrowseFriendsScreen';
import BrowseRecommendationsScreen from './BrowseRecommendationsScreen';
import AddFriendScreen from './AddFriendScreen';
import ConnectSpotifyScreen from './ConnectSpotifyScreen';
import ManageDiscoveryQueueScreen from './ManageDiscoveryQueueScreen';
import ViewProfileScreen from './ViewProfileScreen';

export const ProfileNavigator = createStackNavigator(
  {
    AddFriend: {
      screen: AddFriendScreen,
      navigationOptions: () => ({
        title: `AddFriend`,
        header: null,
      }),
    },

    BrowseFriends: {
      screen: BrowseFriendsScreen,
      navigationOptions: () => ({
        title: `BrowseFriends`,
        header: null,
      }),
    },
    BrowseRecommendations: {
      screen: BrowseRecommendationsScreen,
      navigationOptions: () => ({
        title: `BrowseRecommendations`,
        header: null,
      }),
    },
    ConnectSpotify: {
      screen: ConnectSpotifyScreen,
      navigationOptions: () => ({
        title: `ConnectSpotify`,
        header: null,
      }),
    },
    ManageDiscoveryQueue: {
      screen: ManageDiscoveryQueueScreen,
      navigationOptions: () => ({
        title: `ManageDiscoveryQueue`,
        header: null,
      }),
    },
    ManageProfile: {
      screen: ManageProfileScreen,
      navigationOptions: () => ({
        title: `ManageProfile`,
        header: null,
      }),
    },
    ViewProfile: {
      screen: ViewProfileScreen,
      navigationOptions: () => ({
        title: `ViewProfile`,
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'AddFriend',
    headerMode: 'screen',
  }
);
