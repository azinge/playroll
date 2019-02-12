/**
 * ManageRollScreen
 */

import * as React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}
export default class ManageRollScreen extends React.Component<Props, State> {
  render() {
    return (
      <SafeAreaView>
        <Text>ManageRollScreen</Text>
        <Button title='Add To Playroll' onPress={() => {}} />
        <Button title='Add To Discovery Queue' onPress={() => {}} />
        <Button title='Recommend to Friend' onPress={() => {}} />
      </SafeAreaView>
    );
  }
}
