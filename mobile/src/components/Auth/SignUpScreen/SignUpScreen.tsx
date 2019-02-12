/**
 * SignUpScreen
 */

import * as React from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  Button,
  Switch,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import {
  SignUpMutation,
  ConfirmSignUpMutation,
} from '../../../graphql/requests/Auth';

import styles from './SignUpScreen.styles';
export interface Props {
  toggleSignUp?: () => void;
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  username: string;
  password: string;
  email: string;
  avatar: string;
  confirmUser: string;
  authCode: string;
  showPassword: boolean;
}

export default class SignUpScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/440px-User_icon_2.svg.png',
      confirmUser: '',
      authCode: '',
      showPassword: true,
    };
    this.toggleSwitch = this.toggleSwitch.bind(this);
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  render() {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.optionsContainer}>
          <Text>SignUpScreen</Text>
          <TextInput
            style={styles.usernameField}
            autoCapitalize='none'
            placeholder='Username'
            onChangeText={(username: string) => this.setState({ username })}
            value={this.state.username}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={this.state.showPassword}
              autoCapitalize='none'
              placeholder='Password'
              style={styles.passwordField}
              onChangeText={(password: string) => this.setState({ password })}
              value={this.state.password}
            />
            <Switch
              onValueChange={this.toggleSwitch}
              value={!this.state.showPassword}
            />
          </View>
          <TextInput
            style={styles.emailField}
            autoCapitalize='none'
            placeholder='Email'
            onChangeText={(email: string) => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput // TODO: Remove Later
            style={styles.emailField}
            autoCapitalize='none'
            placeholder='Avatar link'
            onChangeText={(avatar: string) => this.setState({ avatar })}
            value={this.state.avatar}
          />
          <SignUpMutation
            variables={{
              username: this.state.username,
              password: this.state.password,
              email: this.state.email,
              avatar: this.state.avatar,
            }}
          >
            {(signUp, { data }) => {
              return (
                <Button
                  title='Sign Up'
                  onPress={() => {
                    signUp();
                  }}
                />
              );
            }}
          </SignUpMutation>
          <TextInput
            style={styles.confirmUsernameField}
            autoCapitalize='none'
            placeholder='Username'
            onChangeText={(confirmUser: string) =>
              this.setState({ confirmUser })
            }
            value={this.state.confirmUser}
          />
          <TextInput
            style={styles.confirmCodeField}
            autoCapitalize='none'
            placeholder='Code'
            onChangeText={(authCode: string) => this.setState({ authCode })}
            value={this.state.authCode}
          />
          <ConfirmSignUpMutation
            variables={{
              username: this.state.confirmUser,
              code: this.state.authCode,
            }}
          >
            {(confirmSignUp, { data }) => {
              return (
                <Button
                  title='Confirm Sign Up'
                  onPress={() => {
                    confirmSignUp();
                  }}
                />
              );
            }}
          </ConfirmSignUpMutation>
        </View>
      </SafeAreaView>
    );
  }
}
