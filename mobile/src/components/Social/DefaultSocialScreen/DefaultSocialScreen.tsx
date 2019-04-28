/**
 * DefaultSocialScreen
 */

import * as React from 'react';
import {
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainScreenContainer from '../../shared/Containers/MainScreenContainer';
import { ListCurrentUserRecommendationsQuery } from '../../../graphql/requests/Recommendation/ListCurrentUserRecommendationsQuery';
import RecommendationCard from '../../shared/Cards/RecommendationCard';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import { Icon } from 'react-native-elements';
import RecommendationList from '../../shared/Lists/RecommendationList';
import Heading from '../../shared/Text/Heading';
import HorizontalPlaceholderList from '../../shared/Lists/HorizontalPlaceholderList';
import NavigationService from '../../../services/NavigationService';
import { ListFriendsPlayrollsQuery } from '../../../graphql/requests/Playroll/ListFriendsPlayrollsQuery';
import HorizontalPlayrollList from '../../shared/Lists/HorizontalPlayrollList';
import { ListFriendsQuery } from '../../../graphql/requests/Relationships';
import { Playroll, User } from '../../../graphql/types';
import { NavigationScreenProp } from 'react-navigation';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  triggerRefetchFriends: boolean;
  triggerRefetchFriendsPlayrolls: boolean;
  triggerRefetchRecommendations: boolean;
}

export default class DefaultSocialScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      triggerRefetchFriends: false,
      triggerRefetchFriendsPlayrolls: false,
      triggerRefetchRecommendations: false,
    };
  }

  render() {
    const extractFriends = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listFriends;
    };
    const extractRecommendations = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listCurrentUserRecommendations;
    };
    const extractFriendsPlayrolls = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listFriendsPlayrolls;
    };
    return (
      <ListCurrentUserRecommendationsQuery>
        {({ loading, error, data, refetch }) => {
          if (this.state.triggerRefetchRecommendations) {
            this.setState({ triggerRefetchRecommendations: false }, () => {
              refetch();
            });
          }
          const recommendations = extractRecommendations(data);
          return (
            <MainScreenContainer
              contentContainerStyle={{
                marginTop: 10,
                paddingBottom: hp('12.1%'),
              }}
              onRefresh={() =>
                this.setState({
                  triggerRefetchFriends: true,
                  triggerRefetchFriendsPlayrolls: true,
                  triggerRefetchRecommendations: true,
                })
              }
              refreshing={false}
            >
              <View style={{ marginBottom: 10 }}>
                <View style={{ margin: 10, flexDirection: 'row' }}>
                  <Heading
                    type={'h6'}
                    alignment={'left'}
                    style={{ flex: 2 }}
                    bold
                  >
                    Your Friends
                  </Heading>
                  <Heading
                    type={'h7'}
                    alignment={'right'}
                    opacity={0.7}
                    style={{ flex: 1 }}
                    onPress={() => {
                      NavigationService.navigate('BrowseFriends');
                    }}
                  >
                    See All..
                  </Heading>
                </View>
                <View>
                  <ListFriendsQuery>
                    {({ data, loading, error, refetch }) => {
                      if (this.state.triggerRefetchFriends) {
                        this.setState({ triggerRefetchFriends: false }, () => {
                          refetch();
                        });
                      }
                      if (loading) {
                        return <ActivityIndicator />;
                      }
                      const friends = extractFriends(data);
                      return (
                        <FlatList
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          data={friends.slice(0, 20)}
                          keyExtractor={(_, i) => `${i}`}
                          renderItem={({ item: friend }: { item: User }) => (
                            <TouchableOpacity
                              onPress={() => {
                                NavigationService.navigate('ViewProfile', {
                                  userID: friend.id,
                                });
                              }}
                            >
                              <View>
                                <Image
                                  source={{ uri: friend.avatar }}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    marginHorizontal: 10,
                                    borderRadius: 25,
                                    borderWidth: 1,
                                    borderColor: '#af00bc99',
                                  }}
                                />
                                <Heading type={'h10'} width={70} numLines={1}>
                                  {friend.name}
                                </Heading>
                              </View>
                            </TouchableOpacity>
                          )}
                        />
                      );
                    }}
                  </ListFriendsQuery>
                </View>
              </View>
              <View style={{ margin: 10, flexDirection: 'row' }}>
                <Heading
                  type={'h6'}
                  alignment={'left'}
                  style={{ flex: 2 }}
                  bold
                >
                  Friends Playrolls
                </Heading>
                <Heading
                  type={'h7'}
                  alignment={'right'}
                  opacity={0.7}
                  style={{ flex: 1 }}
                  onPress={() => {
                    NavigationService.navigate('BrowseFriendsPlayrolls');
                  }}
                >
                  See All..
                </Heading>
              </View>

              <ListFriendsPlayrollsQuery>
                {({ data, loading, error, refetch }) => {
                  if (this.state.triggerRefetchFriendsPlayrolls) {
                    this.setState(
                      { triggerRefetchFriendsPlayrolls: false },
                      () => {
                        refetch();
                      }
                    );
                  }
                  if (loading) {
                    return <ActivityIndicator />;
                  }
                  const playrolls = extractFriendsPlayrolls(data);
                  return (
                    <HorizontalPlayrollList
                      playrolls={playrolls.slice(0, 5)}
                      onPress={playroll => {
                        NavigationService.navigate('ViewExternalPlayroll', {
                          playroll,
                        });
                      }}
                    />
                  );
                }}
              </ListFriendsPlayrollsQuery>
              <View>
                <View style={{ margin: 10, flexDirection: 'row' }}>
                  <Heading
                    type={'h6'}
                    alignment={'left'}
                    style={{ flex: 2 }}
                    bold
                  >
                    Recommendations
                  </Heading>
                  <Heading
                    type={'h7'}
                    alignment={'right'}
                    opacity={0.7}
                    style={{ flex: 1 }}
                    onPress={() => {
                      NavigationService.navigate('BrowseRecommendations');
                    }}
                  >
                    See All...
                  </Heading>
                </View>
                {loading && (
                  <ActivityIndicator
                    color={'gray'}
                    style={{ paddingTop: 50 }}
                  />
                )}
                {!loading && (
                  <RecommendationList
                    recommendations={recommendations.slice(0, 5)}
                    onPress={() => {}}
                  />
                )}
              </View>
              {error && (
                <Text style={{ paddingTop: 50 }}>
                  Error Loading Recommendation
                </Text>
              )}
            </MainScreenContainer>
          );
        }}
      </ListCurrentUserRecommendationsQuery>
    );
  }
}
