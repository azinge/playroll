/**
 * Signup component for Playroll mobile application.
 */

import React from "react";
import {
  Text, TextInput, 
  TouchableOpacity, View,
  TouchableWithoutFeedback,
  Keyboard, Platform, Linking, 
} from 'react-native';
import SafariView from 'react-native-safari-view';
import styles from './styles';

export interface Props {}

interface State {
  usernameFieldText?: string,
  emailFieldText?: string,
  passwordFieldText?: string,
  confirmPasswordFieldText?: string,
  error?: string
}

 export default class Signup extends React.Component<Props, State> {
   constructor(props: Props) {
    super(props);

    this.state = {
      usernameFieldText: undefined,
      emailFieldText: undefined,
      passwordFieldText: undefined,
      confirmPasswordFieldText: undefined,
      error: undefined
    };

    this.updateField = this.updateField.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.registerAccount = this.registerAccount.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  updateField(field: string, text: string) {
    let updatedState: { [key:string]:string }= {};
    updatedState[field] = text.trim();
    this.setState(updatedState);
  }

  //TODO: handle sending data to endpoints
  registerAccount(username: String, email: String, password: String, repassword: String) {
    console.log(username, email, password, repassword);
  }

  validateInput() {
    const {
      usernameFieldText, emailFieldText,
      passwordFieldText, confirmPasswordFieldText
    } = this.state;

    if (
      !usernameFieldText || !emailFieldText ||
      !passwordFieldText || !confirmPasswordFieldText
    ) {
      return this.setState({
        error: 'All fields must have a value.'
      }, () => setTimeout(() => {this.setState({ error: undefined })}, 4000));
    }

    if (passwordFieldText !== confirmPasswordFieldText) {
      return this.setState({
        error: 'Passwords do not match.'
      }, () => setTimeout(() => {this.setState({ error: undefined })}, 4000));
    }

    this.registerAccount(
      usernameFieldText, emailFieldText,
      passwordFieldText, confirmPasswordFieldText
    );
  }

  handleOpenTOSURL() {
    const url = 'http://www.playroll.io/tos';
    if (Platform.OS === 'ios') {
      return SafariView.show({ url, fromBottom: true });
    }
    Linking.openURL(url);
  }

  renderHeader() {
    return (
      <View style={styles.signupHeader}>
        <Text style={styles.signupText}>Sign Up</Text>
      </View>
    )
  }

  termsOfServiceLink() {
    return(
      <TouchableOpacity
        onPress={() => this.handleOpenTOSURL()}
        style={styles.tosContainer}
        >
        <Text style={styles.tosLink}>By signing up, you are agreeing to our Terms of Service.</Text>
      </TouchableOpacity>
    );
  }

  renderSignupButton() {
    return (
      <TouchableOpacity
        onPress={() => this.validateInput()}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Sign Up</Text>
      </TouchableOpacity>
    );
  }

  renderError() {
    return (
      <Text style={styles.errorMessage}>
        {this.state.error}
      </Text>
    )
  }

  render() {
    return(
      <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            {this.renderHeader()}
            <TextInput
              placeholder="Username"
              style={styles.inputContainer}
              onChangeText={text => this.updateField("usernameFieldText", text)}
              autoCapitalize={'sentences'}
              value={this.state.usernameFieldText}
            />
            <TextInput
              placeholder="Email"
              style={styles.inputContainer}
              onChangeText={text => this.updateField("emailFieldText", text)}
              autoCapitalize={'none'}
              value={this.state.emailFieldText}
            />
            <TextInput
              placeholder="Password"
              style={styles.inputContainer}
              onChangeText={text => this.updateField("passwordFieldText", text)}
              secureTextEntry={true}
              value={this.state.passwordFieldText}
            />
            <TextInput
              placeholder="Confirm Password"
              style={styles.inputContainer}
              onChangeText={text => this.updateField("confirmPasswordFieldText", text)}
              secureTextEntry={true}
              value={this.state.confirmPasswordFieldText}
            />
            {this.termsOfServiceLink()}
            {this.renderError()}
          </View>
          {this.renderSignupButton()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
 }
