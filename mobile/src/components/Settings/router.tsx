import { createStackNavigator } from 'react-navigation';

import MusicServiceSettingsScreen from './MusicServiceSettingsScreen';
import ConnectAppleMusicScreen from './ConnectAppleMusicScreen';
import ConnectSpotifyScreen from './ConnectSpotifyScreen';
import ConnectYouTubeScreen from './ConnectYouTubeScreen';
import AppleMusicSettingsScreen from './AppleMusicSettingsScreen';
import SpotifySettingsScreen from './SpotifySettingsScreen';
import YouTubeSettingsScreen from './YouTubeSettingsScreen';
import SettingsScreen from './SettingsScreen';

export const SettingsRoutes = {
  Settings: SettingsScreen,
  MusicServiceSettings: MusicServiceSettingsScreen,
  AppleMusicSettings: AppleMusicSettingsScreen,
  SpotifySettings: SpotifySettingsScreen,
  YouTubeSettings: YouTubeSettingsScreen,
};

export const SettingsModalRoutes = {
  ConnectAppleMusic: ConnectAppleMusicScreen,
  ConnectSpotify: ConnectSpotifyScreen,
  ConnectYouTube: ConnectYouTubeScreen,
};
