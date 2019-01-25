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
        <Text>Home | Playrolls | Radio</Text>
        <HomeCarousel />
        <Text>Popular | New | Recommended</Text>
        <ScrollView horizontal={true}>
          {musicSources.map((val, idx) => {
            return (
              <View style={{ width: 100, margin: 10 }} key={idx}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: val.cover }}
                />
                <Text>{val.name}</Text>
              </View>
            );
          })}
        </ScrollView>
        <SignOutMutation mutation={SIGN_OUT_MUTATION}>
          {(signOut, { data }) => {
            return (
              <Button
                title="Sign Out"
                onPress={() => {
                  signOut().then(() => this.props.navigation.navigate("Login"));
                }}
              />
            );
          }}
        </SignOutMutation>
      </View>
    );
  }
}
