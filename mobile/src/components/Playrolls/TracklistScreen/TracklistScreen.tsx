/**
 * Application component for Playroll mobile application.
 */

import React from "react";
import { Text, View, Image, ScrollView, SafeAreaView } from "react-native";
import { Card, Button } from "react-native-elements";
import { NavigationScreenProp } from "react-navigation";

import {
  GeneratePlaylistMutation,
  GetTracklistQuery,
} from "../../../graphql/requests/Tracklist";

import styles from "./TracklistScreen.styles";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class TracklistScreen extends React.Component<Props, State> {
  render() {
    const nav = this.props.navigation;
    const tracklistID =
      nav && nav.state && nav.state.params && nav.state.params.tracklistID;
    const playlistName =
      nav && nav.state && nav.state.params && nav.state.params.playrollName;
    return (
      <SafeAreaView style={styles.screenContainer}>
        <GetTracklistQuery variables={{ id: tracklistID }}>
          {({ loading, error, data }) => {
            return (
              <View style={{ flex: 1, marginTop: 20 }}>
                <View>
                  <Text>{`${playlistName} - Tracklist`}</Text>
                  <GeneratePlaylistMutation
                    variables={{
                      tracklistID,
                      playlistName,
                    }}
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
