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
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { Query } from "react-apollo";
import { createStackNavigator, createAppContainer } from "react-navigation";

import {
  GenerateTracklistMutation,
  GENERATE_TRACKLIST_MUTATION,
} from "../../../graphql/requests/Tracklist/";
import {
  DeleteRollMutation,
  DELETE_ROLL_MUTATION,
} from "../../../graphql/requests/Roll";
import {
  DeletePlayrollMutation,
  DELETE_PLAYROLL_MUTATION,
  CreatePlayrollMutation,
  CREATE_PLAYROLL_MUTATION,
  ListPlayrollsQuery,
  LIST_PLAYROLLS_QUERY,
} from "../../../graphql/requests/Playroll/";

import styles from "./PlayrollsScreen.styles";
import PlayrollCard from "./PlayrollCard";

export interface Props {}

interface State {
  addPlayrollName: string;
}

export default class PlayrollsScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      addPlayrollName: "",
    };
  }
  render() {
    return (
      <ListPlayrollsQuery query={LIST_PLAYROLLS_QUERY}>
        {({ loading, error, data }) => {
          error && console.warn(error);
          return (
            <View style={{ flex: 1, marginTop: 20 }}>
              <View>
                <Text style={styles.headline}>Playrolls</Text>
              </View>
              {!loading && !error && (
                <ScrollView>
                  {data &&
                    data.listPlayrolls &&
                    data.listPlayrolls.map(playroll => {
                      console.log(playroll);
                      return (
                        <PlayrollCard
                          playroll={playroll}
                          editPlayroll={() => {
                            this.props.navigation.navigate("Tracklist");
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
                      //       mutation={GENERATE_TRACKLIST_MUTATION}
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
                      //       refetchQueries={["GET_PLAYROLLS"]}
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
                      //       mutation={DELETE_PLAYROLL_MUTATION}
                      //       variables={{
                      //         id: playroll.id,
                      //       }}
                      //       refetchQueries={["GET_PLAYROLLS"]}
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
                      //               mutation={DELETE_ROLL_MUTATION}
                      //               variables={{
                      //                 id: roll.id,
                      //               }}
                      //               refetchQueries={["GET_PLAYROLLS"]}
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
                  <TextInput
                    style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
                    onChangeText={text =>
                      this.setState({ addPlayrollName: text })
                    }
                    value={this.state.addPlayrollName}
                  />
                  <CreatePlayrollMutation
                    mutation={CREATE_PLAYROLL_MUTATION}
                    variables={{
                      input: { userID: 1, name: this.state.addPlayrollName },
                    }}
                    refetchQueries={["GET_PLAYROLLS"]}
                  >
                    {(createPlayroll, { data }) => (
                      <Button
                        title="Add Playroll"
                        onPress={() => {
                          createPlayroll();
                        }}
                      />
                    )}
                  </CreatePlayrollMutation>
                </ScrollView>
              )}
            </View>
          );
        }}
      </ListPlayrollsQuery>
    );
  }
}
