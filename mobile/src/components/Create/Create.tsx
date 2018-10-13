/**
 * Application component for Playroll mobile application.
 */

import React from "react";
//import { Component } from "react";
import { View, ScrollView, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { Container, Header, Item, Input, Button, Text } from "native-base";
import AlertModal from "../AlertModal";

import styles from "./Create.styles";

export default class Create extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <View style={{ backgroundColor: "#6A0070", flexDirection: "row" }}>
          <Text style={styles.headline}>Hi Eddie </Text>
          <Icon
            type="material-community"
            name="language-go"
            size={35}
            color="#ffffff"
            onPress={() => this.props.navigation.navigate("Home")}
          />
          <Icon
            type="material-community"
            name="magnify"
            size={35}
            color="#ffffff"
          />
          <Icon
            type="material-community"
            name="menu"
            size={35}
            color="#ffffff"
          />
        </View>
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon type="ionicon" name="ios-search" />
              <Input placeholder="Search" />
              <Icon type="ionicon" name="ios-people" />
            </Item>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Text>Search</Text>
            </Button>
          </Header>
        </Container>
        <ScrollView>
          {AlertModal}
        </ScrollView>
      </View>
    );
  }
}
