/**
 * MusicServicePlaylistsMenuScreen
 */

import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';
import {
  CurrentUserSpotifyStatusQuery,
  ListSpotifyPlaylistsQuery,
  ListSpotifySavedTracksQuery,
} from '../../../../graphql/requests/Spotify/';
import PlaceholderList from '../../../shared/Lists/PlaceholderList';

export default class MusicServicePlaylistsMenuScreen extends React.Component {
  _renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={{ color: 'purple' }}
      subtitle={item.type}
      leftAvatar={{
        source: { uri: item.cover },
      }}
      containerStyle={{
        // borderWidth: 0.1,
        // marginHorizontal: 10,
        // marginVertical: 7,
        marginHorizontal: 30,
        marginBottom: 10,
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
          {/* <CurrentUserSpotifyStatusQuery>
            {({ loading, error, data }) => {
              return (
                <Text>
                  {data &&
                    data.private &&
                    data.private.currentUserSpotifyStatus}
                </Text>
              );
            }}
          </CurrentUserSpotifyStatusQuery> */}
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
          </View>
          <ListSpotifyPlaylistsQuery variables={{ count: 3 }}>
            {({ loading, error, data }) => {
              console.log(error && error.message);
              console.log(
                data && data.private && data.private.listSpotifyPlaylists
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
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 20,
              fontWeight: 'bold',
              marginVertical: 2,
            }}
          >
            Your Saved Tracks
          </Text>
          <ListSpotifySavedTracksQuery variables={{ count: 3 }}>
            {({ loading, error, data }) => {
              console.log(error && error.message);
              console.log(
                data && data.private && data.private.listSpotifySavedTracks
              );
              return (
                <View style={{ marginBottom: 20, flex: 1 }}>
                  <FlatList
                    data={
                      data &&
                      data.private &&
                      data.private.listSpotifySavedTracks.slice(0, 3)
                    }
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                </View>
              );
            }}
          </ListSpotifySavedTracksQuery>
        </View>
      </SubScreenContainer>
    );
    // return (
    //   <SubScreenContainer title='My Playlists'>
    //     <Text>MusicServicePlaylistsMenuScreen</Text>
    //   </SubScreenContainer>
    // );
  }
}
