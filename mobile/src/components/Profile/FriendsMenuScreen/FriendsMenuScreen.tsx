/**
 * FriendsMenuScreen
 */

import * as React from 'react';
import { Text, Button, SafeAreaView } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import NavigationService from '../../../services/NavigationService';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class FriendsMenuScreen extends React.Component<Props, State> {
  render() {
    return (
      <SubScreenContainer title='My Friends'>
        <Text>FriendsMenuScreen</Text>
        <Button
          title='Add Friend'
          onPress={() => NavigationService.navigate('AddFriend')}
        />
      </SubScreenContainer>
    );
  }
}
