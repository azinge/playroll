/**
 * SpotifySettingsScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import NavigationService from '../../../services/NavigationService';
import { Button } from 'react-native-elements';

export default class SpotifySettingsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='Spotify Settings'>
        <Text>SpotifySettingsScreen</Text>
        <Button
          title='Connect To Spotify'
          onPress={() => {
            NavigationService.navigate('ConnectSpotify');
          }}
        />
      </SubScreenContainer>
    );
  }
}
