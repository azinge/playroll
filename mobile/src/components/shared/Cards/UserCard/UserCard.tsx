/**
 * UserCard
 */

import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './UserCard.styles';

export interface Props {}

interface State {}

export default class UserCard extends React.Component<Props, State> {
  render() {
    return (
      <View>
        <Text>UserCard</Text>
      </View>
    );
  }
}
