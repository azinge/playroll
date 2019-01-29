/**
 * HomeCarousel
 */

import React from "react";
import { Text, View, Image, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

import { playrolls, Playroll } from "../../../../static/mockData";

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
      <View style={{ height: 250 }} key={index}>
        <Image
          source={{ uri: item.cover }}
          style={{ height: 250, width: Dimensions.get("window").width }}
        />
        <View
          style={{
            position: "absolute",
            right: 20,
            bottom: 20,
            padding: 7,
            borderRadius: 10,
            backgroundColor: "#993399",
            shadowColor: "black",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 1,
            shadowRadius: 1,
          }}
        >
          <Text
            style={{ fontFamily: "Avenir", color: "white" }}
            numberOfLines={2}
          >
            {item.name}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ height: 250 }}>
        <Carousel
          data={this.state.entries}
          renderItem={this._renderItem}
          hasParallaxImages={false}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width}
          itemHeight={250}
          loop={true}
        />
      </View>
    );
  }
}
