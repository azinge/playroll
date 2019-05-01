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
import EmptyDataFiller from '../../shared/Text/EmptyDataFiller';

import {
  ListCurrentUserPlayrollsQuery,
  CreatePlayrollMutation,
} from '../../../graphql/requests/Playroll/';
import NavigationService from '../../../services/NavigationService';
import { NavigationScreenProp } from 'react-navigation';
import { ListUserPlayrollsQuery } from '../../../graphql/requests/Playroll/ListUserPlayrollsQuery';
import PlayrollList from '../../shared/Lists/PlayrollList';
import Heading from '../../shared/Text/Heading';

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
    const extractCurrentUserPlayrolls = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listCurrentUserPlayrolls;
    };
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
        <View style={{ padding: 10, height: 500 }}>
          <View style={{ margin: 10, marginBottom: 0, flexDirection: 'row' }}>
            <Heading type={'h6'} alignment={'left'} style={{ flex: 2 }} bold>
              Your Playrolls
            </Heading>
            <Heading
              type={'h7'}
              alignment={'right'}
              opacity={0.7}
              style={{ flex: 1 }}
              onPress={() => {
                NavigationService.navigate('BrowsePlayrolls');
              }}
            >
              See All..
            </Heading>
          </View>
          <ListCurrentUserPlayrollsQuery variables={{ offset: 0, count: 5 }}>
            {({ data, loading, error, refetch }) => {
              if (loading) {
                return <ActivityIndicator />;
              }
              const playrolls = extractCurrentUserPlayrolls(data);
              return (
                <FlatList
                  data={playrolls}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={playroll => `${playroll.id}`}
                  extraData={this.state}
                  renderItem={({ item }) => (
                    <PlayrollCard
                      playroll={item}
                      onPress={playroll => {
                        NavigationService.navigate('ViewPlayroll', {
                          playroll,
                        });
                      }}
                    />
                  )}
                  ListEmptyComponent={() => {
                    return loading ? null : (
                      <View style={{ flex: 1, alignItems: 'center' }}>
                        <EmptyDataFiller
                          text={
                            error
                              ? 'Could not load Playrolls'
                              : `You have no Playrolls`
                          }
                          imgSize={70}
                          textWidth={250}
                          horizontal
                        />
                      </View>
                    );
                  }}
                />
              );
            }}
          </ListCurrentUserPlayrollsQuery>
        </View>
      </View>
    );
  }
}
