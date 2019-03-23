/**
 * AppleMusicSettingsScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';
import { Button } from 'react-native-elements';
import NavigationService from '../../../../services/NavigationService';

export default class AppleMusicSettingsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='Apple Music Settings'>
        <Text>AppleMusicSettingsScreen</Text>
        <Button
          title='Connect To Apple Music'
          onPress={() => {
            NavigationService.navigate('ConnectAppleMusic');
          }}
        />
      </SubScreenContainer>
    );
  }
}
