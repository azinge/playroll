/**
 * Application component for Playroll mobile application.
 */

import React from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';

import NavigationService from '../../../services/NavigationService';

import {
  ListCurrentUserPlayrollsQuery,
  CreatePlayrollMutation,
} from '../../../graphql/requests/Playroll/';
import { GetCurrentUserQuery } from '../../../graphql/requests/User';

import { LIST_CURRENT_USER_PLAYROLLS } from '../../../graphql/requests/Playroll/ListCurrentUserPlayrollsQuery';

import PlayrollCard from './PlayrollCard';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  addPlayrollName: string;
}

export default class BrowsePlayrollsScreen extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      addPlayrollName: '',
    };
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
        <GetCurrentUserQuery>
          {({ loading, error, data }) => {
            if (loading || error) {
              return (
                <Header
                  backgroundColor='purple'
                  leftComponent={
                    <Icon
                      name='arrow-back'
                      type='material'
                      color='white'
                      onPress={() =>
                        this.props.navigation &&
                        this.props.navigation.goBack(null)
                      }
                    />
                  }
                  centerComponent={{
                    text: 'Playrolls',
                    style: { color: '#fff', fontSize: 20 },
                  }}
                  rightComponent={
                    <Icon name='add' color='grey' underlayColor='purple' />
                  }
                />
              );
            }
            const currentUser = (data && data.private.currentUser) || {};
            return (
              <CreatePlayrollMutation
                variables={{
                  input: { name: 'New Playroll', userID: currentUser.id },
                }}
                onCompleted={data2 => {
                  const playroll = data2.private.createCurrentUserPlayroll;
                  NavigationService.navigate('ManagePlayroll', {
                    playroll,
                  });
                }}
                refetchQueries={[LIST_CURRENT_USER_PLAYROLLS]}
              >
                {createPlayroll => {
                  return (
                    <Header
                      backgroundColor='purple'
                      leftComponent={
                        <Icon
                          name='arrow-back'
                          type='material'
                          color='white'
                          underlayColor='rgba(255,255,255,0)'
                          onPress={() =>
                            this.props.navigation &&
                            this.props.navigation.goBack(null)
                          }
                        />
                      }
                      centerComponent={{
                        text: 'Playrolls',
                        style: { color: '#fff', fontSize: 20 },
                      }}
                      rightComponent={
                        <Icon
                          name='add'
                          color='white'
                          underlayColor='rgba(255,255,255,0)'
                          onPress={() => createPlayroll()}
                        />
                      }
                    />
                  );
                }}
              </CreatePlayrollMutation>
            );
          }}
        </GetCurrentUserQuery>
        <ListCurrentUserPlayrollsQuery>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <ActivityIndicator color={'gray'} style={{ paddingTop: 50 }} />
              );
            }
            if (error) {
              return (
                <Text style={{ paddingTop: 50 }}>Error Loading Playrolls</Text>
              );
            }
            const playrolls = data && data.private.listCurrentUserPlayrolls;
            return (
              <View style={{ flex: 1 }}>
                <ScrollView>
                  {playrolls &&
                    playrolls.map(playroll => {
                      return (
                        <PlayrollCard
                          playroll={playroll}
                          viewPlayroll={() => {
                            this.props.navigation &&
                              // Navigate to "Playrolls" and merge in some params
                              // https://reactnavigation.org/docs/en/navigation-prop.html#navigate-link-to-other-screens
                              // https://reactnavigation.org/docs/en/navigation-prop.html#getparam-get-a-specific-param-value-with-a-fallback
                              this.props.navigation.navigate('ViewPlayroll', {
                                // managePlayroll: 'Manage Playroll',
                                playroll,
                              });
                          }}
                          editPlayroll={() =>
                            this.props.navigation &&
                            this.props.navigation.navigate('ManagePlayroll', {
                              managePlayroll: 'Manage Playroll',
                              playroll,
                            })
                          }
                          key={playroll.id}
                        />
                      );
                    })}
                </ScrollView>
              </View>
            );
          }}
        </ListCurrentUserPlayrollsQuery>
      </View>
    );
  }
}
