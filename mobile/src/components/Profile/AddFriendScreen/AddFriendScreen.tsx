/**
 * AddFriendScreen
 */

import * as React from 'react';
import { Text } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';

export default class AddFriendScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='Add Friend'>
        <Text>AddFriendScreen</Text>
      </SubScreenContainer>
    );
  }
}
