/**
 * Application component for Playroll mobile application.
 */
import React from "react";
// import CreateModal from "./CreateModal/CreateModal";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { Container, Header, Item, Input, Button, Text } from "native-base"; //NUKE THIS SHIT

import styles from "./Create.styles";

export interface Props {}

interface State {
  modalVisible: boolean;
}

export default class Create extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <View style={{ backgroundColor: "#6A0070", flexDirection: "row" }}>
          <Text style={styles.headline}>Mai is best </Text>
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
        {/* <CreateModal
          setModalVisible={this.setModalVisible}
          modalVisible={this.state.modalVisible}
        /> */}
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
      </View>
    );
  }
}
