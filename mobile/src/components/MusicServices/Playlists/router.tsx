import { createStackNavigator } from 'react-navigation';

import MusicServicePlaylistsMenuScreen from './MusicServicePlaylistsMenuScreen';
import ViewAppleMusicPlaylistsScreen from './ViewAppleMusicPlaylistsScreen';
import ViewSpotifyPlaylistsScreen from './ViewSpotifyPlaylistsScreen';
import ViewTidalPlaylistsScreen from './ViewTidalPlaylistsScreen';
import ViewPlaylistScreen from './ViewPlaylistScreen';

export const MusicServicePlaylistsRoutes = {
  MusicServicePlaylistsMenu: MusicServicePlaylistsMenuScreen,
  ViewAppleMusicPlaylists: ViewAppleMusicPlaylistsScreen,
  ViewSpotifyPlaylists: ViewSpotifyPlaylistsScreen,
  ViewTidalPlaylists: ViewTidalPlaylistsScreen,
  ViewPlaylist: ViewPlaylistScreen,
};
