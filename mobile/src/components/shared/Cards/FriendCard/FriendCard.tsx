/**
 * FriendCard
 */

import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Swipeout from 'react-native-swipeout';

import { Icon } from 'react-native-elements';
import NavigationService from '../../../../services/NavigationService';
// import { listFriends } from "../../../../graphql/types";

import styles from './FriendCard.styles';
import { User } from '../../../../graphql/types';
import UserCard from '../UserCard';
import { HeaderIconType } from '../../../../themes/Icons';
import { UnfriendUserMutation } from '../../../../graphql/requests/Relationships';
import { LIST_FRIENDS } from '../../../../graphql/requests/Relationships/ListFriendsQuery';

export interface Props {
  friend: User;
  onPress?: (friend: User) => void;
  icons?: HeaderIconType[];
}

interface State {}

export default class FriendCard extends React.Component<Props, State> {
  render() {
    const { friend, onPress, icons } = this.props;
    return (
      <UnfriendUserMutation
        variables={{ userID: friend.id }}
        refetchQueries={[LIST_FRIENDS]}
      >
        {(unfriendUser, { loading }) => {
          return (
            <Swipeout
              right={[
                {
                  text: 'Unfriend',
                  backgroundColor: '#c70700',
                  onPress: () => {
                    unfriendUser();
                  },
                },
              ]}
              backgroundColor={'transparent'}
              autoClose={true}
            >
              <UserCard user={friend} onPress={onPress} icons={icons} />
            </Swipeout>
          );
        }}
      </UnfriendUserMutation>
    );
  }
}
