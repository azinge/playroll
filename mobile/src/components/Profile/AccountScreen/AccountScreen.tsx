/**
 * AccountScreen
 */

import * as React from 'react';
import { Text, View, SafeAreaView, Button, Image } from 'react-native';

import styles from './AccountScreen.styles';
import { SignOutMutation } from '../../../graphql/requests/Auth';
import { GetCurrentUserQuery } from '../../../graphql/requests/User';
import {
  NavigationScreenProp,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import NavigationService from '../../../services/NavigationService';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class AccountScreen extends React.Component<Props, State> {
  render() {
    return (
      <GetCurrentUserQuery>
        {({ loading, error, data }) => {
          if (loading || error || Object.keys(data).length === 0) {
            return <SubScreenContainer title='My Account' modal />;
          }
          const currentUser = (data && data.private.currentUser) || {};
          return (
            <SubScreenContainer title='My Account' modal>
              <View>
                <Text>AccountScreen</Text>
              </View>
              <View style={{ height: 100 }}>
                <Image
                  source={{
                    uri: currentUser.avatar,
                  }}
                  style={{ height: 100, width: 100, borderRadius: 5 }}
                />
                <Text>{currentUser.name}</Text>
              </View>
              <Button
                title='My Friends'
                onPress={() => {
                  NavigationService.navigate('ViewFriends');
                }}
              />
              <Button
                title='Edit Profile'
                onPress={() => {
                  NavigationService.navigate('EditProfile');
                }}
              />
              <Button
                title='Settings'
                onPress={() => {
                  NavigationService.navigate('Settings');
                }}
              />
              <SignOutMutation>
                {signOut => {
                  return (
                    <Button
                      title='Sign Out'
                      onPress={() => {
                        signOut().then(
                          () =>
                            this.props.navigation &&
                            this.props.navigation.dispatch(
                              StackActions.reset({
                                key: null,
                                index: 0,
                                actions: [
                                  NavigationActions.navigate({
                                    routeName: 'Auth',
                                  }),
                                ],
                              })
                            )
                        );
                      }}
                    />
                  );
                }}
              </SignOutMutation>
            </SubScreenContainer>
          );
        }}
      </GetCurrentUserQuery>
    );
  }
}
