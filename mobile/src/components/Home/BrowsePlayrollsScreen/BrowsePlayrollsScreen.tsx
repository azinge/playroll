/**
 * Application component for Playroll mobile application.
 */

import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Card, ListItem, Button, Icon, Header } from "react-native-elements";
import { NavigationScreenProp } from "react-navigation";

import { GenerateTracklistMutation } from "../../../graphql/requests/Tracklist/";
import { DeleteRollMutation } from "../../../graphql/requests/Roll";
import {
  ListCurrentUserPlayrollsQuery,
  CreatePlayrollMutation,
} from "../../../graphql/requests/Playroll/";
import { GetCurrentUserQuery } from "../../../graphql/requests/User";

import { LIST_CURRENT_USER_PLAYROLLS } from "../../../graphql/requests/Playroll/ListCurrentUserPlayrollsQuery";

import styles from "./BrowsePlayrollsScreen.styles";
import PlayrollCard from "./PlayrollCard";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  addPlayrollName: string;
}

export default class BrowsePlayrollsScreen extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      addPlayrollName: "",
    };
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <GetCurrentUserQuery>
          {({ data }) => {
            if (!data || !data.currentUser) {
              return (
                <Header
                  backgroundColor="purple"
                  centerComponent={{
                    text: "Playrolls",
                    style: { color: "#fff", fontSize: 20 },
                  }}
                  rightComponent={
                    <Icon name="add" color="grey" underlayColor="purple" />
                  }
                />
              );
            }
            console.log(data.currentUser.id);
            return (
              <CreatePlayrollMutation
                variables={{
                  input: { name: "New Playroll", userID: data.currentUser.id },
                }}
                onCompleted={data =>
                  this.props &&
                  this.props.navigation &&
                  this.props.navigation.navigate("Playrolls", {
                    playroll: data.createPlayroll,
                  })
                }
                refetchQueries={[LIST_CURRENT_USER_PLAYROLLS]}
              >
                {(createPlayroll, { data }) => {
                  return (
                    <Header
                      backgroundColor="purple"
                      centerComponent={{
                        text: "Playrolls",
                        style: { color: "#fff", fontSize: 20 },
                      }}
                      rightComponent={
                        <Icon
                          name="add"
                          color="white"
                          underlayColor="purple"
                          onPress={() => createPlayroll()}
                        />
                      }
                    />
                  );
                }}
              </CreatePlayrollMutation>
            );
          }}
        </GetCurrentUserQuery>

        <ListCurrentUserPlayrollsQuery>
          {({ loading, error, data }) => {
            error && console.warn(error);
            return (
              <View style={{ flex: 1 }}>
                {!loading && !error && (
                  <ScrollView>
                    {data &&
                      data.listCurrentUserPlayrolls &&
                      data.listCurrentUserPlayrolls.map(playroll => {
                        console.log(playroll);
                        return (
                          <PlayrollCard
                            playroll={playroll}
                            editPlayroll={() => {
                              this.props.navigation &&
                                this.props.navigation.navigate("Playrolls", {
                                  managePlayroll: "Manage Playroll",
                                  playroll,
                                });
                            }}
                            key={playroll.id}
                          />
                        );
                        // return (

                        //   <Card
                        //     title={playroll.name}
                        //     key={playroll.id}
                        //   >
                        //     <GenerateTracklistMutation
                        //       variables={{
                        //         playrollID: playroll.id,
                        //       }}
                        //       onCompleted={data => {
                        //         const { navigate } = this.props.navigation;
                        //         navigate("Tracklist", {
                        //           tracklistID:
                        //             data &&
                        //             data.generateTracklist &&
                        //             data.generateTracklist.id,
                        //           playrollName: playroll.name,
                        //         });
                        //       }}
                        //       refetchQueries={[LIST_PLAYROLLS]}
                        //     >
                        //       {(generateTracklist, { data }) => (
                        //         <Button
                        //           title="Generate Tracklist"
                        //           onPress={() => {
                        //             generateTracklist();
                        //           }}
                        //         />
                        //       )}
                        //     </GenerateTracklistMutation>
                        //     {/* <Button
                        //       onPress={() => {
                        //         console.log(playroll.tracklists);
                        //         const tracklist =
                        //           playroll.tracklists[
                        //             playroll.tracklists.length - 1
                        //           ];

                        //         if (tracklist) {
                        //           const tracklistID = tracklist.id;
                        //           const { navigate } = this.props.navigation;
                        //           navigate("Tracklist", {
                        //             tracklistID,
                        //             playrollName: playroll.name,
                        //           });
                        //         }
                        //       }}
                        //       title="Go to Tracklist"
                        //     /> */}
                        //     <DeletePlayrollMutation
                        //       variables={{
                        //         id: playroll.id,
                        //       }}
                        //       refetchQueries={[LIST_PLAYROLLS]}
                        //     >
                        //       {(deletePlayroll, { data }) => (
                        //         <Button
                        //           title="Delete Playroll"
                        //           onPress={() => {
                        //             deletePlayroll();
                        //           }}
                        //         />
                        //       )}
                        //     </DeletePlayrollMutation>

                        //     {playroll.rolls.map(roll => {
                        //       const source =
                        //         roll &&
                        //         roll.data &&
                        //         roll.data.sources &&
                        //         roll.data.sources[0];
                        //       console.log(source);
                        //       return (
                        //         source && (
                        //           <View key={roll.id}>
                        //             <Image
                        //               style={{ width: 100, height: 100 }}
                        //               source={{ uri: source.cover }}
                        //             />
                        //             <Text>{source.name}</Text>
                        //             <Text>{source.type}</Text>
                        //             <DeleteRollMutation
                        //               variables={{
                        //                 id: roll.id,
                        //               }}
                        //               refetchQueries={[LIST_PLAYROLLS]}
                        //             >
                        //               {(deleteRoll, { data }) => (
                        //                 <Button
                        //                   title="Delete Roll"
                        //                   onPress={() => {
                        //                     deleteRoll();
                        //                   }}
                        //                 />
                        //               )}
                        //             </DeleteRollMutation>
                        //           </View>
                        //         )
                        //       );
                        //     })}
                        //     <Button
                        //       onPress={() => {
                        //         const { navigate } = this.props.navigation;
                        //         navigate("Search", {
                        //           playrollID: playroll.id,
                        //         });
                        //       }}
                        //       title="Add Roll"
                        //     />
                        //   </Card>
                        // );
                      })}
                    {/* <TextInput
                      style={{
                        height: 40,
                        borderColor: "gray",
                        borderWidth: 1,
                      }}
                      onChangeText={text =>
                        this.setState({ addPlayrollName: text })
                      }
                      value={this.state.addPlayrollName}
                    /> */}
                  </ScrollView>
                )}
              </View>
            );
          }}
        </ListCurrentUserPlayrollsQuery>
      </View>
    );
  }
}
