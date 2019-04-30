/**
 * EmptyDataFiller
 */

import * as React from 'react';
import { Text, View, Image } from 'react-native';

import styles from './EmptyDataFiller.styles';
import Heading from '../Heading';

export interface Props {
  text?: string;
  imgSize?: number;
  textSize?: string;
  textWidth?: number;
  horizontal?: boolean;
}

interface State {}

export default class EmptyDataFiller extends React.Component<Props, State> {
  render() {
    const { text, imgSize, textSize, textWidth, horizontal } = this.props;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          opacity: 0.25,
          flexDirection: horizontal ? 'row' : 'column',
        }}
      >
        <Image
          source={require('../../../../assets/playroll_icon_color.png')}
          style={{ width: imgSize || 250, height: imgSize || 250 }}
        />
        <Heading
          type={textSize || 'h7'}
          bold
          numLines={2}
          style={{ paddingHorizontal: 10, width: textWidth }}
        >
          {text}
        </Heading>
      </View>
    );
  }
}
