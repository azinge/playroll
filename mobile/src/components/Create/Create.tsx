/**
 * Application component for Playroll mobile application.
 */
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";
import React from "react";
//import { Component } from "react";
import {
  View,
  Alert,
  Modal,
  TouchableHighlight,
  SegmentedControlIOS,
  Picker,
  Image,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
import { Container, Header, Item, Input, Button, Text } from "native-base";

import styles, { pickerStyle } from "./Create.styles";

export default class Create extends React.Component {
  // inputRefs = {}
  state = {
    modalVisible: false,
    items: [
      {
        label: "Songs",
        value: "songs",
      },
      {
        label: "Minutes",
        value: "minutes",
      },
      {
        label: "Deez Nuts",
        value: "deez nuts",
      },
    ],
  };

  setModalVisible(visible: boolean) {
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
              Alert.alert("Modal has been closed by deez nuts.");
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
                  position: "absolute",
                  // margin: 50
                }}
              >
                <Text style={styles.formtitle}>Add to Playroll</Text>
                <View style={styles.modaldata}>
                  <Image
                    style={{ width: 200, height: 200, borderRadius: 5 }}
                    source={{
                      uri:
                        "https://thefader-res.cloudinary.com/private_images/w_1260,c_limit,f_auto,q_auto:best/C9H8-PWUIAAzbQ2_j7a67b/full-credits-kendrick-lamar-damn.jpg",
                    }}
                  />
                </View>
                <Text style={styles.welcome}>Hip-Hop</Text>
                <View
                  style={{
                    width: 200,
                    height: 100,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: 0,
                  }}
                >
                  <SegmentedControlIOS
                    tintColor={"#6A0070"}
                    values={["Popular", "Random"]}
                    selectedIndex={this.state.playFrom}
                    onChange={event => {
                      this.setState({
                        selectedIndex: event.nativeEvent.selectedSegmentIndex,
                      });
                    }}
                  />
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <TextInput
                      ref={el => {
                        // this.inputRefs.name = el;
                      }}
                      placeholder={"deez nuts"}
                      returnKeyType="next"
                      enablesReturnKeyAutomatically
                      onSubmitEditing={() => {
                        // this.inputRefs.picker.togglePicker();
                      }}
                      style={pickerStyle.inputIOS}
                      blurOnSubmit={false}
                    />
                    <RNPickerSelect
                      placeholder={{
                        label: "Minutes...",
                        value: null,
                      }}
                      items={this.state.items}
                      onValueChange={value => {
                        this.setState({
                          favColor: value,
                        });
                      }}
                      // onUpArrow={() => {
                      //     this.inputRefs.name.focus();
                      // }}
                      // onDownArrow={() => {
                      //     this.inputRefs.picker2.togglePicker();
                      // }}
                      style={pickerStyle} //weird
                      value={this.state.favColor}
                      // ref={(el) => {
                      //     this.inputRefs.picker = el;
                      // }}
                    />
                  </View>
                </View>

                <TouchableHighlight
                  style={styles.formfooter}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text>Close</Text>
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
