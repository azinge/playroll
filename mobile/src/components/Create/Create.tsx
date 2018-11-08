/**
 * Application component for Playroll mobile application.
 */

import React from "react";
//import { Component } from "react";
import { View, Alert, Modal, TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";
import { Container, Header, Item, Input, Button, Text } from "native-base";

import styles from "./Create.styles";

export default class Create extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

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
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(52, 52, 52, 0.6)",
              }}
            >
              <View
                style={{
                  flex: 0.6,
                  flexDirection: "column",
                  borderRadius: 20,
                  backgroundColor: "white",
                }}
              >
                <Text style={styles.formtitle}>Add to Playroll</Text>
                <Text style={styles.welcome}>I love GoLang!</Text>

                <TouchableHighlight
                  style={styles.formfooter}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <Header searchBar rounded>
            <Item>
              <Icon type="ionicon" name="ios-search" />
              <Input
                style={{ fontSize: 14 }}
                placeholder="Search for a song, artist, or genre"
              />
            </Item>
            <Button
              transparent
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Text>Search</Text>
            </Button>
          </Header>
        </Container>
      </View>
    );
  }
}
