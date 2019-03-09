/**
 * Application component for Playroll mobile application.
 */

import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { 
  Card, 
  Button,
  Header,
  Icon,
} from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';

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
      // SafeAreaView causes a large margin/padding at the top, so we're avoiding it, using bottomMargin instead
      // https://facebook.github.io/react-native/docs/safeareaview
      // <SafeAreaView style={styles.screenContainer} forceInset={{ top: 'never' }}>
        <GetTracklistQuery variables={{ id: tracklistID }}>
          {({ loading, error, data }) => {
            return (
              <View style={styles.tracklistView}>

                {/* Header */}
                <Header
                  backgroundColor="purple"
                  leftComponent={
                    <Icon
                      name="arrow-back"
                      color="white"
                      onPress={() =>
                        this.props.navigation && this.props.navigation.goBack(null)
                      }
                      underlayColor="purple"
                    />
                  }
                  centerComponent={{
                    text: `${playlistName}`,
                    style: styles.headerCenterComponent,
                  }}
                />

                {/* Scroll View Content */}
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
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
      // </SafeAreaView>
    );
  }
}
