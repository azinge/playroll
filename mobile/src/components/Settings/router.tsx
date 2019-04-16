import { createStackNavigator } from 'react-navigation';

import MusicServiceSettingsMenuScreen from './MusicServiceSettingsMenuScreen';
import ConnectAppleMusicScreen from './ConnectAppleMusicScreen';
import ConnectSpotifyScreen from './ConnectSpotifyScreen';
import ConnectTidalScreen from './ConnectTidalScreen';
import AppleMusicSettingsScreen from './AppleMusicSettingsScreen';
import SpotifySettingsScreen from './SpotifySettingsScreen';
import TidalSettingsScreen from './TidalSettingsScreen';
import SettingsMenuScreen from './SettingsMenuScreen';

export const SettingsNavigator = createStackNavigator(
  {
    SettingsMenu: SettingsMenuScreen,
    MusicServiceSettingsMenu: MusicServiceSettingsMenuScreen,
    AppleMusicSettings: AppleMusicSettingsScreen,
    SpotifySettings: SpotifySettingsScreen,
    TidalSettings: TidalSettingsScreen,
  },
  {
    initialRouteName: 'SettingsMenu',
    headerMode: 'none',
  }
);

export const SettingsModalRoutes = {
  ConnectAppleMusic: ConnectAppleMusicScreen,
  ConnectSpotify: ConnectSpotifyScreen,
  ConnectTidal: ConnectTidalScreen,
};
