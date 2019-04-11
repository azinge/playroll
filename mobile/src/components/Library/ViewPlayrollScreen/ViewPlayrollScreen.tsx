/**
 * ViewPlayrollScreen
 */

import * as React from "react";
import { View, TextInput, ScrollView, Image } from "react-native";
import { Header, Icon } from "react-native-elements";
import { NavigationScreenProp } from "react-navigation";
import styles, { rawStyles } from "./ViewPlayrollScreen.styles";
import { Playroll, MusicSource } from "../../../graphql/types";

import {
  UpdatePlayrollMutation,
  GetCurrentUserPlayrollQuery
} from "../../../graphql/requests/Playroll";
import { GenerateTracklistMutation } from "../../../graphql/requests/Tracklist";

import { GET_CURRENT_USER_PLAYROLL } from "../../../graphql/requests/Playroll/GetCurrentUserPlayrollQuery";
import SubScreenContainer from "../../shared/Containers/SubScreenContainer";
import SubScreenHeader from "../../shared/Headers/SubScreenHeader";
import Icons from "../../../themes/Icons";
import NavigationService from "../../../services/NavigationService";
import RollList from "../../shared/Lists/RollList";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  editPlayrollName: string;
}

export default class ViewPlayrollScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editPlayrollName: ""
    };
    this.renderHeader = this.renderHeader.bind(this);
  }

  render() {
    const playrollID: number =
      (this.props &&
        this.props.navigation &&
        this.props.navigation.getParam("playroll").id) ||
      {};
    return (
      <SubScreenContainer
        title="View Playroll"
        renderHeader={this.renderHeader}
      >
        <GetCurrentUserPlayrollQuery variables={{ id: playrollID }}>
          {({ loading, error, data, client: { cache } }) => {
            const playroll: any =
              (data && data.private && data.private.currentUserPlayroll) || {};
            return (
              <View style={styles.screenContainer}>
                {this.renderEditingBar(playroll)}
                {this.renderRolls(playroll)}
              </View>
            );
          }}
        </GetCurrentUserPlayrollQuery>
      </SubScreenContainer>
    );
  }
  renderHeader() {
    const playroll: Playroll =
      (this.props &&
        this.props.navigation &&
        this.props.navigation.getParam("playroll")) ||
      {};

    const addRollIcon = {
      ...Icons.addIcon,
      onPress: () => NavigationService.navigate("EditRoll")
    };
    const editPlayrollIcon = {
      ...Icons.settingsIcon,
      onPress: () =>
        NavigationService.navigate("EditPlayroll", {
          managePlayroll: "View Playroll",
          playroll
        })
    };
    return (
      <SubScreenHeader
        title={"View Playroll"}
        icons={[addRollIcon, editPlayrollIcon, Icons.menuIcon]}
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
          variables={{
            id: playroll.id,
            input: {
              name: this.state.editPlayrollName,
              userID: playroll.userID
            }
          }}
          refetchQueries={[GET_CURRENT_USER_PLAYROLL]}
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
  renderRolls(playroll) {
    return <RollList rolls={playroll.rolls || []} />;
  }
}
