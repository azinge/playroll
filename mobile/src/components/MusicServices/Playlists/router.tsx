import { createStackNavigator } from 'react-navigation';

import MusicServicePlaylistsMenuScreen from './MusicServicePlaylistsMenuScreen';
import BrowseAppleMusicPlaylistsScreen from './BrowseAppleMusicPlaylistsScreen';
import BrowseSpotifyPlaylistsScreen from './BrowseSpotifyPlaylistsScreen';
import BrowseTidalPlaylistsScreen from './BrowseTidalPlaylistsScreen';
import ViewSpotifyPlaylistScreen from './ViewSpotifyPlaylistScreen';
import BrowseSpotifySavedTracksScreen from './BrowseSpotifySavedTracksScreen';

export const MusicServicePlaylistsRoutes = {
  MusicServicePlaylistsMenu: MusicServicePlaylistsMenuScreen,
  BrowseAppleMusicPlaylists: BrowseAppleMusicPlaylistsScreen,
  BrowseSpotifyPlaylists: BrowseSpotifyPlaylistsScreen,
  BrowseTidalPlaylists: BrowseTidalPlaylistsScreen,
  ViewSpotifyPlaylist: ViewSpotifyPlaylistScreen,
  BrowseSpotifySavedTracks: BrowseSpotifySavedTracksScreen,
};
