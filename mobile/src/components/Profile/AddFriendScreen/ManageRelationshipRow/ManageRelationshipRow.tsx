/**
 * ManageRelationshipRow
 */

import * as React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import styles from './ManageRelationshipRow.styles';
import { GetRelationshipQuery } from '../../../../graphql/requests/Relationships/GetRelationship';
import { SendFriendRequestMutation } from '../../../../graphql/requests/Relationships';
import Icons, { HeaderIconType } from '../../../../themes/Icons';
import UserCard from '../../../shared/Cards/UserCard';
import NavigationService from '../../../../services/NavigationService';
import { User, Relationship } from '../../../../graphql/types';

export interface Props {
  user: User;
  relationshipID: number;
}

interface State {
  relationshipID: number;
}

export default class ManageRelationshipRow extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      relationshipID: props.relationshipID,
    };
  }
  render() {
    const { user } = this.props;
    const { relationshipID } = this.state;

    const extractRelationship = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return {};
      }
      return data.private.relationship;
    };
    return (
      <GetRelationshipQuery
        variables={{ id: relationshipID }}
        skip={!relationshipID}
        fetchPolicy={'cache-first'}
      >
        {({ data, loading: relationshipLoading, error }) => {
          const relationship = extractRelationship(data);
          return (
            <SendFriendRequestMutation
              variables={{
                userID: user.id,
              }}
              onCompleted={sfrData => {
                this.setState({
                  relationshipID:
                    sfrData &&
                    sfrData.private.sendFriendRequest &&
                    sfrData.private.sendFriendRequest.id,
                });
              }}
            >
              {(sendFriendRequest, { loading: sendFriendRequestLoading }) => {
                const loadingIcon = {
                  name: '',
                  render: () => (
                    <ActivityIndicator style={{ marginRight: 7 }} />
                  ),
                };
                const sendFriendRequestIcon = {
                  ...Icons.addIcon,
                  onPress: () => {
                    sendFriendRequest();
                  },
                };
                const sentFriendRequestIcon = {
                  name: 'arrow-forward',
                };
                const friendsIcon = {
                  name: 'check',
                };

                let displayedIcon: HeaderIconType = sendFriendRequestIcon;
                if (relationshipLoading || sendFriendRequestLoading) {
                  displayedIcon = loadingIcon;
                }
                if (relationship.status === 'Friend Request Sent') {
                  displayedIcon = sentFriendRequestIcon;
                }
                if (relationship.status === 'Friend') {
                  displayedIcon = friendsIcon;
                }

                return (
                  <UserCard
                    user={user}
                    onPress={() => {
                      NavigationService.navigate('ViewProfile', {
                        userID: user.id,
                      });
                    }}
                    icons={[displayedIcon]}
                  />
                  // <View style={styles.addUserButtonContainer}>
                  //   {loading ? (
                  //     <ActivityIndicator color={'white'} />
                  //   ) : (
                  //     <Button
                  //       buttonStyle={this.handleAddFriendButtonStyle(user)}
                  //       title={this.handleAddFriendButtonTitle(user)}
                  //       onPress={() =>
                  //         this.handleFriendRequest(user, sendFriendRequest)
                  //       }
                  //     />
                  //   )}
                  // </View>
                );
              }}
            </SendFriendRequestMutation>
          );
        }}
      </GetRelationshipQuery>
    );
  }
}
