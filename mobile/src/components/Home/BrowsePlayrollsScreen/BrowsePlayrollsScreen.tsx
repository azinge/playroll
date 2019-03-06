/**
 * Application component for Playroll mobile application.
 */

import React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';

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
            if (!data || !data.currentUser) {
              return (
                <Header
                  backgroundColor='purple'
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
            return (
              <CreatePlayrollMutation
                variables={{
                  input: { name: 'New Playroll', userID: data.currentUser.id },
                }}
                onCompleted={data =>
                  this.props &&
                  this.props.navigation &&
                  this.props.navigation.navigate('Playrolls', {
                    playroll: data.createPlayroll,
                  })
                }
                refetchQueries={[LIST_CURRENT_USER_PLAYROLLS]}
              >
                {(createPlayroll, { data }) => {
                  return (
                    <Header
                      backgroundColor='purple'
                      centerComponent={{
                        text: 'Playrolls',
                        style: { color: '#fff', fontSize: 20 },
                      }}
                      rightComponent={
                        <Icon
                          name='add'
                          color='white'
                          underlayColor='purple'
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
            return (
              <View style={{ flex: 1 }}>
                {loading ? (
                  <ActivityIndicator
                    color={'gray'}
                    style={{ paddingTop: 50 }}
                  />
                ) : (
                  <ScrollView>
                    {data &&
                      data.listCurrentUserPlayrolls &&
                      data.listCurrentUserPlayrolls.map(playroll => {
                        return (
                          <PlayrollCard
                            playroll={playroll}
                            editPlayroll={() => {
                              this.props.navigation &&
                                this.props.navigation.navigate('Playrolls', {
                                  managePlayroll: 'Manage Playroll',
                                  playroll,
                                });
                            }}
                            key={playroll.id}
                          />
                        );
                      })}
                  </ScrollView>
                )}
              </View>
            );
          }}
        </ListCurrentUserPlayrollsQuery>
      </View>
    );
  }
}
