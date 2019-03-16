/**
 * ViewPlayrollScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';

export default class ViewPlayrollScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title={'<Playroll Name Here>'}>
        <Text>ViewPlayrollScreen</Text>
      </SubScreenContainer>
    );
  }
}
