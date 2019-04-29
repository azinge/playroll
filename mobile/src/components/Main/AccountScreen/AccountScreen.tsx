/**
 * AccountScreen
 */

import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Linking } from 'expo';

import styles from './AccountScreen.styles';
import { SignOutMutation } from '../../../graphql/requests/Auth';
import { GetCurrentUserQuery } from '../../../graphql/requests/User';
import {
  NavigationScreenProp,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import NavigationService from '../../../services/NavigationService';
import NotificationService from '../../../services/NotificationService';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import { Button } from 'react-native-elements';
import { ClearDeviceTokenMutation } from '../../../graphql/requests/User/ClearDeviceTokenMutation';
import DropdownAlert from 'react-native-dropdownalert';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class AccountScreen extends React.Component<Props, State> {
  dropdown: DropdownAlert;

  render() {
    return (
      <GetCurrentUserQuery>
        {({ loading, error, data }) => {
          if (loading || error || Object.keys(data).length === 0) {
            return <SubScreenContainer title='My Account' modal />;
          }
          const currentUser = (data && data.private.currentUser) || {};
          return (
            <View style={{ flex: 1 }}>
              <SubScreenContainer title='My Account' modal>
                <View
                  style={{
                    marginLeft: 15,
                    marginTop: 10,
                    flex: 1,
                    marginBottom: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={{
                      uri: currentUser.avatar,
                    }}
                    style={{ height: 60, width: 60, borderRadius: 30 }}
                  />

                  <Text
                    style={{
                      marginLeft: 15,
                      marginTop: 5,
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#993399',
                    }}
                  >
                    {currentUser.name}
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: 10,
                  }}
                >
                  {/* View Profile */}
                  <TouchableOpacity
                    onPress={() => {
                      NavigationService.navigate('ViewCurrentUserProfile');
                    }}
                  >
                    <View style={styles.textContainer}>
                      <Text style={styles.enabledText}>View Profile</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Playrolls */}
                  <TouchableOpacity
                    onPress={() => {
                      NavigationService.navigate('BrowsePlayrolls');
                    }}
                  >
                    <View style={styles.textContainer}>
                      <Text style={styles.enabledText}>Playrolls</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Friends */}
                  <TouchableOpacity
                    onPress={() => {
                      NavigationService.navigate('BrowseFriends');
                    }}
                  >
                    <View style={styles.textContainer}>
                      <Text style={styles.enabledText}>Friends</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Recommendations */}
                  <TouchableOpacity
                    onPress={() => {
                      NavigationService.navigate('BrowseRecommendations');
                    }}
                  >
                    <View style={styles.textContainer}>
                      <Text style={styles.enabledText}>Recommendations</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Music */}
                  <TouchableOpacity
                    onPress={() => {
                      NavigationService.navigate('Music');
                    }}
                  >
                    <View style={styles.textContainer}>
                      <Text style={styles.enabledText}>My Music</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Settings */}
                  <TouchableOpacity
                    onPress={() => {
                      NavigationService.navigate('Settings');
                    }}
                  >
                    <View style={styles.textContainer}>
                      <Text style={styles.enabledText}>Settings</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Contact Us */}
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(`http://contact.playroll.io`);
                    }}
                  >
                    <View style={styles.textContainer}>
                      <Text style={styles.enabledText}>Contact Us</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Sign Out */}
                  <ClearDeviceTokenMutation>
                    {clearDeviceToken => {
                      return (
                        <SignOutMutation>
                          {signOut => {
                            return (
                              <TouchableOpacity
                                onPress={async () => {
                                  try {

                                    try {
                                      const deviceToken = await NotificationService.registerForPushNotificationsAsync();
                                      if (deviceToken !== null) {
                                        await clearDeviceToken({
                                          variables: { deviceToken },
                                        });
                                      }
                                    } catch (err) {}
                                    await signOut();
                                    NavigationService.dispatch(
                                      StackActions.reset({
                                        key: null,
                                        index: 0,
                                        actions: [
                                          NavigationActions.navigate({
                                            routeName: 'Auth',
                                          }),
                                        ],
                                      })
                                    );
                                  } catch (err) {
                                    this.dropdown.alertWithType(
                                      'error',
                                      'Error',
                                      "We're sorry, please try again."
                                    );
                                  }
                                }}
                              >
                                <View style={styles.textContainer}>
                                  <Text style={styles.signOut}>Sign Out</Text>
                                </View>
                              </TouchableOpacity>
                            );
                          }}
                        </SignOutMutation>
                      );
                    }}
                  </ClearDeviceTokenMutation>
                </View>
              </SubScreenContainer>
              <DropdownAlert ref={ref => (this.dropdown = ref)} />
            </View>
          );
        }}
      </GetCurrentUserQuery>
    );
  }
}
