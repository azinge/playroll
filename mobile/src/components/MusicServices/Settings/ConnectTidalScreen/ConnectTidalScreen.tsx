/**
 * ConnectTidalScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';

export default class ConnectTidalScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='Connect To Tidal' modal>
        <Text>ConnectTidalScreen</Text>
      </SubScreenContainer>
    );
  }
}
