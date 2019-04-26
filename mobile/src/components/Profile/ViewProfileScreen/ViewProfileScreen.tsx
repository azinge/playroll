/**
 * ViewProfileScreen
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
import { GetUserQuery } from '../../../graphql/requests/User/GetUserQuery';
import { NavigationScreenProp } from 'react-navigation';
import ManageRelationshipButton from './ManageRelationshipButton';
import { ListUserPlayrollsQuery } from '../../../graphql/requests/Playroll/ListUserPlayrollsQuery';
import PlayrollList from '../../shared/Lists/PlayrollList';
import Heading from '../../shared/Text/Heading';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class ViewProfileScreen extends React.Component<Props, State> {
  _renderItem = ({ item }: { item: Playroll }) => {
    let image = '';

    if (
      item.rolls &&
      item.rolls.length > 0 &&
      item.rolls[0].data &&
      item.rolls[0].data.sources &&
      item.rolls[0].data.sources.length > 0
    ) {
      image = item.rolls[0].data.sources[0].cover;
    }

    return (
      <TouchableOpacity
        style={{ marginHorizontal: 20, marginBottom: 5, marginTop: 10 }}
        onPress={() =>
          NavigationService.navigate('ViewPlayroll', { playroll: item })
        }
      >
        <ListItem
          title={item.name}
          titleStyle={{ color: 'purple' }}
          leftAvatar={{
            source: { uri: image },
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
    );
  }

  render() {
    const userID =
      this.props.navigation && this.props.navigation.getParam('userID');
    return (
      <View style={{ flex: 1 }}>
        <GetUserQuery variables={{ id: userID }}>
          {({ loading, error, data }) => {
            if (loading || error || Object.keys(data).length === 0) {
              return (
                <ProfileScreenContainer
                  title='View Profile'
                  image={{ uri: '' }}
                  refreshing={loading}
                />
              );
            }
            const user = (data && data.private.user) || {};
            return (
              <ProfileScreenContainer
                title={'View Profile'}
                image={{ uri: '' }}
                name={user.name}
                userID={userID}
                refreshing={true}
              >
                {this.renderContent(user)}
              </ProfileScreenContainer>
            );
          }}
        </GetUserQuery>
      </View>
    );
  }

  renderContent(user: User) {
    const extractUserPlayrolls = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listUserPlayrolls;
    };
    const relationshipID =
      user && user.relationships && user.relationships.length > 0
        ? user.relationships[0].id
        : undefined;
    return (
      <View
        style={{ width: '100%', top: 120, marginBottom: '35%', height: '80%' }}
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
          <ManageRelationshipButton
            user={user}
            relationshipID={relationshipID}
          />
          {/* <Button
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
              /> */}
        </View>
        <View style={{ padding: 10, height: 500 }}>
          <View style={{ margin: 10, flexDirection: 'row' }}>
            <Heading type={'h6'} alignment={'left'} style={{ flex: 2 }} bold>
              Playrolls
            </Heading>
            <Heading
              type={'h7'}
              alignment={'right'}
              opacity={0.7}
              style={{ flex: 1 }}
              onPress={() => {
                NavigationService.navigate('BrowseUserPlayrolls', { user });
              }}
            >
              See All..
            </Heading>
          </View>
          <ListUserPlayrollsQuery
            variables={{ userID: user.id, offset: 0, count: 5 }}
          >
            {({ data, loading, error, refetch }) => {
              if (loading) {
                return <ActivityIndicator />;
              }
              const playrolls = extractUserPlayrolls(data);
              return (
                <FlatList
                  data={playrolls}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(playroll: Playroll) => `${playroll.id}`}
                  extraData={this.state}
                  renderItem={({ item }) => (
                    <PlayrollCard
                      playroll={item}
                      onPress={playroll => {
                        NavigationService.navigate('ViewExternalPlayroll', {
                          playroll,
                        });
                      }}
                    />
                  )}
                />
              );
            }}
          </ListUserPlayrollsQuery>
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
