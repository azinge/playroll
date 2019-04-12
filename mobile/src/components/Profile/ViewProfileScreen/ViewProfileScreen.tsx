/**
 * ViewProfileScreen
 */

import * as React from "react";
import SubScreenContainer from "../../shared/Containers/SubScreenContainer";
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
      onPress={() => NavigationService.navigate("ViewPlayroll", {})}
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
              return <SubScreenContainer title="My Public Profile" modal />;
            }
            const currentUser = (data && data.private.currentUser) || {};
            return (
              <ProfileScreenContainer title="My Public Profile" modal>
                <View style={{ alignItems: "center" }}>
                  <View style={{ alignItems: "center", marginVertical: 20 }}>
                    <Image
                      source={{
                        uri: currentUser.avatar
                      }}
                      style={{ height: 100, width: 100, borderRadius: 5 }}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#993399"
                      }}
                    >
                      {currentUser.name}
                    </Text>
                  </View>
                </View>
                <ListCurrentUserPlayrollsQuery>
                  {({ loading, error, data }) => {
                    const playrolls = extractPlayrolls(data);
                    const success = !loading && !error;
                    return (
                      <View
                        style={{
                          flex: 1
                          // TODO(ianlizzo): Fix this pls
                          // marginBottom: 30,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <FlatList
                            data={playrolls}
                            keyExtractor={(item, index) => item.id}
                            renderItem={this._renderItem}
                          />
                          {loading && (
                            <ActivityIndicator
                              color={"gray"}
                              style={{ paddingTop: 50 }}
                            />
                          )}
                          {error && (
                            <Text style={{ paddingTop: 50 }}>
                              Error Loading Playrolls
                            </Text>
                          )}
                          {/* <View style={{ margin: 10 }} /> */}
                          {playrolls.length === 0 && (
                            <Text> No Playrolls added</Text>
                          )}
                        </View>
                      </View>
                    );
                  }}
                </ListCurrentUserPlayrollsQuery>
              </ProfileScreenContainer>
            );
          }}
        </GetCurrentUserQuery>
      </View>
    );
  }
}
