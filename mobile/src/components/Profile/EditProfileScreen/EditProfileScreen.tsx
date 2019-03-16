/**
 * EditProfileScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';

export default class EditProfileScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer title='Edit Profile'>
        <Text>EditProfileScreen</Text>
      </SubScreenContainer>
    );
  }
}
