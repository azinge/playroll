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
  // Button,
  Alert,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { Query } from "react-apollo";
import { createStackNavigator, createAppContainer } from "react-navigation";

import {
  GENERATE_PLAYLIST_MUTATION,
  GeneratePlaylistMutation,
  GET_TRACKLIST_QUERY,
  GetTracklistQuery,
} from "../../../graphql/requests/Tracklist";

import styles from "./TracklistScreen.styles";

export default class TracklistScreen extends React.Component {
  render() {
    const nav = this.props.navigation;
    const tracklistID =
      nav && nav.state && nav.state.params && nav.state.params.tracklistID;
    const playlistName =
      nav && nav.state && nav.state.params && nav.state.params.playrollName;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <GetTracklistQuery
          query={GET_TRACKLIST_QUERY}
          variables={{ id: tracklistID }}
        >
          {({ loading, error, data }) => {
            console.log(loading, error, data);
            return (
              <View style={{ flex: 1, marginTop: 20 }}>
                <View>
                  <Text
                    style={styles.headline}
                  >{`${playlistName} - Tracklist`}</Text>
                  <GeneratePlaylistMutation
                    mutation={GENERATE_PLAYLIST_MUTATION}
                    variables={{
                      tracklistID,
                      playlistName,
                    }}
                    // onCompleted={data => {
                    //   console.log(data.generateTracklist);
                    // }
                  >
                    {(generatePlaylist, { data }) => (
                      <Button
                        title="Generate Playlist"
                        onPress={() => {
                          generatePlaylist();
                        }}
                      />
                    )}
                  </GeneratePlaylistMutation>
                </View>
                <ScrollView>
                  {data &&
                    data.tracklist &&
                    data.tracklist.compiledRolls &&
                    data.tracklist.compiledRolls.map(compiledRoll => {
                      return (
                        compiledRoll &&
                        compiledRoll.data &&
                        compiledRoll.data.tracks &&
                        compiledRoll.data.tracks.length > 0 && (
                          <Card
                            key={compiledRoll.id}
                            title={`Compiled roll #${compiledRoll.id}`}
                          >
                            {compiledRoll.data.tracks.map(track => {
                              console.log(track);
                              return (
                                track && (
                                  <View key={track.providerID}>
                                    <Image
                                      style={{ width: 100, height: 100 }}
                                      source={{ uri: track.cover }}
                                    />
                                    <Text>{track.name}</Text>
                                    {/* <Text>{track.type}</Text> */}
                                  </View>
                                )
                              );
                            })}
                          </Card>
                        )
                      );
                    })}
                </ScrollView>
              </View>
            );
          }}
        </GetTracklistQuery>
      </SafeAreaView>
    );
  }
}
