/**
 * LandingScreen
 */

import * as React from 'react';
import { Text, View, Button, SafeAreaView } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import styles from './LandingScreen.styles';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class LandingScreen extends React.Component<Props, State> {
  render() {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.optionsContainer}>
          <Text>Playroll</Text>
          <Button
            title='Sign In'
            onPress={() => {
              this.props.navigation && this.props.navigation.navigate('SignIn');
            }}
          />
          <Button
            title='Sign Up'
            onPress={() => {
              this.props.navigation && this.props.navigation.navigate('SignUp');
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
