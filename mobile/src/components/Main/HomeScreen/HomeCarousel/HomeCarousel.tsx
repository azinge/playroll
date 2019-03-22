/**
 * HomeCarousel
 */

import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import styles from './HomeCarousel.styles';

export interface Props {
  title?: string;
  overlayText?: string;
  numItems: number;
}

interface State {}

export default class HomeCarousel extends React.Component<Props, State> {
  render() {
    return (
      <View>
        <View
          style={{
            marginVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.title}>Your Featured Playrolls</Text>
        </View>
        <View style={{ height: 250 }}>
          <Carousel
            data={Array(this.props.numItems).fill('')}
            renderItem={() => {
              return (
                <View
                  style={{
                    backgroundColor: 'lightgrey',
                    flex: 1,
                    borderRadius: 7,
                    alignItems: 'center',
                    margin: 10,
                    opacity: 0.5,
                  }}
                />
              );
            }}
            hasParallaxImages={false}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            itemHeight={250}
            loop={true}
          />
        </View>
        <Text
          style={[
            styles.title,
            {
              position: 'absolute',
              bottom: 16,
              right: 12,
              opacity: 0.8,
              textAlign: 'center',
            },
          ]}
        >
          {this.props.overlayText}
        </Text>
      </View>
    );
  }
}
