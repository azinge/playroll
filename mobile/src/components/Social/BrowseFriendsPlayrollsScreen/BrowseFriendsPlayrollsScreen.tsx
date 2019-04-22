/**
 * BrowseFriendsPlayrollsScreen
 */

import * as React from 'react';
import { Text, ActivityIndicator, TouchableOpacity } from 'react-native';
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
      <ListFriendsPlayrollsQuery>
        {({ loading, error, data }) => {
          const playrolls = extractFriendsPlayrolls(data);
          return (
            <SubScreenContainer
              title={'My Friends Playrolls'}
              flatList={!loading && !error}
              contentContainerStyle={{ marginTop: 10 }}
              data={playrolls}
              keyExtractor={item => item.id}
              renderFlatListHeader={() => {
                return <SearchSubHeader />;
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
            >
              {loading && (
                <ActivityIndicator color={'gray'} style={{ paddingTop: 50 }} />
              )}
              {error && (
                <Text style={{ paddingTop: 50 }}>
                  Error Loading Friends Playrolls
                </Text>
              )}
            </SubScreenContainer>
          );
        }}
      </ListFriendsPlayrollsQuery>
    );
  }
}
