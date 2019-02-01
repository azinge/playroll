/**
 * ManagePlayrollScreen
 */

import * as React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { Header, Icon } from "react-native-elements";
import { HeaderBackButton, NavigationScreenProp } from "react-navigation";

import styles from "./ManagePlayrollScreen.styles";
import {
  CreatePlayrollMutation,
  CREATE_PLAYROLL_MUTATION,
} from "../../../graphql/requests/Playroll/";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  editPlayrollName: string;
}

const sampleData = [
  {
    cover: "https://i.scdn.co/image/b5570bc477a6ec868cb7d0cb05a11e6776f34e42",
    type: "Track",
    name: "Flamingo",
    creator: "Kero Kero Bonito",
  },
  {
    cover: "https://i.scdn.co/image/b5570bc477a6ec868cb7d0cb05a11e6776f34e42",
    type: "Album",
    name: "Flamingo",
    creator: "Kero Kero Bonito",
  },
  {
    cover: "https://i.scdn.co/image/b5570bc477a6ec868cb7d0cb05a11e6776f34e42",
    type: "Artist",
    name: "Flamingo",
    creator: "Kero Kero Bonito",
  },
  {
    cover: "https://i.scdn.co/image/b5570bc477a6ec868cb7d0cb05a11e6776f34e42",
    type: "Playlist",
    name: "Flamingo",
    creator: "Kero Kero Bonito",
  },
];

export default class ManagePlayrollScreen extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editPlayrollName: "",
    };
  }
  render() {
    return (
      <View style={styles.screenContainer}>
        {this.renderHeader()}
        {this.renderEditingBar()}
        {this.renderSearchMusic()}
        {this.renderBottomBar()}
      </View>
    );
  }
  renderHeader() {
    return (
      <Header
        backgroundColor="purple"
        leftComponent={
          <Icon
            name="arrow-back"
            color="white"
            onPress={() => this.props.navigation.goBack(null)}
            underlayColor="purple"
          />
        }
        centerComponent={{
          text: "Manage Playroll",
          style: { color: "#fff", fontSize: 20 },
        }}
        rightComponent={
          <Icon
            name="save"
            color="white"
            onPress={() => this.props.navigation.navigate("Tracklist")}
          />
        }
      />
    );
  }
  renderEditingBar() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 100,
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 65,
            height: 65,
            marginHorizontal: 20,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "lightgrey",
          }}
          source={{
            uri:
              "https://i.scdn.co/image/b5570bc477a6ec868cb7d0cb05a11e6776f34e42",
          }}
        />
        <View style={{ flex: 1 }}>
          <TextInput
            selectionColor={"purple"}
            placeholder="Songs to Exist To"
            placeholderTextColor="lightgrey"
            style={{ fontSize: 20 }}
          />
          <View
            style={{
              width: "75%",
              marginVertical: 5,
              borderBottomColor: "lightgrey",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <TextInput
            selectionColor={"purple"}
            placeholder="#Existential #Chill #Help"
            placeholderTextColor="lightgrey"
            style={{ fontSize: 15 }}
          />
        </View>
      </View>
    );
  }
  renderSearchMusic() {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#f5eeed",
            borderTopWidth: 1,
            borderTopColor: "lightgrey",
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey",
          }}
        >
          <Icon
            name={"search"}
            size={35}
            color="lightgrey"
            underlayColor="lightgrey"
            containerStyle={{ paddingHorizontal: 5 }}
          />
          <TextInput
            style={{ flex: 1 }}
            selectionColor={"purple"}
            placeholder="What are you looking for?"
          />
        </View>
        <View
          style={{
            margin: 10,
            flexDirection: "row",
          }}
        >
          <View style={{ paddingHorizontal: 7 }}>
            <Text
              style={{
                fontFamily: "Avenir",
                fontWeight: "bold",
                fontSize: 15,
                color: "#993399",
              }}
            >
              Popular
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 7,
              borderLeftColor: "grey",
              borderLeftWidth: 1,
            }}
          >
            <Text
              style={{
                fontFamily: "Avenir",
                fontSize: 15,
                color: "grey",
              }}
            >
              New
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 7,
              borderLeftColor: "grey",
              borderLeftWidth: 1,
            }}
          >
            <Text
              style={{
                fontFamily: "Avenir",
                fontSize: 15,
                color: "grey",
              }}
            >
              ABC
            </Text>
          </View>
        </View>
        <ScrollView>
          {sampleData.map((val, idx) => {
            return (
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                }}
                key={idx}
              >
                <View style={{ flexDirection: "row", width: "100%" }}>
                  <Image
                    style={{
                      width: 65,
                      height: 65,
                      marginHorizontal: 20,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: "lightgrey",
                    }}
                    source={{ uri: val.cover }}
                  />
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text
                      style={{
                        fontFamily: "Avenir",
                        fontSize: 17,
                        color: "purple",
                      }}
                      numberOfLines={2}
                    >
                      {val.name}
                    </Text>
                    {val.creator && (
                      <Text
                        style={{
                          fontFamily: "Avenir",
                          fontSize: 15,
                          color: "lightgrey",
                        }}
                        numberOfLines={2}
                      >
                        {val.creator}
                      </Text>
                    )}
                  </View>
                  <Icon
                    size={35}
                    name="more-vert"
                    color="lightgrey"
                    onPress={() => this.props.navigation.goBack(null)}
                  />
                </View>
                <View
                  style={{
                    width: "75%",
                    marginVertical: 10,
                    borderBottomColor: "lightgrey",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
  renderBottomBar() {
    const iconMap: { [index: string]: string } = {
      Track: "audiotrack",
      Album: "album",
      Artist: "mic",
      Playlist: "playlist-play",
    };
    return (
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ alignItems: "center" }}
        style={{
          position: "absolute",
          bottom: 0,
          height: 65,
          borderTopColor: "lightgrey",
          borderTopWidth: 1,
          width: "100%",
          backgroundColor: "#f5eeed",
          flex: 1,
        }}
      >
        {sampleData.map((val, idx) => {
          return (
            <View
              style={{
                height: 65,
                width: 65,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={idx}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "lightgrey",
                }}
                source={{ uri: val.cover }}
              />
              {val.type && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 4,
                    left: 4,
                    borderRadius: 5,
                    backgroundColor: "#FFFFFF9F",
                  }}
                >
                  {
                    <Icon
                      name={iconMap[val.type] || iconMap["Track"]}
                      size={20}
                      color="purple"
                      onPress={() => this.props.navigation.goBack(null)}
                      underlayColor="purple"
                    />
                  }
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    );
  }
}
