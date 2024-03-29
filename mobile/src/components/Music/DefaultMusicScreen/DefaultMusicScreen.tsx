/**
 * DefaultMusicScreen
 */

import * as React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import MainScreenContainer from '../../shared/Containers/MainScreenContainer';
import {
  CurrentUserSpotifyStatusQuery,
  ListSpotifyPlaylistsQuery,
} from '../../../graphql/requests/Spotify/';
import NavigationService from '../../../services/NavigationService';
import LinearGradient from 'expo'; // Only if no expo
import TouchableScale from 'expo';
import PlaceholderList from '../../shared/Lists/PlaceholderList';

export default class DefaultMusicScreen extends React.Component {
  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ marginHorizontal: 20, marginBottom: 5, marginTop: 10 }}
      onPress={() =>
        NavigationService.navigate('ViewSpotifyPlaylist', {
          playlist: item,
        })
      }
    >
      <ListItem
        title={item.name}
        titleStyle={{ color: 'purple' }}
        subtitle={item.type}
        leftAvatar={{
          source: { uri: item.cover },
        }}
        containerStyle={{
          borderColor: 'white',
          borderRadius: 10,
          shadowColor: 'gray',
          shadowOffset: {
            width: 2,
            height: 1,
          },
          shadowRadius: 4,
          shadowOpacity: 0.7,
          overflow: 'visible',
        }}
      />
    </TouchableOpacity>
  )

  _keyExtractor = (item, index) => item.providerID;

  render() {
    return (
      <MainScreenContainer>
        <View
          style={{
            overflow: 'visible',
            margin: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginBottom: 5,
              left: 2,
              alignItems: 'center',
            }}
          >
            <Icon
              type='material-community'
              name='spotify'
              color='black'
              size={30}
            />
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 24,
                left: 3,
              }}
            >
              Spotify
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: 'darkgray',
                  // fontWeight: 'bold',
                  fontSize: 18,
                  textAlignVertical: 'center',
                  textAlign: 'right',

                  // TODO: figure out a better way to position this
                }}
                onPress={() =>
                  NavigationService.navigate('BrowseSpotifyPlaylists')
                }
              >
                See all...
              </Text>
            </View>
          </View>
          <CurrentUserSpotifyStatusQuery>
            {({ loading, error, data }) => {
              const authenticated =
                data && data.private && data.private.currentUserSpotifyStatus;

              console.log('AUTHENTICATED: ' + authenticated);
              if (loading) {
                return <ActivityIndicator style={{ marginTop: 20 }} />;
              }
              if (authenticated === 'authenticated') {
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        NavigationService.navigate('BrowseSpotifySavedTracks')
                      }
                      style={{ marginHorizontal: 60, marginBottom: 5 }}
                    >
                      <ListItem
                        title={'Your Saved Tracks'}
                        titleStyle={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 17,
                          color: 'white',
                        }}
                        containerStyle={{
                          //   marginHorizontal: 30,
                          //   marginBottom: 10,
                          backgroundColor: 'purple',
                          borderColor: 'white',
                          borderRadius: 30,
                          shadowColor: 'gray',
                          shadowOffset: {
                            width: 5,
                            height: 1,
                          },
                          shadowRadius: 9,
                          shadowOpacity: 0.5,
                          overflow: 'visible',
                        }}
                      />
                    </TouchableOpacity>
                    <ListSpotifyPlaylistsQuery variables={{ count: 3 }}>
                      {({ loading, error, data }) => {
                        return (
                          <View style={{ marginBottom: 5, flex: 1 }}>
                            <FlatList
                              data={
                                data &&
                                data.private &&
                                data.private.listSpotifyPlaylists.slice(0, 3)
                              }
                              keyExtractor={this._keyExtractor}
                              renderItem={this._renderItem}
                            />
                          </View>
                        );
                      }}
                    </ListSpotifyPlaylistsQuery>
                  </View>
                );
              } else {
                return (
                  <TouchableOpacity
                    onPress={() => NavigationService.navigate('ConnectSpotify')}
                    style={{ marginHorizontal: 60, marginBottom: 5 }}
                  >
                    <ListItem
                      title={'Connect To Spotify'}
                      titleStyle={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 17,
                        color: 'white',
                      }}
                      containerStyle={{
                        //   marginHorizontal: 30,
                        //   marginBottom: 10,
                        backgroundColor: 'purple',
                        borderColor: 'white',
                        borderRadius: 30,
                        shadowColor: 'gray',
                        shadowOffset: {
                          width: 5,
                          height: 1,
                        },
                        shadowRadius: 9,
                        shadowOpacity: 0.5,
                        overflow: 'visible',
                      }}
                    />
                  </TouchableOpacity>
                );
              }
            }}
          </CurrentUserSpotifyStatusQuery>
        </View>
        <View
          style={{
            overflow: 'visible',
            margin: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginBottom: 5,
              left: 2,
              alignItems: 'center',
            }}
          >
            <Icon
              type='material-community'
              name='apple'
              color='black'
              size={30}
            />
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 24,
                left: 3,
              }}
            >
              Apple Music
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: 'darkgray',
                  // fontWeight: 'bold',
                  fontSize: 18,
                  textAlignVertical: 'center',
                  textAlign: 'right',

                  // TODO: figure out a better way to position this
                }}
                onPress={() =>
                  NavigationService.navigate('BrowseAppleMusicPlaylists')
                }
              >
                See all...
              </Text>
            </View>
          </View>
          <PlaceholderList numItems={3} overlayText={'Coming Soon...'} />
        </View>
        <View
          style={{
            overflow: 'visible',
            margin: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginBottom: 5,
              left: 2,
              alignItems: 'center',
            }}
          >
            <Icon
              type='material-community'
              name='youtube'
              color='black'
              size={30}
            />
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 24,
                left: 3,
              }}
            >
              YouTube
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: 'darkgray',
                  // fontWeight: 'bold',
                  fontSize: 18,
                  textAlignVertical: 'center',
                  textAlign: 'right',

                  // TODO: figure out a better way to position this
                }}
                onPress={() =>
                  NavigationService.navigate('BrowseYouTubePlaylists')
                }
              >
                See all...
              </Text>
            </View>
          </View>
          <PlaceholderList numItems={3} overlayText={'Coming Soon...'} />
        </View>
      </MainScreenContainer>
    );
  }
}
