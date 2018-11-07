/**
 * HomeCarousel
 */

import React from "react";
import { Text, View, Image } from "react-native";
import Carousel from "react-native-snap-carousel";

import styles from "./HomeCarousel.styles";

export interface Props {}

interface State {
  entries: any;
}

export default class HomeCarousel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      entries: [
        {
          thumbnail: "assets/wack.jpg",
          title: "TESTING",
        },
        {
          thumbnail: "assets/wack.jpg",
          title: "TESTING",
        },
        {
          thumbnail: "assets/wack.jpg",
          title: "TESTING",
        },
      ],
    };
  }

  _renderItem({ item, index }) {
    return (
      <View style={{ height: 15 }}>
        <Image
          source={require("../../../assets/wack.jpg")}
          style={{ height: 100, width: 100 }}
        />
        <Text numberOfLines={2}>{item.title}</Text>
      </View>
    );
  }

  render() {
    return (
      <Carousel
        data={this.state.entries}
        renderItem={this._renderItem}
        hasParallaxImages={false}
        sliderWidth={300}
        itemWidth={150}
        itemHeight={150}
      />
    );
  }
}
