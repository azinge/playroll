/**
 * Application component for Playroll mobile application.
 */

import React from "react";
import { Text, View, ScrollView, Image, Button } from "react-native";
import HeaderBar from "../../components/shared/HeaderBar";
import HomeCarousel from "./HomeCarousel";
import {
  SIGN_OUT_MUTATION,
  SignOutMutation,
} from "../../graphql/requests/Auth";

import { musicSources } from "../../static/mockData";

export default class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderBar />
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
        <HomeCarousel />
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
                    fontSize: 13,
                    color: "grey",
                  }}
                  numberOfLines={2}
                >
                  {val.name}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        {/* <SignOutMutation mutation={SIGN_OUT_MUTATION}>
          {(signOut, { data }) => {
            return (
              <Button
                title="Sign Out"
                onPress={() => {
                  signOut().then(this.props.screenProps);
                }}
              />
            );
          }}
        </SignOutMutation> */}
      </View>
    );
  }
}
