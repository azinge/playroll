/**
 * Heading
 */

import * as React from 'react';
import { Text, View, StyleProp, ViewStyle } from 'react-native';

import Scaled from '../../../../themes/Scaled';
import styles from './Heading.styles';

export interface Props {
  type: string;
  family?: string;
  color?: string;
  alignment?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  bold?: boolean;
  opacity?: number;
  numLines?: number;
  style?: StyleProp<ViewStyle>;
}

interface State {}

export default class Heading extends React.Component<Props, State> {
  render() {
    const {
      type,
      family,
      color,
      alignment,
      bold,
      opacity,
      numLines,
      style,
    } = this.props;
    return (
      <Text
        style={[
          style,
          {
            fontSize: Scaled.fontSize[type],
            fontFamily: family || 'Avenir',
            color: color || 'purple',
            textAlign: alignment || 'center',
            fontWeight: bold ? 'bold' : 'normal',
            opacity,
          },
        ]}
        numberOfLines={numLines || 1}
      >
        {this.props.children}
      </Text>
    );
  }
}
