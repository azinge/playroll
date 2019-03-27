/**
 * MusicServicePlaylistsMenuScreen
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
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';
import {
  CurrentUserSpotifyStatusQuery,
  ListSpotifyPlaylistsQuery,
} from '../../../../graphql/requests/Spotify/';
import NavigationService from '../../../../services/NavigationService';

export default class MusicServicePlaylistsMenuScreen extends React.Component {
  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ marginHorizontal: 30, marginBottom: 10, marginTop: 5 }}
      onPress={() =>
        NavigationService.navigate('ViewSpotifyPlaylist', {
          playlistID: item.providerID,
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
          shadowRadius: 5,
          shadowOpacity: 0.2,
          overflow: 'visible',
        }}
      />
    </TouchableOpacity>
  )

  _keyExtractor = (item, index) => item.providerID;

  render() {
    return (
      <SubScreenContainer title='My Playlists'>
        <View
          style={{
            overflow: 'visible',
            margin: 10,
          }}
        >
          <View
            style={{ flex: 1, flexDirection: 'row', marginBottom: 3, left: 2 }}
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

            <Text
              style={{
                color: 'black',
                // fontWeight: 'bold',
                fontSize: 24,
                left: 150,
              }}
              onPress={() =>
                NavigationService.navigate('BrowseSpotifyPlaylists')
              }
            >
              See all...
            </Text>
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
                      style={{ marginHorizontal: 30, marginBottom: 10 }}
                    >
                      <ListItem
                        title={'Your Saved Tracks'}
                        titleStyle={{ textAlign: 'center', fontWeight: 'bold' }}
                        containerStyle={{
                          //   marginHorizontal: 30,
                          //   marginBottom: 10,
                          borderColor: 'white',
                          borderRadius: 10,
                          shadowColor: 'gray',
                          shadowOffset: {
                            width: 2,
                            height: 1,
                          },
                          shadowRadius: 5,
                          shadowOpacity: 0.2,
                          overflow: 'visible',
                        }}
                      />
                    </TouchableOpacity>
                    <ListSpotifyPlaylistsQuery variables={{ count: 3 }}>
                      {({ loading, error, data }) => {
                        console.log(error && error.message);
                        console.log(
                          data &&
                            data.private &&
                            data.private.listSpotifyPlaylists
                        );
                        return (
                          <View style={{ marginBottom: 0, flex: 1 }}>
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
                return <Text>Please connect to Spotify</Text>;
              }
            }}
          </CurrentUserSpotifyStatusQuery>
        </View>
      </SubScreenContainer>
    );
  }
}
