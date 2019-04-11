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
import {
  ConfirmSignUpMutation,
  ResendSignUpMutation,
} from '../../../graphql/requests/Auth';
import styles from './ConfirmationScreen.styles';
import { NavigationScreenProp } from 'react-navigation';
import NavigationService from '../../../services/NavigationService';
import DropdownAlert from 'react-native-dropdownalert';

export interface Props {
  toggleSignUp: () => void;
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  authCode: string;
  username: string;
  triggerResendSignUp: boolean;
  error?: string;
}

export default class ConfirmationScreen extends React.Component<Props, State> {
  dropdown: DropdownAlert;

  constructor(props: Props) {
    super(props);

    this.state = {
      authCode: '',
      username: '',
      error: undefined,
      triggerResendSignUp: false,
    };

    this.renderError = this.renderError.bind(this);
  }

  componentDidMount() {
    const username =
      this.props.navigation && this.props.navigation.getParam('username');
    const password =
      this.props.navigation && this.props.navigation.getParam('password');
    if (username) {
      this.setState({ username, triggerResendSignUp: !password });
    }
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

  async resendSignUpWrapper(resendSignUp) {
    try {
      await resendSignUp({ variables: { username: this.state.username } });
      this.dropdown.alertWithType(
        'info',
        'Confirmation Code Sent!',
        'We have sent a confirmation code to the email associated with this account.'
      );
    } catch (err) {
      if (err.code === 'UserNotFoundException') {
        this.dropdown.alertWithType('error', 'Error', 'Could not find User.');
      } else if (err.code === 'InvalidParameterException') {
        this.dropdown.alertWithType(
          'error',
          'Error',
          'User is already confirmed.'
        );
      } else {
        this.dropdown.alertWithType(
          'error',
          'Error',
          "We're sorry, Please try again."
        );
      }
    }
  }

  renderInfoContainer() {
    return (
      <ResendSignUpMutation>
        {(resendSignUp, { loading }) => {
          if (this.state.triggerResendSignUp) {
            this.setState({ triggerResendSignUp: false }, () => {
              this.resendSignUpWrapper(resendSignUp);
            });
          }
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
                onPress={() => this.resendSignUpWrapper(resendSignUp)}
              >
                <Text style={styles.infoText}>Resend Code</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </ResendSignUpMutation>
    );
  }

  renderFormLabel(label) {
    return <Text style={styles.formText}>{label}</Text>;
  }

  async confirmSignUpWrapper(confirmSignUp) {
    try {
      await confirmSignUp({
        variables: {
          username: this.state.username,
          code: this.state.authCode,
        },
      });
      const password =
        this.props.navigation && this.props.navigation.getParam('password');
      NavigationService.goBack();
      NavigationService.goBack();
      NavigationService.navigate('SignIn', {
        username: this.state.username,
        password: password || undefined,
      });
    } catch (err) {
      if (err.code === 'CodeMismatchException') {
        this.dropdown.alertWithType(
          'error',
          'Error',
          'Incorrect Confirmation Code.'
        );
      } else if (err.code === 'ExpiredCodeException') {
        this.dropdown.alertWithType('error', 'Error', 'Code has Expired.');
      } else if (
        err.code === 'TooManyFailedAttemptsException' ||
        err.code === 'TooManyRequestsException'
      ) {
        this.dropdown.alertWithType(
          'error',
          'Error',
          "We're having trouble confirming your account. Please contact us at help@playroll.io."
        );
      } else if (err.code === 'UserNotFoundException') {
        this.dropdown.alertWithType('error', 'Error', 'Could not find User.');
      } else if (err.code === 'NotAuthorizedException') {
        this.dropdown.alertWithType(
          'error',
          'Error',
          'User is already confirmed.'
        );
      } else {
        console.log(err);
        this.dropdown.alertWithType(
          'error',
          'Error',
          "We're sorry, Please try again."
        );
      }
    }
  }

  validateInput(confirmSignUp) {
    if (this.state.username === '' || this.state.authCode === '') {
      this.dropdown.alertWithType(
        'error',
        'Error',
        'All fields must have a value.'
      );
    }
    this.confirmSignUpWrapper(confirmSignUp);
  }

  renderConfirmButton() {
    return (
      <ConfirmSignUpMutation>
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
            {this.renderError()}
          </View>
          {this.renderConfirmButton()}
          <DropdownAlert ref={ref => (this.dropdown = ref)} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
