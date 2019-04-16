/**
 * YouTubeSettingsScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import NavigationService from '../../../services/NavigationService';
import { Button } from 'react-native-elements';

export default class YouTubeSettingsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='YouTube Settings'>
        <Text>YouTubeSettingsScreen</Text>
        <Button
          title='Connect To YouTube'
          onPress={() => {
            NavigationService.navigate('ConnectYouTube');
          }}
        />
      </SubScreenContainer>
    );
  }
}
