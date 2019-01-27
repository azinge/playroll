/**
 * PlayrollCard
 */

import * as React from "react";
import { Text, View, Dimensions, Image, Button } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Playroll, Roll, MusicSource } from "../../../graphql/types";
import { Card } from "react-native-elements";

export interface Props {
  playroll: Playroll;
  editPlayroll: () => void;
}

interface State {}

export default class PlayrollCard extends React.Component<Props, State> {
  _renderItem({ item, index }: { item: Roll; index: number }) {
    let source: MusicSource | null = null;
    if (item.data && item.data.sources && item.data.sources.length > 0) {
      source = item.data.sources[0];
    }
    return (
      <View style={{ height: 100 }} key={index}>
        {source && (
          <Image
            source={{ uri: source.cover }}
            style={{ height: 100, width: 100, borderRadius: 5 }}
          />
        )}
      </View>
    );
  }
  render() {
    const { playroll, editPlayroll } = this.props;
    return (
      <Card
        title={playroll.name}
        // image={require("../../assets/wack.jpg")}
        key={playroll.id}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ height: 110 }}>
            {playroll.rolls.length > 0 ? (
              <Carousel
                data={playroll.rolls}
                renderItem={this._renderItem}
                hasParallaxImages={false}
                sliderWidth={110}
                itemWidth={100}
                itemHeight={100}
                layout={"tinder"}
                layoutCardOffset={5}
              />
            ) : (
              <Image
                source={{
                  uri:
                    "https://www.unesale.com/ProductImages/Large/notfound.png",
                }}
                style={{ height: 110, width: 110, borderRadius: 5 }}
              />
            )}
          </View>
          <Button onPress={editPlayroll} title="Edit Playroll" />
        </View>
      </Card>
    );
  }
}
