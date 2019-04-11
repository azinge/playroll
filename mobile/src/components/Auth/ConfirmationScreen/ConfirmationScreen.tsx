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
import Errors from '../../shared/Modals/Errors';
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
  displayErrorModal: boolean;
  error?: string;
}

export default class ConfirmationScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      authCode: '',
      username: '',
      displayErrorModal: false,
      error: undefined,
    };

    this.handleErrors = this.handleErrors.bind(this);
    this.renderErrorModal = this.renderErrorModal.bind(this);
    this.handleCloseErrorModal = this.handleCloseErrorModal.bind(this);
  }

  handleErrors(error) {
    this.setState({
      error,
      displayErrorModal: true,
    });
  }

  renderErrorModal(error) {
    return (
      <Errors
        displayErrorModal={this.state.displayErrorModal}
        error={error}
        onPress={this.handleCloseErrorModal}
      />
    );
  }

  handleCloseErrorModal() {
    this.setState({
      error: undefined,
      displayErrorModal: false,
    });
  }

  validateInput(confirmSignUp) {
    if (this.state.username === '' || this.state.authCode === '') {
      return this.handleErrors('All fields must have a value.');
    }
    confirmSignUp()
      .then(response => {
        console.log('confirmSignUp promise resolved()', response);
        if (!response.data) return;
        NavigationService.goBack();
        NavigationService.goBack();
      })
      .catch(error => {
        console.log('confirmSignUp promise rejected()', error);
        this.handleErrors(error.message);
      });
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
        {(confirmSignUp, { loading }) => {
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
          </View>
          {this.renderConfirmButton()}
          {this.renderErrorModal(this.state.error)}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
