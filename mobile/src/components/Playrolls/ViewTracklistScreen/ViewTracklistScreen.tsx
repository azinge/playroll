/**
 * Application component for Playroll mobile application.
 */

import React from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import {
  Card,
  Button,
  Header,
  Icon,
  ListItem,
  Image,
  Divider,
} from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';

import {
  GeneratePlaylistMutation,
  GetTracklistQuery,
} from '../../../graphql/requests/Tracklist';

import styles from './ViewTracklistScreen.styles';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import NavigationService from '../../../services/NavigationService';
import FooterButton from '../../shared/Buttons/FooterButton';
import { CurrentUserSpotifyStatusQuery } from '../../../graphql/requests/Spotify';
import { Linking } from 'expo';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class ViewTracklistScreen extends React.Component<Props, State> {
  render() {
    const { navigation } = this.props;
    const tracklistID = navigation.getParam('tracklistID', '');
    const playlistName = navigation.getParam('playrollName', '');
    const extractTracklist = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return null;
      }
      return data.private.currentUserTracklist;
    };
    return (
      <GetTracklistQuery variables={{ id: tracklistID }}>
        {({ loading, error, data }) => {
          const success = !loading && !error;
          const tracklist = extractTracklist(data);
          if (loading || error) {
            return <SubScreenContainer title='View Tracklist' />;
          }

          return (
            <View style={{ flex: 1 }}>
              <SubScreenContainer
                contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
                title='View Tracklist'
                flatList={success}
                data={tracklist.compiledRolls}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                  console.log('ROLL NAME: ' + JSON.stringify(item));
                  const rollSource =
                    item &&
                    item.roll &&
                    item.roll.data &&
                    item.roll.data.sources &&
                    item.roll.data.sources.length > 0 &&
                    item.roll.data.sources[0];
                  return (
                    <Card
                      key={item.id}
                      containerStyle={{
                        borderRadius: 20,
                        // marginTop: 0,
                        borderColor: 'white',
                        shadowColor: 'gray',
                        shadowOffset: {
                          width: 2,
                          height: 3,
                        },
                        shadowRadius: 5,
                        shadowOpacity: 0.5,
                      }}
                      //   image={{ uri: rollSource.cover }}
                      //   title={rollSource.name}
                    >
                      <View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Image
                            style={{
                              height: 65,
                              width: 65,
                              borderRadius: 65 / 2,
                            }}
                            source={{ uri: rollSource.cover }}
                          />
                          <Text
                            numberOfLines={1}
                            style={{
                              textAlignVertical: 'center',
                              marginLeft: 15,
                              fontSize: 28,
                              fontWeight: 'bold',
                            }}
                          >
                            {rollSource.name}
                          </Text>
                        </View>
                        <Divider style={{ marginVertical: 10 }} />
                        {item.data.tracks.map(track => {
                          return (
                            track && (
                              <ListItem
                                containerStyle={{
                                  margin: 0,
                                  padding: 0,
                                }}
                                key={track.providerID}
                                title={track.name}
                                titleStyle={{ fontSize: 14 }}
                                leftIcon={
                                  <Icon
                                    color='purple'
                                    type='material'
                                    name='audiotrack'
                                  />
                                }
                              />
                            )
                          );
                        })}
                      </View>
                    </Card>
                  );
                }}
              />
              {this.renderGeneratePlaylistButton(tracklistID, playlistName)}
              <CurrentUserSpotifyStatusQuery>
                {({ loading, error, data }) => {
                  const authenticated =
                    data &&
                    data.private &&
                    data.private.currentUserSpotifyStatus;
                  if (loading) {
                    return <ActivityIndicator style={{ marginTop: 20 }} />;
                  }
                  if (authenticated !== 'authenticated') {
                    return (
                      <FooterButton
                        title={'Connect Spotify'}
                        onPress={() => {
                          NavigationService.navigate('ConnectSpotify');
                        }}
                      />
                    );
                  } else {
                    return (
                      <GeneratePlaylistMutation
                        variables={{
                          tracklistID,
                          playlistName,
                        }}
                        onCompleted={data => {
                          if (
                            data &&
                            data.private &&
                            data.private.generatePlaylist
                          ) {
                            Linking.openURL(
                              `https://open.spotify.com/playlist/${
                                data.private.generatePlaylist
                              }`
                            );
                          }
                        }}
                      >
                        {(generatePlaylist, { loading }) => (
                          <FooterButton
                            title={'Generate Playlist'}
                            onPress={() => {
                              generatePlaylist();
                            }}
                            loading={loading}
                          />
                        )}
                      </GeneratePlaylistMutation>
                    );
                  }
                }}
              </CurrentUserSpotifyStatusQuery>
            </View>
          );
        }}
      </GetTracklistQuery>
      // </SafeAreaView>
    );
  }

  renderGeneratePlaylistButton(tracklistID, playlistName) {
    return (
      <GeneratePlaylistMutation
        variables={{
          tracklistID,
          playlistName,
        }}
      >
        {generatePlaylist => (
          <FooterButton
            title={'Generate Tracklist'}
            onPress={() => {
              generatePlaylist();
            }}
          />
        )}
      </GeneratePlaylistMutation>
    );
  }
}
