/**
 * FooterButton
 */

import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './FooterButton.styles';
import { Button } from 'react-native-elements';

export interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

interface State {}

export default class FooterButton extends React.Component<Props, State> {
  render() {
    return (
      <View
        style={{
          bottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
          // marginBottom: 20,
        }}
      >
        <Button
          // linearGradientProps={{
          //   colors: ['purple', '#4A00E0'],
          //   start: { x: 0 },
          //   end: { x: 1 },
          // }}
          containerStyle={{
            borderRadius: 80,
            width: '75%',
            position: 'absolute',
            bottom: 5,
            height: 50,
          }}
          buttonStyle={{
            borderRadius: 80,
            height: 50,
            backgroundColor: '#af00bc',
          }}
          raised
          title={this.props.title}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={this.props.onPress}
          loading={this.props.loading}
        />
      </View>
    );
  }
}
