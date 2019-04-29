/**
 * BrowseFriendsScreen
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import { TouchableOpacity, ActivityIndicator, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  ListFriendsQuery,
  ListFriendRequestsQuery,
} from '../../../graphql/requests/Relationships';
import FriendCard from '../../shared/Cards/FriendCard';
import NavigationService from '../../../services/NavigationService';
import FooterButton from '../../shared/Buttons/FooterButton';
import SearchSubHeader from '../../shared/SubHeaders/SearchSubHeader';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class BrowseFriendsScreen extends React.Component<Props, State> {
  render() {
    const extractFriends = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listFriends;
    };
    return (
      <ListFriendsQuery variables={{ offset: 0, count: 20 }}>
        {({ loading, error, data, refetch, fetchMore }) => {
          const friends = extractFriends(data);
          return (
            <View style={{ flex: 1 }}>
              <SubScreenContainer
                title={'My Friends'}
                flatList
                contentContainerStyle={{
                  marginTop: 10,
                  paddingBottom: hp('10%'),
                }}
                data={friends}
                icons={[this.createFriendRequestsIcon()]}
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
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                  console.log(item);
                  return (
                    <FriendCard
                      friend={item}
                      onPress={friend => {
                        console.log(friend);
                        NavigationService.navigate(
                          'BrowseExchangedRecommendations',
                          { user: friend }
                        );
                      }}
                    />
                  );
                }}
                refreshing={loading}
                onRefresh={() => refetch()}
                onEndReached={() => {
                  fetchMore({
                    variables: {
                      offset: friends.length,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      const prevFriends = extractFriends(prev);
                      const fetchMoreFriends = extractFriends(fetchMoreResult);
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        private: {
                          listFriends: [...prevFriends, ...fetchMoreFriends],
                          __typename: 'PrivateQueryMethods',
                        },
                      });
                    },
                  });
                }}
                onEndReachedThreshold={0.5}
              />
              <FooterButton
                title={'Find Friends'}
                onPress={() => {
                  NavigationService.navigate('AddFriend');
                }}
              />
            </View>
          );
        }}
      </ListFriendsQuery>
    );
  }
  //   return (
  //     <SubScreenContainer title='My Friends'>
  //       <Text>BrowseFriendsScreen</Text>
  //       <Button
  //         title='Add Friend'
  //         onPress={() => NavigationService.navigate('AddFriend')}
  //       />
  //     </SubScreenContainer>
  //   );
  // }
  createFriendRequestsIcon() {
    return {
      name: '',
      render: () => (
        <ListFriendRequestsQuery>
          {({ data }) => {
            let name = 'email';
            if (
              data &&
              data.private &&
              data.private.listFriendRequests &&
              data.private.listFriendRequests.length > 0
            ) {
              name = 'email-alert';
            }
            return (
              <Icon
                name={name}
                type={'material-community'}
                size={27}
                color='purple'
                underlayColor='rgba(255,255,255,0)'
                containerStyle={{ marginTop: 5, marginLeft: 16 }}
                onPress={() => {
                  NavigationService.navigate('BrowseFriendRequests');
                }}
              />
            );
          }}
        </ListFriendRequestsQuery>
      ),
    };
  }
}
