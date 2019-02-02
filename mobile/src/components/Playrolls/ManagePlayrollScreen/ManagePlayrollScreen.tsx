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
import styles, { rawStyles } from "./ManagePlayrollScreen.styles";
import Search from "../../Main/Search";
import { Playroll, MusicSource } from "../../../graphql/types";

import {
  GetPlayrollQuery,
  GET_PLAYROLL_QUERY,
} from "../../../graphql/requests/Playroll/GetPlayrollQuery";
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
    const playroll: Playroll =
      this.props.navigation && this.props.navigation.getParam("playroll");
    return (
      <GetPlayrollQuery
        query={GET_PLAYROLL_QUERY}
        variables={{ id: playroll.id }}
      >
        {({ loading, error, data }) => {
          const playroll: Playroll = (data && data.playroll) || {};
          return (
            <View style={styles.screenContainer}>
              {this.renderHeader()}
              {this.renderEditingBar(playroll)}
              {this.renderSearchMusic(playroll)}
              {this.renderBottomBar(playroll)}
            </View>
          );
        }}
      </GetPlayrollQuery>
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
            onPress={() => navigation && navigation.goBack(null)}
            underlayColor="purple"
          />
        }
        centerComponent={{
          text: managePlayroll,
          style: styles.headerCenterComponent,
        }}
        rightComponent={
          <Icon
            name="save"
            color="white"
            onPress={() => navigation && navigation.navigate("Tracklist")}
          />
        }
      />
    );
  }
  renderEditingBar(playroll: Playroll) {
    return (
      <View style={styles.editingBarContainer}>
        <Image
          style={rawStyles.editingBarImage}
          source={require("../../../assets/new_playroll.png")}
        />
        <UpdatePlayrollMutation
          mutation={UPDATE_PLAYROLL_MUTATION}
          variables={{
            id: playroll.id,
            input: {
              name: this.state.editPlayrollName,
              userID: playroll.userID,
            },
          }}
          refetchQueries={["GET_PLAYROLL"]}
        >
          {(updatePlayroll, { data }) => (
            <View style={styles.editingBarNameContainer}>
              <TextInput
                selectionColor={"purple"}
                placeholder="Name Your Playroll"
                placeholderTextColor="lightgrey"
                style={styles.editingBarNameInput}
                onChangeText={name => this.setState({ editPlayrollName: name })}
                onSubmitEditing={() => updatePlayroll()}
              >
                {playroll.name}
              </TextInput>
              <View style={styles.horizontalRule} />
              <TextInput
                selectionColor={"purple"}
                placeholder="#Existential #Chill #Help"
                placeholderTextColor="lightgrey"
                style={styles.editingBarTagInput}
              />
            </View>
          )}
        </UpdatePlayrollMutation>
      </View>
    );
  }

  renderSearchMusic(playroll: Playroll) {
    return (
      <View style={styles.searchMusicContainer}>
        <Search playrollID={playroll.id} header={false} />
      </View>
    );
  }

  renderBottomBar(playroll: Playroll) {
    const iconMap: { [index: string]: string } = {
      Track: "audiotrack",
      Album: "album",
      Artist: "mic",
      Playlist: "playlist-play",
    };
    return (
      <View style={styles.bottomBarContainer}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.bottomBarScrollViewStyle}
        >
          {playroll.rolls &&
            playroll.rolls.map((roll, idx) => {
              const val: MusicSource =
                (roll.data && roll.data.sources && roll.data.sources[0]) || {};
              return (
                <View style={styles.bottomBarItemContainer} key={idx}>
                  <Image
                    style={rawStyles.bottomBarItemImage}
                    source={{ uri: val.cover }}
                  />
                  {val.type && (
                    <View style={styles.bottomBarIconContainer}>
                      {
                        <Icon
                          name={iconMap[val.type] || iconMap["Track"]}
                          size={20}
                          color="purple"
                          onPress={() =>
                            this.props.navigation &&
                            this.props.navigation.goBack(null)
                          }
                          underlayColor="purple"
                        />
                      }
                    </View>
                  )}
                </View>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}
