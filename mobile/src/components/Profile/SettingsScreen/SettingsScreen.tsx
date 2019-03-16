/**
 * SettingsScreen
 */

import * as React from 'react';
import { Text, Button } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import NavigationService from '../../../services/NavigationService';

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='Settings'>
        <Text>SettingsScreen</Text>
        <Button
          title='Music Services'
          onPress={() => {
            NavigationService.navigate('MusicServiceSettingsMenu');
          }}
        />
      </SubScreenContainer>
    );
  }
}
