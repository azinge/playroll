/**
 * Heading
 */

import * as React from 'react';
import {
  Text,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

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
  onPress?: () => void;
  disabled?: boolean;
  width?: number;
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
      onPress,
      disabled,
      style,
      width,
    } = this.props;
    const text = (
      <Text
        style={[
          {
            fontSize: Scaled.fontSize[type],
            fontFamily: family || 'Avenir',
            color: color || 'purple',
            textAlign: alignment || 'center',
            fontWeight: bold ? 'bold' : 'normal',
            opacity,
            width,
          },
          disabled ? { color: 'grey', opacity: 0.7 } : {},
        ]}
        numberOfLines={numLines || 1}
      >
        {this.props.children}
      </Text>
    );
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || !onPress}
        style={style}
      >
        {text}
      </TouchableOpacity>
    );
  }
}
