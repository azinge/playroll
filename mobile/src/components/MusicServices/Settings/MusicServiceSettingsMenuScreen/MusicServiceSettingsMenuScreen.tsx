/**
 * MusicServiceSettingsMenuScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';
import NavigationService from '../../../../services/NavigationService';
import { Button } from 'react-native-elements';

export default class MusicServiceSettingsMenuScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='Music Service Settings'>
        <Text>MusicServiceSettingsMenuScreen</Text>
        <Button
          title='Spotify Settings'
          onPress={() => {
            NavigationService.navigate('SpotifySettings');
          }}
        />
        <Button
          title='Apple Music Settings'
          onPress={() => {
            NavigationService.navigate('AppleMusicSettings');
          }}
        />
        <Button
          title='Tidal Settings'
          onPress={() => {
            NavigationService.navigate('TidalSettings');
          }}
        />
      </SubScreenContainer>
    );
  }
}
