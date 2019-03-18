/**
 * TidalSettingsScreen
 */

import * as React from 'react';
import { Text, View, Button } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';
import NavigationService from '../../../../services/NavigationService';

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
