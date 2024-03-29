/**
 * SignUpScreen
 */

import * as React from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { WebBrowser, ImagePicker, Permissions } from 'expo';
import { NavigationScreenProp } from 'react-navigation';
import Errors from '../../shared/Modals/Errors';
import { SignUpMutation } from '../../../graphql/requests/Auth';
import styles from './SignUpScreen.styles';
import NavigationService from '../../../services/NavigationService';
import DropdownAlert from 'react-native-dropdownalert';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export interface Props {
  toggleSignUp?: () => void;
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: {
    uri: string;
    source: string;
  };
  displayErrorModal: boolean;
  error?: string;
}

export default class SignUpScreen extends React.Component<Props, State> {
  dropdown: DropdownAlert;

  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: {
        uri:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/440px-User_icon_2.svg.png',
        source: '',
      },
      displayErrorModal: false,
      error: undefined,
    };
    this.handleErrors = this.handleErrors.bind(this);
    this.renderErrorModal = this.renderErrorModal.bind(this);
    this.handleCloseErrorModal = this.handleCloseErrorModal.bind(this);
    this.selectProfileImage = this.selectProfileImage.bind(this);
    this.validateInput = this.validateInput.bind(this);
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
      displayErrorModal: false,
      error: null,
    });
  }

  handleOpenTOSURL() {
    const url = 'https://terms.playroll.io';

    WebBrowser.openBrowserAsync(url);
  }

  selectProfileImage() {
    Permissions.askAsync(Permissions.CAMERA_ROLL)
      .then(async data => {
        console.log('Permissions.getAsync data', data);
        if (data.status === 'granted') {
          const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: true,
            base64: true,
          });
          console.log('image', image);
          this.setState({
            avatar: {
              uri: image.uri,
              source: image.base64,
            },
          });
        }
      })
      .catch(error => {
        console.log('selectProfileImage() error', error);
      });
  }

  renderHeader() {
    return (
      <View style={styles.signupHeader}>
        <View style={styles.signupTextContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              right: 25,
            }}
          >
            <Icon
              name='arrow-back'
              type='material'
              color='#6A0070'
              onPress={() => {
                NavigationService.goBack();
              }}
              containerStyle={{}}
            />
            <Text
              onPress={() => NavigationService.goBack()}
              style={{ color: 'purple', fontSize: 18 }}
            >
              Back
            </Text>
          </View>

          <Text style={styles.signupText}>Sign Up</Text>
        </View>

        <TouchableOpacity
          style={styles.imageSelectionContainer}
          onPress={this.selectProfileImage}
          disabled
        >
          <View style={{ opacity: 0 }}>
            <Image
              source={{ uri: this.state.avatar.uri }}
              style={styles.image}
            />
            <Text style={[styles.editPhotoText, { color: '#6A0070' }]}>
              Edit Photo
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  termsOfServiceLink() {
    return (
      <TouchableOpacity onPress={() => this.handleOpenTOSURL()}>
        <Text style={styles.tosLink}>
          By signing up, you are agreeing to our Terms of Service.
        </Text>
      </TouchableOpacity>
    );
  }

  async signUpWrapper(signUp) {
    try {
      await signUp({
        variables: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          avatar: this.state.avatar.uri,
        },
      });
      NavigationService.navigate('Confirmation', {
        username: this.state.username,
        password: this.state.password,
      });
    } catch (err) {
      if (err.code === 'InvalidPasswordException') {
        this.dropdown.alertWithType(
          'error',
          'Invalid Password.',
          'Your Password must contain: a capital letter, a lowercase letter, ' +
            'a number, a special character (*!^, etc.), and 8 characters or more'
        );
      } else if (err.code === 'UsernameExistsException') {
        this.dropdown.alertWithType(
          'error',
          'Error',
          'Username has already been taken. Please choose a different username.'
        );
      } else if (err.code === 'TooManyRequestsException') {
        this.dropdown.alertWithType(
          'error',
          'Error',
          "We're having trouble signing up your account. Please contact us at help@playroll.io."
        );
      } else if (err.code === 'CodeDeliveryFailureException') {
        this.dropdown.alertWithType(
          'error',
          'Error',
          'Could not send confirmation code to email.'
        );
      } else if (err.code === 'InvalidParameterException') {
        this.dropdown.alertWithType('error', 'Error', err.message);
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

  validateInput(signUp) {
    const { username, email, password, confirmPassword, avatar } = this.state;
    if (
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === '' ||
      avatar.uri === ''
    ) {
      return this.dropdown.alertWithType(
        'error',
        'Error',
        'All fields must have a value.'
      );
    }
    if (password !== confirmPassword) {
      return this.dropdown.alertWithType(
        'error',
        'Error',
        'Passwords do not match.'
      );
    }
    this.signUpWrapper(signUp);
  }

  renderSignupButton() {
    return (
      <SignUpMutation>
        {(signUp, { loading, error, data }) => {
          if (data) {
          }
          return (
            <TouchableOpacity
              onPress={() => this.validateInput(signUp)}
              style={styles.submitButton}
            >
              {loading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text style={styles.submitButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
          );
        }}
      </SignUpMutation>
    );
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
            <KeyboardAwareScrollView style={{ flex: 1 }}>
              {/* {this.renderSegueToSignIn()} */}
              {this.renderHeader()}
              <Text style={styles.formText}>Username</Text>
              <TextInput
                placeholder='Username'
                autoCapitalize='none'
                style={styles.inputContainer}
                onChangeText={(username: string) => this.setState({ username })}
                value={this.state.username}
              />
              <Text style={styles.formText}>Email</Text>
              <TextInput
                placeholder='Email'
                style={styles.inputContainer}
                onChangeText={(email: string) => this.setState({ email })}
                autoCapitalize={'none'}
                value={this.state.email}
              />
              <Text style={styles.formText}>Password</Text>
              <TextInput
                placeholder='Password'
                style={styles.inputContainer}
                onChangeText={(password: string) => this.setState({ password })}
                secureTextEntry={true}
                value={this.state.password}
              />
              <Text style={styles.formText}>Confirm Password</Text>
              <TextInput
                placeholder='Confirm Password'
                style={styles.inputContainer}
                onChangeText={(confirmPassword: string) =>
                  this.setState({ confirmPassword })
                }
                secureTextEntry={true}
                value={this.state.confirmPassword}
              />
              {this.termsOfServiceLink()}
            </KeyboardAwareScrollView>
          </View>
          {this.renderSignupButton()}
          <DropdownAlert ref={ref => (this.dropdown = ref)} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
