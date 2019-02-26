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
              <View style={styles.tracklistView}>

                {/* Header */}
                <View style={styles.headerView}>
                  <View style={styles.titleView}>
                    <LinearGradient colors={["#761477", "#954687"]}>
                      <View style={styles.innerTitleView}>
                        <Text style={styles.titleText}>{`${playlistName}`}</Text>
                      </View>
                    </LinearGradient>
                  </View>
                </View>

                {/* Scroll View Content */}
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                  {data &&
                    data.tracklist &&
                    data.tracklist.compiledRolls &&
                    data.tracklist.compiledRolls.map(compiledRoll => {
                      console.log("TRACKLIST SCREEN > render/return > ScrollView > compiledRoll: ")
                      console.log(compiledRoll)
                      return (
                        compiledRoll &&
                        compiledRoll.data &&
                        compiledRoll.data.tracks &&
                        compiledRoll.data.tracks.length > 0 && (
                          <Card
                            key={compiledRoll.id}
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

                {/* "Generate Playlist" Button */}
                <View style={styles.footerView}>
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

              </View>
            );
          }}
        </GetTracklistQuery>
      </SafeAreaView>
    );
  }
}
