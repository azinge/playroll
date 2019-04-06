/**
 * GENERIC_COMPONENT
 */

import * as React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

import styles from './Errors.styles';

export interface Props {
  displayErrorModal: boolean;
  error: string;
  onPress: () => void;
}

interface State {}

export default class Errors extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.props.displayErrorModal}
        onRequestClose={this.props.onPress}
      >
        <View style={styles.errorModalContainer}>
          <View style={styles.errorModal}>
            <Text style={styles.errorModalTitle}>Error!</Text>
            <Text style={styles.errorDescription}>{this.props.error}</Text>
            <TouchableOpacity onPress={this.props.onPress}>
              <Text style={styles.errorHideLabel}>Hide</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
