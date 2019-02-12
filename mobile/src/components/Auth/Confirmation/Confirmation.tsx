/**
 * Signup component for Playroll mobile application.
 */

import React from "react";
import {
  Text, TextInput, View,
  TouchableOpacity, Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';

export interface Props {}

interface State {
  confirmationCode?: string,
  error?: string
}

 export default class Confirmation extends React.Component<Props, State> {
   constructor(props: Props) {
    super(props);

    this.state = {
      confirmationCode: undefined,
      error: undefined,
    };

    this.validateInput = this.validateInput.bind(this);
    this.confirmAccount = this.confirmAccount.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  // TODO: handle sending data to endpoints
  confirmAccount(confirmationCode: String) {
    console.log(confirmationCode);
  }

  validateInput() {
    if (!this.state.confirmationCode) {
      return this.setState({
        error: 'Please enter a code.'
      }, () => setTimeout(() => {this.setState({ error: undefined })}, 4000));
    }
    this.confirmAccount(this.state.confirmationCode);
  }

  renderHeader() {
    return (
      <View style={styles.confirmationHeader}>
        <Text style={styles.signupText}>Confirm Account</Text>
      </View>
    )
  }

  renderInputField() {
    return (
      <TextInput
        placeholder="Confirmation Code"
        style={styles.inputContainer}
        onChangeText={text => this.setState({ confirmationCode: text.trim() })}
        autoCapitalize={'sentences'}
        value={this.state.confirmationCode}
      />
    )
  }

  renderConfirmButton() {
    return (
      <TouchableOpacity
        onPress={() => this.validateInput()}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>Confirm</Text>
      </TouchableOpacity>
    )
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
            {this.renderInputField()}
            {this.renderError()}
          </View>
          {this.renderConfirmButton()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
 }
