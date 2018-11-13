/**
 * HomeCarousel
 */

import React from "react";
import { Text, View, Image } from "react-native";
import Carousel from "react-native-snap-carousel";

import { playrolls, Playroll } from "../../../static/mockData";

import styles from "./HomeCarousel.styles";

export interface Props {}

interface State {
  entries: Playroll[];
}

export default class HomeCarousel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      entries: playrolls,
    };
  }

  _renderItem({ item, index }: { item: Playroll; index: number }) {
    return (
      <View style={{ height: 15 }} key={index}>
        <Image
          source={{ uri: item.cover }}
          style={{ height: 100, width: 100 }}
        />
        <Text numberOfLines={2}>{item.name}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ height: 150 }}>
        <Carousel
          data={this.state.entries}
          renderItem={this._renderItem}
          hasParallaxImages={false}
          sliderWidth={400}
          itemWidth={150}
          itemHeight={150}
        />
      </View>
    );
  }
}
