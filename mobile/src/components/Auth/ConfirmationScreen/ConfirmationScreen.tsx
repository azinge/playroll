/**
 * Signup component for Playroll mobile application.
 */

import * as React from 'react';
import {
  Text,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { ConfirmSignUpMutation } from '../../../graphql/requests/Auth';
import styles from './ConfirmationScreen.styles';
import { NavigationScreenProp } from 'react-navigation';
import NavigationService from '../../../services/NavigationService';

export interface Props {
  toggleSignUp: () => void;
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  authCode: string;
  username: string;
  error?: string;
}

export default class ConfirmationScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      authCode: '',
      username: '',
      error: undefined,
    };

    this.renderError = this.renderError.bind(this);
  }

  validateInput(confirmSignUp) {
    if (this.state.username === '' || this.state.authCode === '') {
      return this.setState(
        {
          error: 'All fields must have a value.',
        },
        () => {
          setTimeout(() => {
            this.setState({ error: null });
          }, 3000);
        }
      );
    }
    confirmSignUp();
    NavigationService.goBack();
    NavigationService.goBack();
    NavigationService.navigate('SignIn');
  }

  renderSegueToSignIn() {
    return (
      <TouchableOpacity
        style={styles.segueToSignInContainer}
        onPress={() => {
          NavigationService.goBack();
          NavigationService.goBack();
        }}
      >
        <Icon name='arrow-back' type='material' color='#6A0070' />
        <Text style={styles.signInTitle}>Sign In</Text>
      </TouchableOpacity>
    );
  }

  renderHeader() {
    return (
      <View style={styles.confirmationHeader}>
        <Text style={styles.confirmationLabel}>Confirm Account</Text>
      </View>
    );
  }

  resendConfirmationCode() {
    // TODO: Waiting on endpoint
  }

  renderInfoContainer() {
    return (
      <View style={styles.informationContainer}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>
            We have just sent an email to your account, please enter the
            confirmation code provided.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.resendContainer}
          onPress={this.resendConfirmationCode}
        >
          <Text style={styles.infoText}>Resend Code</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderFormLabel(label) {
    return <Text style={styles.formText}>{label}</Text>;
  }

  renderConfirmButton() {
    return (
      <ConfirmSignUpMutation
        variables={{
          username: this.state.username,
          code: this.state.authCode,
        }}
      >
        {(confirmSignUp, { loading, error, data }) => {
          return (
            <TouchableOpacity
              onPress={() => this.validateInput(confirmSignUp)}
              style={styles.submitButton}
            >
              {loading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text style={styles.submitButtonText}>Confirm Account</Text>
              )}
            </TouchableOpacity>
          );
        }}
      </ConfirmSignUpMutation>
    );
  }

  renderError() {
    return <Text style={styles.errorMessage}>{this.state.error}</Text>;
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.container}>
            {this.renderSegueToSignIn()}
            {this.renderHeader()}
            {this.renderInfoContainer()}
            {this.renderFormLabel('Username')}
            <TextInput
              placeholder='Username'
              style={styles.inputContainer}
              onChangeText={text => this.setState({ username: text.trim() })}
              autoCapitalize={'none'}
              value={this.state.username}
            />
            {this.renderFormLabel('Confirmation Code')}
            <TextInput
              placeholder='Confirmation Code'
              style={styles.inputContainer}
              onChangeText={text => this.setState({ authCode: text.trim() })}
              autoCapitalize={'none'}
              value={this.state.authCode}
            />
            {this.renderError()}
          </View>
          {this.renderConfirmButton()}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
