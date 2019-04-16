/**
 * FriendsMenuScreen
 */

import * as React from "react";
import { NavigationScreenProp } from "react-navigation";
import SubScreenContainer from "../../shared/Containers/SubScreenContainer";
import { Button } from "react-native-elements";
import PlaceholderList from "../../shared/Lists/PlaceholderList";
import NavigationService from "../../../services/NavigationService";
import { ListFriendsQuery } from "../../../graphql/requests/Relationships";
import { ActivityIndicator, View } from "react-native";
import FriendCard from "../../shared/Cards/FriendCard";
import {
  ListCurrentUserPlayrollsQuery,
  CreatePlayrollMutation
} from "../../../graphql/requests/Playroll/";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class FriendsMenuScreen extends React.Component<Props, State> {
  render() {
    // return (
    //   <SubScreenContainer
    //     title={'My Friends'}
    //     contentContainerStyle={{ marginTop: 10 }}
    //   >
    //     <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
    //   </SubScreenContainer>
    // );
    const extractFriends = data => {
      if (
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
            <SubScreenContainer
              title={"My Friends"}
              flatList={!loading && !error}
              contentContainerStyle={{ marginTop: 10 }}
              data={friends}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return (
                  <FriendCard
                  // friend={item}
                  // onPress={() => {}}
                  />
                );
              }}
            >
              {loading && (
                <ActivityIndicator color={"gray"} style={{ paddingTop: 50 }} />
              )}
              {error && (
                <Text style={{ paddingTop: 50 }}>
                  Error Loading Recommendation
                </Text>
              )}
            </SubScreenContainer>
          );
        }}
      </ListFriendsQuery>
    );
  }
  //   return (
  //     <SubScreenContainer title='My Friends'>
  //       <Text>FriendsMenuScreen</Text>
  //       <Button
  //         title='Add Friend'
  //         onPress={() => NavigationService.navigate('AddFriend')}
  //       />
  //     </SubScreenContainer>
  //   );
  // }
}
