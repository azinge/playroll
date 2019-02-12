/**
 * DiscoverScreen
 */

import React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  Button,
  SafeAreaView,
} from "react-native";
import { NavigationScreenProp } from "react-navigation";

import HeaderBar from "../../../components/shared/HeaderBar";
import DiscoverCarousel from "./DiscoverCarousel";

import { musicSources } from "../../../static/mockData";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}
export default class DiscoverScreen extends React.Component<Props, State> {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <HeaderBar navigation={this.props.navigation} />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
            <Text
              style={{
                fontFamily: "Avenir",
                fontWeight: "bold",
                fontSize: 20,
                color: "#993399",
              }}
            >
              Home
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              paddingHorizontal: 10,
              borderLeftColor: "grey",
              borderLeftWidth: 1,
            }}
          >
            <Text
              style={{
                fontFamily: "Avenir",
                fontWeight: "bold",
                fontSize: 20,
                color: "grey",
              }}
            >
              Playrolls
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              paddingHorizontal: 10,
              borderLeftColor: "grey",
              borderLeftWidth: 1,
            }}
          >
            <Text
              style={{
                fontFamily: "Avenir",
                fontWeight: "bold",
                fontSize: 20,
                color: "grey",
              }}
            >
              Radio
            </Text>
          </View>
        </View>
        <DiscoverCarousel />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ marginVertical: 5, paddingHorizontal: 10 }}>
            <Text
              style={{
                fontFamily: "Avenir",
                fontWeight: "bold",
                fontSize: 20,
                color: "#993399",
              }}
            >
              Popular
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              paddingHorizontal: 10,
              borderLeftColor: "grey",
              borderLeftWidth: 1,
            }}
          >
            <Text
              style={{
                fontFamily: "Avenir",
                fontWeight: "bold",
                fontSize: 20,
                color: "grey",
              }}
            >
              New
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              paddingHorizontal: 10,
              borderLeftColor: "grey",
              borderLeftWidth: 1,
            }}
          >
            <Text
              style={{
                fontFamily: "Avenir",
                fontWeight: "bold",
                fontSize: 20,
                color: "grey",
              }}
            >
              Recommended
            </Text>
          </View>
        </View>
        <ScrollView horizontal={true}>
          {musicSources.map((val, idx) => {
            return (
              <View style={{ width: 125, marginHorizontal: 10 }} key={idx}>
                <Image
                  style={{
                    width: 125,
                    height: 125,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "lightgrey",
                  }}
                  source={{ uri: val.cover }}
                />
                <Text
                  style={{
                    fontFamily: "Avenir",
                    fontWeight: "bold",
                    fontSize: 10,
                    color: "grey",
                  }}
                  numberOfLines={2}
                >
                  {val.name}
                </Text>
                {val.creator && (
                  <Text
                    style={{
                      fontFamily: "Avenir",
                      fontWeight: "bold",
                      fontSize: 10,
                      color: "lightgrey",
                    }}
                    numberOfLines={2}
                  >
                    {val.creator}
                  </Text>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
