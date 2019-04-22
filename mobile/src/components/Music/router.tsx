import { createStackNavigator } from 'react-navigation';

import DefaultMusicScreen from './DefaultMusicScreen';
import BrowseAppleMusicPlaylistsScreen from './BrowseAppleMusicPlaylistsScreen';
import BrowseSpotifyPlaylistsScreen from './BrowseSpotifyPlaylistsScreen';
import BrowseYouTubePlaylistsScreen from './BrowseYouTubePlaylistsScreen';
import ViewSpotifyPlaylistScreen from './ViewSpotifyPlaylistScreen';
import BrowseSpotifySavedTracksScreen from './BrowseSpotifySavedTracksScreen';

export const MusicNavigator = createStackNavigator(
  {
    DefaultMusic: DefaultMusicScreen,
    BrowseAppleMusicPlaylists: BrowseAppleMusicPlaylistsScreen,
    BrowseSpotifyPlaylists: BrowseSpotifyPlaylistsScreen,
    BrowseSpotifySavedTracks: BrowseSpotifySavedTracksScreen,
    BrowseYouTubePlaylists: BrowseYouTubePlaylistsScreen,
    ViewSpotifyPlaylist: ViewSpotifyPlaylistScreen,
  },
  {
    initialRouteName: 'BrowseSpotifyPlaylists',
    headerMode: 'none',
  }
);
