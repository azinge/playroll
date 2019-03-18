/**
 * GENERIC_COMPONENT
 */

import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './GENERIC_COMPONENT.styles';

export interface Props {}

interface State {}

export default class GENERIC_COMPONENT extends React.Component<Props, State> {
  render() {
    return (
      <View>
        <Text>GENERIC_COMPONENT</Text>
      </View>
    );
  }
}
