/**
 * TidalSettingsScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';
import NavigationService from '../../../../services/NavigationService';
import { Button } from 'react-native-elements';

export default class TidalSettingsScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='Tidal Settings'>
        <Text>TidalSettingsScreen</Text>
        <Button
          title='Connect To Tidal'
          onPress={() => {
            NavigationService.navigate('ConnectTidal');
          }}
        />
      </SubScreenContainer>
    );
  }
}
