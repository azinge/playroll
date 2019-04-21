/**
 * BrowseSpotifyPlaylistsScreen
 */

import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import {
  ListSpotifyPlaylistsQuery,
  CurrentUserSpotifyStatusQuery,
} from '../../../graphql/requests/Spotify';
import { ListItem, Icon } from 'react-native-elements';
import NavigationService from '../../../services/NavigationService';
import SearchSubHeader from '../../shared/SubHeaders/SearchSubHeader';
import Icons from '../../../themes/Icons';
import MainScreenContainer from '../../shared/Containers/MainScreenContainer';

export default class BrowseSpotifyPlaylistsScreen extends React.Component {
  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ marginHorizontal: 20, marginBottom: 5, marginTop: 5 }}
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
          shadowRadius: 3,
          shadowOpacity: 0.2,
          overflow: 'visible',
        }}
      />
    </TouchableOpacity>
  )

  _keyExtractor = (item, index) => item.providerID;

  render() {
    return (
      <MainScreenContainer title='My Spotify Playlists'>
        <View
          style={{
            overflow: 'visible',
            margin: 10,
            marginBottom: 55,
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
            {/* <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
              <Icon
                color={'darkgray'}
                name={Icons.settingsIcon.name}
                type={Icons.settingsIcon.type}
                onPress={() => NavigationService.navigate('SpotifySettings')}
              />
            </View> */}
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
                        title={'My Saved Tracks'}
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
                        console.log(error && error.message);
                        console.log(
                          data &&
                            data.private &&
                            data.private.listSpotifyPlaylists
                        );
                        return (
                          <View style={{ marginBottom: 5, flex: 1 }}>
                            <FlatList
                              data={
                                data &&
                                data.private &&
                                data.private.listSpotifyPlaylists
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
      </MainScreenContainer>
    );
  }
}
