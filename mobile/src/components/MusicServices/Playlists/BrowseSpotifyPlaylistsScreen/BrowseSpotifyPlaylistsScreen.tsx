/**
 * BrowseSpotifyPlaylistsScreen
 */

import * as React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../../shared/Lists/PlaceholderList';
import { ListSpotifyPlaylistsQuery } from '../../../../graphql/requests/Spotify';
import { ListItem, Icon } from 'react-native-elements';
import NavigationService from '../../../../services/NavigationService';

export default class BrowseSpotifyPlaylistsScreen extends React.Component {
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
      <SubScreenContainer title='My Spotify Playlists'>
        <View
          style={{
            overflow: 'visible',
            margin: 10,
            marginBottom: 50,
          }}
        >
          <ListSpotifyPlaylistsQuery variables={{ count: 10 }}>
            {({ loading, error, data }) => {
              console.log(error && error.message);
              console.log(
                data && data.private && data.private.listSpotifyPlaylists
              );
              return (
                <View style={{ marginBottom: 0, flex: 1 }}>
                  <FlatList
                    data={
                      data && data.private && data.private.listSpotifyPlaylists
                    }
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                </View>
              );
            }}
          </ListSpotifyPlaylistsQuery>
        </View>
      </SubScreenContainer>
    );
  }
}
