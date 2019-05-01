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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
import EmptyDataFiller from '../../shared/Text/EmptyDataFiller';

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
  renderSpotifyHeader(authenticated, loading) {
    return (
      <View>
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
        </View>
        {authenticated ? (
          <View>
            <TouchableOpacity
              onPress={() =>
                NavigationService.navigate('BrowseSpotifySavedTracks')
              }
              style={{
                marginHorizontal: 60,
                marginBottom: 5,
              }}
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
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => NavigationService.navigate('ConnectSpotify')}
            style={{
              marginHorizontal: 60,
              marginBottom: 5,
            }}
          >
            <ListItem
              title={loading ? 'Loading...' : 'Connect To Spotify'}
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
        )}
      </View>
    );
  }

  render() {
    const extractPlaylists = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listSpotifyPlaylists;
    };
    return (
      <CurrentUserSpotifyStatusQuery>
        {({
          loading: statusLoading,
          error: statusError,
          data: statusData,
          refetch: statusRefetch,
        }) => {
          const authenticated =
            statusData &&
            statusData.private &&
            statusData.private.currentUserSpotifyStatus;
          return (
            <ListSpotifyPlaylistsQuery
              variables={{ offset: 0, count: 20 }}
              skip={!authenticated}
            >
              {({ loading, error, data, fetchMore, refetch }) => {
                const playlists = extractPlaylists(data);
                return (
                  <MainScreenContainer
                    flatList
                    contentContainerStyle={{
                      marginTop: 10,
                      paddingBottom: hp('10%'),
                    }}
                    renderFlatListHeader={() =>
                      this.renderSpotifyHeader(authenticated, statusLoading)
                    }
                    renderFlatListEmptyComponent={() => {
                      return statusLoading || loading ? null : (
                        <EmptyDataFiller
                          text={
                            error || statusError
                              ? 'Could not load Playlists from Spotify'
                              : 'Add some Playlists on Spotify!'
                          }
                          textSize={'h5'}
                          textWidth={300}
                        />
                      );
                    }}
                    data={playlists}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    refreshing={statusLoading || loading}
                    onRefresh={() => {
                      statusRefetch();
                      refetch();
                    }}
                    onEndReached={() => {
                      // @ts-ignore
                      fetchMore({
                        variables: {
                          offset: playlists.length,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          const prevPlaylists = extractPlaylists(prev);
                          const fetchMorePlaylists = extractPlaylists(
                            fetchMoreResult
                          );
                          if (!fetchMoreResult) return prev;
                          return Object.assign({}, prev, {
                            private: {
                              listSpotifyPlaylists: [
                                ...prevPlaylists,
                                ...fetchMorePlaylists,
                              ],
                              __typename: 'PrivateQueryMethods',
                            },
                          });
                        },
                      });
                    }}
                    onEndReachedThreshold={0.5}
                  />
                );
              }}
            </ListSpotifyPlaylistsQuery>
          );
        }}
      </CurrentUserSpotifyStatusQuery>
    );
  }
}
