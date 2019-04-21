/**
 * BrowseFriendsScreen
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import { TouchableOpacity, ActivityIndicator, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ListFriendsQuery } from '../../../graphql/requests/Relationships';
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
      <ListFriendsQuery>
        {({ loading, error, data }) => {
          const friends = extractFriends(data);
          return (
            <View style={{ flex: 1 }}>
              <SubScreenContainer
                title={'My Friends'}
                flatList={!loading && !error}
                contentContainerStyle={{ marginTop: 10 }}
                data={friends}
                icons={[
                  {
                    name: 'system-update-alt',
                    onPress: () => {
                      NavigationService.navigate('BrowseFriendRequests');
                    },
                  },
                ]}
                renderFlatListHeader={() => {
                  return <SearchSubHeader />;
                }}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                  console.log(item);
                  return (
                    <FriendCard
                      friend={item}
                      onPress={friend => {
                        console.log(friend);
                        NavigationService.navigate('ViewProfile', {
                          userID: friend.id,
                        });
                      }}
                    />
                  );
                }}
              >
                {loading && (
                  <ActivityIndicator
                    color={'gray'}
                    style={{ paddingTop: 50 }}
                  />
                )}
                {error && (
                  <Text style={{ paddingTop: 50 }}>
                    Error Loading Recommendation
                  </Text>
                )}
              </SubScreenContainer>
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
}
