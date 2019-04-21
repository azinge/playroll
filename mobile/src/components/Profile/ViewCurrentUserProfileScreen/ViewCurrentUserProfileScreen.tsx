/**
 * ViewCurrentUserProfileScreen
 */

import * as React from 'react';
import ProfileScreenContainer from '../../shared/Containers/ProfileScreenContainer';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { GetCurrentUserQuery } from '../../../graphql/requests/User';
import PlayrollCard from '../../shared/Cards/PlayrollCard';
import { Button, ListItem } from 'react-native-elements';
import { Playroll, User } from '../../../graphql/types';
import Icons from '../../../themes/Icons';
import { LIST_CURRENT_USER_PLAYROLLS } from '../../../graphql/requests/Playroll/ListCurrentUserPlayrollsQuery';
import PlaceholderList from '../../shared/Lists/PlaceholderList';

import {
  ListCurrentUserPlayrollsQuery,
  CreatePlayrollMutation,
} from '../../../graphql/requests/Playroll/';
import NavigationService from '../../../services/NavigationService';
import { NavigationScreenProp } from 'react-navigation';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class ViewCurrentUserProfileScreen extends React.Component<
  Props,
  State
> {
  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ marginHorizontal: 20, marginBottom: 5, marginTop: 10 }}
      onPress={() =>
        NavigationService.navigate('ViewPlayroll', { playroll: item })
      }
    >
      <ListItem
        title={item.name}
        titleStyle={{ color: 'purple' }}
        subtitle={item.type}
        leftAvatar={{
          source: { uri: item.cover },
        }}
        containerStyle={{
          borderColor: 'white',
          borderRadius: 10,
          shadowColor: 'gray',
          shadowOffset: {
            width: 2,
            height: 1,
          },
          shadowRadius: 3,
          shadowOpacity: 0.2,
          overflow: 'visible',
        }}
      />
    </TouchableOpacity>
  )

  render() {
    const userID =
      this.props.navigation && this.props.navigation.getParam('userID');
    return (
      <View style={{ flex: 1 }}>
        <GetCurrentUserQuery>
          {({ loading, error, data }) => {
            if (loading || error || Object.keys(data).length === 0) {
              return (
                <ProfileScreenContainer
                  title='My Public Profile'
                  image={{ uri: '' }}
                />
              );
            }
            const currentUser = (data && data.private.currentUser) || {};
            return (
              <ProfileScreenContainer
                title='My Public Profile'
                image={{ uri: currentUser.avatar }}
                local
                name={currentUser.name}
                userID={userID}
              >
                {this.renderContent(currentUser)}
              </ProfileScreenContainer>
            );
          }}
        </GetCurrentUserQuery>
      </View>
    );
  }

  renderContent(user: User) {
    // const extractPlayrolls = data => {
    //   if (
    //     Object.keys(data).length === 0 ||
    //     Object.keys(data.private).length === 0
    //   ) {
    //     return [];
    //   }
    //   return data.private.listCurrentUserPlayrolls;
    // };
    return (
      <View
        style={{
          width: '100%',
          top: 120,
          marginBottom: '35%',
          height: '80%',
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <View style={{ alignItems: 'center', marginVertical: 10 }}>
            <Image
              source={{ uri: user.avatar }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: '#993399',
                top: 5,
              }}
            >
              {user.name}
            </Text>
          </View>
          {
            <Button
              raised
              containerStyle={{ width: '50%' }}
              buttonStyle={{
                borderRadius: 80,
                height: 40,
                backgroundColor: 'purple',
              }}
              title={'View My Friends'}
              titleStyle={{ fontSize: 16 }}
              onPress={() => {
                NavigationService.navigate('BrowseFriends');
              }}
            />
            /* <Button
                linearGradientProps={{
                  colors: ['#DA22FF', '#00c6ff'],
                  start: { x: 0 },
                  end: { x: 1 },
                }}
                containerStyle={{
                  borderRadius: 80,
                  width: '75%',
                  position: 'absolute',
                  top: 20,
                  // bottom: 5,
                  height: 50,
                }}
                buttonStyle={{ borderRadius: 80, height: 50 }}
                raised
                title={'Create New Playroll'}
                titleStyle={{ fontWeight: 'bold' }}
                onPress={() => {
                  // createPlayroll();
                }}
              /> */
          }
        </View>
        <View style={{ padding: 10 }}>
          <PlaceholderList
            title={`${user.name}'s Playrolls`}
            numItems={10}
            overlayText={'Coming Soon...'}
          />
        </View>
        {/*
        <ListCurrentUserPlayrollsQuery>
          {({ loading, error, data }) => {
            const playrolls = extractPlayrolls(data);
            const success = !loading && !error;
            return (
              <View
                style={
                  {
                    // flex: 1,
                    // paddingBottom: 50
                    // TODO(ianlizzo): Fix this pls
                  }
                }
              >
                <View style={{ paddingTop: 20 }}>
                  <FlatList
                    data={playrolls}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this._renderItem}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    // style={{height: '100%'}}
                  />
                  {loading && (
                    <ActivityIndicator
                      color={'gray'}
                      style={{ paddingTop: 50 }}
                    />
                  )}
                  {error && (
                    <Text style={{ paddingTop: 50 }}>
                      Error Loading Playrolls
                    </Text>
                  )}
                  <View style={{ margin: 10 }} />
                  {playrolls.length === 0 && <Text> No Playrolls added</Text>}
                </View>
              </View>
            );
          }}
        </ListCurrentUserPlayrollsQuery> */}
      </View>
    );
  }
}
