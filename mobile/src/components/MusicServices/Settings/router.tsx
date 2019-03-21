import { createStackNavigator } from 'react-navigation';

import MusicServiceSettingsMenuScreen from './MusicServiceSettingsMenuScreen';
import ConnectAppleMusicScreen from './ConnectAppleMusicScreen';
import ConnectSpotifyScreen from './ConnectSpotifyScreen';
import ConnectTidalScreen from './ConnectTidalScreen';
import AppleMusicSettingsScreen from './AppleMusicSettingsScreen';
import SpotifySettingsScreen from './SpotifySettingsScreen';
import TidalSettingsScreen from './TidalSettingsScreen';

export const MusicServiceSettingsRoutes = {
  MusicServiceSettingsMenu: MusicServiceSettingsMenuScreen,
  AppleMusicSettings: AppleMusicSettingsScreen,
  SpotifySettings: SpotifySettingsScreen,
  TidalSettings: TidalSettingsScreen,
};

export const MusicServiceSettingsModalRoutes = {
  ConnectAppleMusic: ConnectAppleMusicScreen,
  ConnectSpotify: ConnectSpotifyScreen,
  ConnectTidal: ConnectTidalScreen,
};
