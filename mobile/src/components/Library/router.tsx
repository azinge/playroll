import { createStackNavigator } from 'react-navigation';

import EditPlayrollScreen from './EditPlayrollScreen';
import AddRollScreen from './AddRollScreen';
import EditRollScreen from './EditRollScreen';
import ViewTracklistScreen from './ViewTracklistScreen';
import BrowseRecommendationsScreen from './BrowseRecommendationsScreen';
import ViewDiscoveryQueueScreen from './ViewDiscoveryQueueScreen';
import ViewPlayrollScreen from './ViewPlayrollScreen';
import BrowsePlayrollsScreen from './BrowsePlayrollsScreen';
import LibraryMenuScreen from './LibraryMenuScreen';
import { MusicServicePlaylistsRoutes } from '../MusicServices/Playlists/router';
import GenerateTracklistScreen from './GenerateTracklistScreen';
import AddToPlayrollScreen from './AddToPlayrollScreen';

export const LibraryNavigator = createStackNavigator(
  {
    AddRoll: AddRollScreen,
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
    initialRouteName: 'LibraryMenu', // Switch this to any route above for faster reload in dev
    headerMode: 'none',
  }
);

export const LibraryModalRoutes = {
  AddToPlayroll: AddToPlayrollScreen,
  EditRoll: EditRollScreen,
  GenerateTracklist: GenerateTracklistScreen,
};
