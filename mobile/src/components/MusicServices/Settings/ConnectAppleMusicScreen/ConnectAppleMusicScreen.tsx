/**
 * ConnectAppleMusicScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';

export default class ConnectAppleMusicScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='Connect To Apple Music' modal>
        <Text>ConnectAppleMusicScreen</Text>
      </SubScreenContainer>
    );
  }
}
