/**
 * BrowseFriendsPlayrollsScreen
 */

import * as React from 'react';
import { Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlayrollCard from '../../shared/Cards/PlayrollCard';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import { Icon } from 'react-native-elements';
import SearchSubHeader from '../../shared/SubHeaders/SearchSubHeader';
import { ListFriendsPlayrollsQuery } from '../../../graphql/requests/Playroll/ListFriendsPlayrollsQuery';
import NavigationService from '../../../services/NavigationService';

export default class BrowseFriendsPlayrollsScreen extends React.Component {
  render() {
    const extractFriendsPlayrolls = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listFriendsPlayrolls;
    };
    return (
      <ListFriendsPlayrollsQuery variables={{ offset: 0, count: 20 }}>
        {({ loading, error, data, refetch, fetchMore }) => {
          const playrolls = extractFriendsPlayrolls(data);
          return (
            <SubScreenContainer
              title={'My Friends Playrolls'}
              flatList
              contentContainerStyle={{
                marginTop: 10,
                paddingBottom: hp('10%'),
              }}
              data={playrolls}
              keyExtractor={item => item.id}
              renderFlatListHeader={() => {
                return (
                  <>
                    {error && (
                      <Text style={{ paddingTop: 50 }}>
                        Error Loading Friends Playrolls
                      </Text>
                    )}
                    <SearchSubHeader />
                  </>
                );
              }}
              renderItem={({ item }) => {
                return (
                  <PlayrollCard
                    playroll={item}
                    onPress={playroll => {
                      NavigationService.navigate('ViewExternalPlayroll', {
                        playroll,
                      });
                    }}
                  />
                );
              }}
              refreshing={loading}
              onRefresh={() => refetch()}
              onEndReached={() => {
                fetchMore({
                  variables: {
                    offset: playrolls.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    const prevPlayrolls = extractFriendsPlayrolls(prev);
                    const fetchMorePlayrolls = extractFriendsPlayrolls(
                      fetchMoreResult
                    );
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      private: {
                        listFriendsPlayrolls: [
                          ...prevPlayrolls,
                          ...fetchMorePlayrolls,
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
      </ListFriendsPlayrollsQuery>
    );
  }
}
