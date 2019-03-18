/**
 * ViewProfileScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';

export default class ViewProfileScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title={'<Profile Name Here>'}>
        <Text>ViewProfileScreen</Text>
      </SubScreenContainer>
    );
  }
}
