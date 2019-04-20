/**
 * ManageRelationshipButton
 */

import * as React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import styles from './ManageRelationshipButton.styles';
import { GetRelationshipQuery } from '../../../../graphql/requests/Relationships/GetRelationship';
import { SendFriendRequestMutation } from '../../../../graphql/requests/Relationships';
import Icons, { HeaderIconType } from '../../../../themes/Icons';
import UserCard from '../../../shared/Cards/UserCard';
import NavigationService from '../../../../services/NavigationService';
import { User, Relationship } from '../../../../graphql/types';
import { Button } from 'react-native-elements';

export interface Props {
  user: User;
  relationshipID: number;
}

interface State {
  relationshipID: number;
}

export default class ManageRelationshipButton extends React.Component<
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
                let title = 'Send Friend Request';

                if (relationshipLoading || sendFriendRequestLoading) {
                  title = 'Loading';
                }
                if (relationship.status === 'Friend Request Sent') {
                  title = 'Friend Request Sent';
                }
                if (relationship.status === 'Friend') {
                  title = 'Friend';
                }

                return (
                  <Button
                    raised
                    containerStyle={{ width: '50%' }}
                    buttonStyle={{
                      borderRadius: 80,
                      height: 40,
                      backgroundColor: 'purple',
                    }}
                    title={title}
                    titleStyle={{ fontSize: 16 }}
                    onPress={() => {
                      sendFriendRequest();
                    }}
                    loading={relationshipLoading || sendFriendRequestLoading}
                    disabled={title !== 'Send Friend Request'}
                  />
                );
              }}
            </SendFriendRequestMutation>
          );
        }}
      </GetRelationshipQuery>
    );
  }
}
