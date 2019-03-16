/**
 * ViewDiscoveryQueueScreen
 */

import * as React from 'react';
import { Text, SafeAreaView } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';

export default class ViewDiscoveryQueueScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title={'My Discovery Queue'}>
        <Text>ViewDiscoveryQueueScreen</Text>
      </SubScreenContainer>
    );
  }
}
