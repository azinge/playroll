import { createStackNavigator } from 'react-navigation';

import MusicMainScreen from './MusicMainScreen';
import BrowseAppleMusicPlaylistsScreen from './BrowseAppleMusicPlaylistsScreen';
import BrowseSpotifyPlaylistsScreen from './BrowseSpotifyPlaylistsScreen';
import BrowseYouTubePlaylistsScreen from './BrowseYouTubePlaylistsScreen';
import ViewSpotifyPlaylistScreen from './ViewSpotifyPlaylistScreen';
import BrowseSpotifySavedTracksScreen from './BrowseSpotifySavedTracksScreen';

export const MusicNavigator = createStackNavigator(
  {
    MusicMain: MusicMainScreen,
    BrowseAppleMusicPlaylists: BrowseAppleMusicPlaylistsScreen,
    BrowseSpotifyPlaylists: BrowseSpotifyPlaylistsScreen,
    BrowseSpotifySavedTracks: BrowseSpotifySavedTracksScreen,
    BrowseYouTubePlaylists: BrowseYouTubePlaylistsScreen,
    ViewSpotifyPlaylist: ViewSpotifyPlaylistScreen,
  },
  {
    initialRouteName: 'MusicMain',
    headerMode: 'none',
  }
);
