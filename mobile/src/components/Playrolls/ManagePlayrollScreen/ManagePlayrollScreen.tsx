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
import { NavigationScreenProp } from "react-navigation";
import styles from "./ManagePlayrollScreen.styles";
import Search from "../../Main/Search";

import {
  UpdatePlayrollMutation,
  UPDATE_PLAYROLL_MUTATION,
} from "../../../graphql/requests/Playroll/UpdatePlayrollMutation";

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
    const { navigation } = this.props;
    const managePlayroll =
      navigation && navigation.getParam("managePlayroll", "New Playroll");
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
          text: managePlayroll,
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
    const { navigation } = this.props;
    const playrollName =
      navigation && navigation.getParam("playrollName") == ""
        ? "No name"
        : navigation &&
          navigation.getParam("playrollName", "Name your playroll");
    const playrollID =
      navigation && navigation.getParam("playrollID", "Name your playroll");

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
        <UpdatePlayrollMutation
          mutation={UPDATE_PLAYROLL_MUTATION}
          variables={{
            id: playrollID,
            input: { name: this.state.editPlayrollName, userID: 0 },
          }}
          refetchQueries={["GET_PLAYROLLS"]}
        >
          {(updatePlayroll, { data }) => (
            <View style={{ flex: 1 }}>
              <TextInput
                selectionColor={"purple"}
                placeholder={playrollName}
                placeholderTextColor="lightgrey"
                style={{ fontSize: 20 }}
                onChangeText={name => this.setState({ editPlayrollName: name })}
                onSubmitEditing={() => updatePlayroll()}
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
          )}
        </UpdatePlayrollMutation>
      </View>
    );
  }

  renderSearchMusic() {
    const { navigation } = this.props;
    const playrollID = navigation && navigation.getParam("playrollID", -1);
    return <Search playrollID={playrollID} header={false} />;
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
