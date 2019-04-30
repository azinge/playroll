/**
 * ViewSpotifyPlaylistScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import MusicSourceList from '../../shared/Lists/MusicSourceList';
import { ListSpotifyPlaylistTracksQuery } from '../../../graphql/requests/Spotify';
import NavigationService from '../../../services/NavigationService';
import { NavigationScreenProp } from 'react-navigation';
import Icons from '../../../themes/Icons';
import SearchSubHeader from '../../shared/SubHeaders/SearchSubHeader';
import MusicSourceCard from '../../shared/Cards/MusicSourceCard';
import { MusicSource } from '../../../graphql/types';
import EmptyDataFiller from '../../shared/Text/EmptyDataFiller';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

export default class ViewSpotifyPlaylistScreen extends React.Component<Props> {
  _keyExtractor = (item, index) => item.providerID;
  render() {
    const extractPlaylistTracks = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listSpotifyPlaylistTracks;
    };
    const playlist =
      this.props.navigation && this.props.navigation.getParam('playlist');
    delete playlist.__typename;
    return (
      <ListSpotifyPlaylistTracksQuery
        variables={{ playlistID: playlist.providerID, offset: 0, count: 20 }}
      >
        {({ loading, error, data, refetch, fetchMore }) => {
          const playlistTracks = extractPlaylistTracks(data);
          return (
            <SubScreenContainer
              title={'View Spotify Playlist'}
              icons={[
                {
                  ...Icons.menuIcon,
                  onPress: () => {
                    NavigationService.navigate('ManageRoll', {
                      currentSource: playlist,
                    });
                  },
                },
              ]}
              flatList
              contentContainerStyle={{
                marginTop: 10,
                paddingBottom: hp('10%'),
              }}
              renderFlatListHeader={() => <SearchSubHeader />}
              renderFlatListEmptyComponent={() => {
                return loading ? null : (
                  <EmptyDataFiller
                    text={
                      error
                        ? 'Could not load this Playlist from Spotify'
                        : 'Add some Tracks to this Playlist on Spotify!'
                    }
                    textSize={'h5'}
                    textWidth={300}
                  />
                );
              }}
              data={playlistTracks}
              keyExtractor={this._keyExtractor}
              renderItem={({ item: source }: { item: MusicSource }) => (
                <MusicSourceCard
                  source={source}
                  onPress={musicSource => {
                    NavigationService.navigate('ManageRoll', {
                      currentSource: musicSource,
                    });
                  }}
                />
              )}
              refreshing={loading}
              onRefresh={() => refetch()}
              onEndReached={() => {
                // @ts-ignore
                fetchMore({
                  variables: {
                    offset: playlistTracks.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    const prevPlaylistTracks = extractPlaylistTracks(prev);
                    const fetchMorePlaylistTracks = extractPlaylistTracks(
                      fetchMoreResult
                    );
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      private: {
                        listSpotifyPlaylistTracks: [
                          ...prevPlaylistTracks,
                          ...fetchMorePlaylistTracks,
                        ],
                        __typename: 'PrivateQueryMethods',
                      },
                    });
                  },
                });
              }}
              onEndReachedThreshold={0.5}
            >
              <View style={{ marginBottom: 45, flex: 1 }}>
                <MusicSourceList
                  sources={
                    data &&
                    data.private &&
                    data.private.listSpotifyPlaylistTracks
                  }
                  onPress={musicSource => {
                    NavigationService.navigate('ManageRoll', {
                      currentSource: musicSource,
                    });
                  }}
                />
              </View>
            </SubScreenContainer>
          );
        }}
      </ListSpotifyPlaylistTracksQuery>
    );
  }
}
