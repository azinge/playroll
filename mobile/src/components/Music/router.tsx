import { createStackNavigator } from 'react-navigation';

import MusicMenuScreen from './MusicMenuScreen';
import BrowseAppleMusicPlaylistsScreen from './BrowseAppleMusicPlaylistsScreen';
import BrowseSpotifyPlaylistsScreen from './BrowseSpotifyPlaylistsScreen';
import BrowseTidalPlaylistsScreen from './BrowseTidalPlaylistsScreen';
import ViewSpotifyPlaylistScreen from './ViewSpotifyPlaylistScreen';
import BrowseSpotifySavedTracksScreen from './BrowseSpotifySavedTracksScreen';

export const MusicNavigator = createStackNavigator(
  {
    MusicMenu: MusicMenuScreen,
    BrowseAppleMusicPlaylists: BrowseAppleMusicPlaylistsScreen,
    BrowseSpotifyPlaylists: BrowseSpotifyPlaylistsScreen,
    BrowseSpotifySavedTracks: BrowseSpotifySavedTracksScreen,
    BrowseTidalPlaylists: BrowseTidalPlaylistsScreen,
    ViewSpotifyPlaylist: ViewSpotifyPlaylistScreen,
  },
  {
    initialRouteName: 'MusicMenu',
    headerMode: 'none',
  }
);
