/**
 * ViewProfileScreen
 */

import * as React from "react";
import ProfileScreenContainer from "../../shared/Containers/ProfileScreenContainer";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from "react-native";
import { GetCurrentUserQuery } from "../../../graphql/requests/User";
import PlayrollCard from "../../shared/Cards/PlayrollCard";
import { Button, ListItem } from "react-native-elements";
import { Playroll } from "../../../graphql/types";
import Icons from "../../../themes/Icons";
import { LIST_CURRENT_USER_PLAYROLLS } from "../../../graphql/requests/Playroll/ListCurrentUserPlayrollsQuery";
import PlaceholderList from "../../shared/Lists/PlaceholderList";

import {
  ListCurrentUserPlayrollsQuery,
  CreatePlayrollMutation
} from "../../../graphql/requests/Playroll/";
import NavigationService from "../../../services/NavigationService";

export default class ViewProfileScreen extends React.Component {
  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ marginHorizontal: 20, marginBottom: 5, marginTop: 10 }}
      onPress={() =>
        NavigationService.navigate("ViewPlayroll", { playroll: item })
      }
    >
      <ListItem
        title={item.name}
        titleStyle={{ color: "purple" }}
        subtitle={item.type}
        leftAvatar={{
          source: { uri: item.cover }
        }}
        containerStyle={{
          borderColor: "white",
          borderRadius: 10,
          shadowColor: "gray",
          shadowOffset: {
            width: 2,
            height: 1
          },
          shadowRadius: 3,
          shadowOpacity: 0.2,
          overflow: "visible"
        }}
      />
    </TouchableOpacity>
  );

  render() {
    const extractPlayrolls = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listCurrentUserPlayrolls;
    };
    return (
      <View style={{ flex: 1 }}>
        <GetCurrentUserQuery>
          {({ loading, error, data }) => {
            if (loading || error || Object.keys(data).length === 0) {
              return <ProfileScreenContainer title="My Public Profile" />;
            }
            const currentUser = (data && data.private.currentUser) || {};
            return (
              <ProfileScreenContainer
                title="My Public Profile"
                image={{ uri: currentUser.avatar }}
                local
                name={currentUser.name}
              />
            );
          }}
        </GetCurrentUserQuery>
      </View>
    );
  }
}
