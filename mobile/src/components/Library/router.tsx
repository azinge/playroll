import { createStackNavigator } from 'react-navigation';

import EditPlayrollScreen from './EditPlayrollScreen';
import EditRollScreen from './EditRollScreen';
import ViewTracklistScreen from './ViewTracklistScreen';
import BrowseRecommendationsScreen from './BrowseRecommendationsScreen';
import ViewDiscoveryQueueScreen from './ViewDiscoveryQueueScreen';
import ViewPlayrollScreen from './ViewPlayrollScreen';
import BrowsePlayrollsScreen from './BrowsePlayrollsScreen';
import LibraryMenuScreen from './LibraryMenuScreen';
import { MusicServicePlaylistsRoutes } from '../MusicServices/Playlists/router';

export const LibraryNavigator = createStackNavigator(
  {
    LibraryMenu: LibraryMenuScreen,
    EditPlayroll: EditPlayrollScreen,
    ViewDiscoveryQueue: ViewDiscoveryQueueScreen,
    ViewPlayroll: ViewPlayrollScreen,
    BrowsePlayrolls: BrowsePlayrollsScreen,
    BrowseRecommendations: BrowseRecommendationsScreen,
    ViewTracklist: ViewTracklistScreen,
    ...MusicServicePlaylistsRoutes,
  },
  {
    initialRouteName: 'MusicServicePlaylistsMenu',
    headerMode: 'none',
  }
);

export const LibraryModalRoutes = {
  EditRoll: EditRollScreen,
};
