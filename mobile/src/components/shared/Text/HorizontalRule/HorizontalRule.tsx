/**
 * HorizontalRule
 */

import * as React from 'react';
import { Text, View, StyleProp, ViewStyle } from 'react-native';

import styles from './HorizontalRule.styles';

export interface Props {
  style?: StyleProp<ViewStyle>;
}

interface State {}

export default class HorizontalRule extends React.Component<Props, State> {
  render() {
    return <View style={[this.props.style, styles.horizontalRule]} />;
  }
}
