/**
 * ViewProfileScreen
 */

import * as React from 'react';
import { Text, View, SafeAreaView, Button, Image } from 'react-native';

import styles from './ViewProfileScreen.styles';
import { SignOutMutation } from '../../../graphql/requests/Auth';
import { GetCurrentUserQuery } from '../../../graphql/requests/User';
import {
  NavigationScreenProp,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import NavigationService from '../../../services/NavigationService';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class ViewProfileScreen extends React.Component<Props, State> {
  render() {
    return (
      <GetCurrentUserQuery>
        {({ data }) => {
          if (!data || !data.private.currentUser) {
            return <SafeAreaView style={styles.screenContainer} />;
          }
          return (
            <SafeAreaView style={styles.screenContainer}>
              <View>
                <Text>ProfileScreen</Text>
              </View>
              <View style={{ height: 100 }}>
                <Image
                  source={{
                    uri: data.private.currentUser.avatar,
                  }}
                  style={{ height: 100, width: 100, borderRadius: 5 }}
                />
                <Text>{data.private.currentUser.name}</Text>
              </View>
              <Button
                title='Discovery Queue'
                onPress={() => {
                  NavigationService.navigate('ManageDiscoveryQueue');
                }}
              />
              <Button
                title='Friends'
                onPress={() => {
                  NavigationService.navigate('BrowseFriends');
                }}
              />
              <Button
                title='Recommendations'
                onPress={() => {
                  NavigationService.navigate('BrowseRecommendations');
                }}
              />
              <Button
                title='Connect to Spotify'
                onPress={() => {
                  NavigationService.navigate('ConnectSpotify');
                }}
              />
              <Button
                title='Edit Profile'
                onPress={() => {
                  NavigationService.navigate('ManageProfile');
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
            </SafeAreaView>
          );
        }}
      </GetCurrentUserQuery>
    );
  }
}
