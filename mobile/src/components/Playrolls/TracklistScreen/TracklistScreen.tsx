/**
 * Application component for Playroll mobile application.
 */

import React from 'react';
import { Text, View, Image, ScrollView, SafeAreaView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { LinearGradient } from "expo";

import {
  GeneratePlaylistMutation,
  GetTracklistQuery,
} from '../../../graphql/requests/Tracklist';

import styles from './TracklistScreen.styles';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

// TODO: re-style this screen
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
              // TODO: possibly remove inline styles
              <View style={{ flex: 1, marginTop: 20 }}>

                {/* Header */}
                <View style={styles.headerView}>
                  <View style={styles.titleView}>
                    <LinearGradient colors={["#761477", "#954687"]}>
                      <View style={styles.innerTitleView}>
                        <Text style={styles.titleText}>{`${playlistName}`}</Text>
                      </View>
                    </LinearGradient>
                  </View>
                  <GeneratePlaylistMutation
                    variables={{
                      tracklistID,
                      playlistName,
                    }}
                  >
                    {(generatePlaylist, { data }) => (
                      <Button
                        title='Generate Playlist'
                        containerStyle={styles.genPlaylistButton}
                        onPress={() => {
                          generatePlaylist();
                        }}
                      />
                    )}
                  </GeneratePlaylistMutation>
                </View>

                {/* Scroll View Content */}
                <ScrollView style={{ flex: 1, zIndex: 0 }} contentContainerStyle={{ zIndex: 0 }}>
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
                            titleStyle={styles.rollCardTitle}
                            containerStyle={styles.rollCardContainer}
                          >
                            {compiledRoll.data.tracks.map(track => {
                              return (
                                track && (
                                  <View style={styles.trackView} key={track.providerID}>
                                    <Image
                                      style={styles.trackImage}
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

                {/* TODO: Move "Generate Playlist" Button into a Fixed Footer */}
                {/* <View style={styles.footerView}>
                  <Text>HELLO</Text>
                  <GeneratePlaylistMutation
                    variables={{
                      tracklistID,
                      playlistName,
                    }}
                  >
                    {(generatePlaylist, { data }) => (
                      <Button
                        title='Generate Playlist'
                        containerStyle={styles.genPlaylistButton}
                        onPress={() => {
                          generatePlaylist();
                        }}
                      />
                    )}
                  </GeneratePlaylistMutation>
                </View> */}

              </View>
            );
          }}
        </GetTracklistQuery>
      </SafeAreaView>
    );
  }
}
