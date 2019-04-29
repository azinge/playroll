/**
 * BrowseSpotifySavedTracksScreen
 */

import * as React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import { ListSpotifySavedTracksQuery } from '../../../graphql/requests/Spotify';
import { ListItem, Icon } from 'react-native-elements';
import MusicSourceList from '../../shared/Lists/MusicSourceList';
import SearchSubHeader from '../../shared/SubHeaders/SearchSubHeader';
import NavigationService from '../../../services/NavigationService';
import MusicSourceCard from '../../shared/Cards/MusicSourceCard';
import { MusicSource } from '../../../graphql/types';

export default class BrowseSpotifySavedTracksScreen extends React.Component {
  _renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={{ color: 'purple' }}
      subtitle={item.creator}
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
    const extractSavedTracks = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listSpotifySavedTracks;
    };
    return (
      <ListSpotifySavedTracksQuery variables={{ offset: 0, count: 20 }}>
        {({ loading, error, data, refetch, fetchMore }) => {
          const savedTracks = extractSavedTracks(data);
          return (
            <SubScreenContainer
              title={'My Spotify Saved Tracks'}
              flatList
              contentContainerStyle={{
                marginTop: 10,
                paddingBottom: hp('10%'),
              }}
              renderFlatListHeader={() => <SearchSubHeader />}
              data={savedTracks}
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
                    offset: savedTracks.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    const prevSavedTracks = extractSavedTracks(prev);
                    const fetchMoreSavedTracks = extractSavedTracks(
                      fetchMoreResult
                    );
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      private: {
                        listSpotifySavedTracks: [
                          ...prevSavedTracks,
                          ...fetchMoreSavedTracks,
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
      </ListSpotifySavedTracksQuery>
    );
    // return (
    //   <SubScreenContainer title={'My Spotify Saved Tracks'}>
    //     <Text>BrowseSpotifySavedTracksScreen</Text>
    //   </SubScreenContainer>
    // );
  }
}
