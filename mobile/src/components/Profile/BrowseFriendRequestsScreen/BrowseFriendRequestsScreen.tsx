/**
 * BrowseFriendRequestsScreen
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import { TouchableOpacity, ActivityIndicator, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import {
  ListFriendRequestsQuery,
  AcceptFriendRequestMutation,
  IgnoreFriendRequestMutation,
} from '../../../graphql/requests/Relationships';
import UserCard from '../../shared/Cards/UserCard';
import NavigationService from '../../../services/NavigationService';
import { LIST_FRIEND_REQUESTS } from '../../../graphql/requests/Relationships/ListFriendRequestsQuery';
import { LIST_FRIENDS } from '../../../graphql/requests/Relationships/ListFriendsQuery';
import SearchSubHeader from '../../shared/SubHeaders/SearchSubHeader';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class BrowseFriendRequestsScreen extends React.Component<
  Props,
  State
> {
  render() {
    const extractFriendRequests = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listFriendRequests;
    };
    return (
      <ListFriendRequestsQuery variables={{ offset: 0, count: 20 }}>
        {({ loading, error, data, refetch, fetchMore }) => {
          const friendRequests = extractFriendRequests(data);
          return (
            <View style={{ flex: 1 }}>
              <SubScreenContainer
                title={'My Friend Requests'}
                flatList
                contentContainerStyle={{
                  marginTop: 10,
                  paddingBottom: hp('10%'),
                }}
                data={friendRequests}
                keyExtractor={item => item.id}
                renderFlatListHeader={() => {
                  return (
                    <>
                      {error && (
                        <Text style={{ paddingTop: 50 }}>
                          Error Loading Recommendation
                        </Text>
                      )}
                      <SearchSubHeader />
                    </>
                  );
                }}
                renderItem={({ item }) => {
                  return (
                    <UserCard
                      user={item.otherUser}
                      onPress={user => {
                        console.log(user);
                        NavigationService.navigate('ViewProfile', {
                          userID: user.id,
                        });
                      }}
                      icons={[
                        {
                          render: () =>
                            this.renderAcceptFriendRequestButton(
                              item.otherUser.id
                            ),
                        },
                        {
                          render: () =>
                            this.renderIgnoreFriendRequestButton(
                              item.otherUser.id
                            ),
                        },
                      ]}
                    />
                  );
                }}
                refreshing={loading}
                onRefresh={() => refetch()}
                onEndReached={() => {
                  fetchMore({
                    variables: {
                      offset: friendRequests.length,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      const prevFriendRequests = extractFriendRequests(prev);
                      const fetchMoreFriendRequests = extractFriendRequests(
                        fetchMoreResult
                      );
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        private: {
                          listFriendRequests: [
                            ...prevFriendRequests,
                            ...fetchMoreFriendRequests,
                          ],
                          __typename: 'PrivateQueryMethods',
                        },
                      });
                    },
                  });
                }}
                onEndReachedThreshold={0.5}
              >
                {loading && (
                  <ActivityIndicator
                    color={'gray'}
                    style={{ paddingTop: 50 }}
                  />
                )}
              </SubScreenContainer>
            </View>
          );
        }}
      </ListFriendRequestsQuery>
    );
  }
  renderAcceptFriendRequestButton(userID: number) {
    return (
      <AcceptFriendRequestMutation
        variables={{ userID }}
        refetchQueries={() => [LIST_FRIEND_REQUESTS, LIST_FRIENDS]}
      >
        {(acceptFriendRequest, { loading }) => {
          return loading ? (
            <ActivityIndicator />
          ) : (
            <Icon
              name={'check'}
              size={27}
              color='purple'
              underlayColor='rgba(255,255,255,0)'
              containerStyle={{ marginTop: 5, marginLeft: 16 }}
              onPress={() => {
                acceptFriendRequest();
              }}
            />
          );
        }}
      </AcceptFriendRequestMutation>
    );
  }
  renderIgnoreFriendRequestButton(userID: number) {
    return (
      <IgnoreFriendRequestMutation
        variables={{ userID }}
        refetchQueries={() => [LIST_FRIEND_REQUESTS, LIST_FRIENDS]}
      >
        {(ignoreFriendRequest, { loading }) => {
          return loading ? (
            <ActivityIndicator />
          ) : (
            <Icon
              name={'close'}
              size={27}
              color='purple'
              underlayColor='rgba(255,255,255,0)'
              containerStyle={{ marginTop: 5, marginLeft: 16 }}
              onPress={() => {
                ignoreFriendRequest();
              }}
            />
          );
        }}
      </IgnoreFriendRequestMutation>
    );
  }
}
