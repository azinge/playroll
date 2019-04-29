/**
 * RecommendToFriendScreen
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import { Button } from 'react-native-elements';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import NavigationService from '../../../services/NavigationService';
import { ListFriendsQuery } from '../../../graphql/requests/Relationships';
import { ActivityIndicator, View, Text } from 'react-native';
import FriendCard from '../../shared/Cards/FriendCard';
import {
  ListCurrentUserPlayrollsQuery,
  CreatePlayrollMutation,
} from '../../../graphql/requests/Playroll/';
import DropdownAlert from 'react-native-dropdownalert';
import { CreateRecommendationMutation } from '../../../graphql/requests/Recommendation/CreateRecommendationMutation';
import { RollData } from '../../../graphql/types';
import { GetCurrentUserQuery } from '../../../graphql/requests/User';
import SearchSubHeader from '../../shared/SubHeaders/SearchSubHeader';
import { LIST_SENT_RECOMMENDATIONS } from '../../../graphql/requests/Recommendation/ListSentRecommendationsQuery';
import { LIST_EXCHANGED_RECOMMENDATIONS } from '../../../graphql/requests/Recommendation/ListExchangedRecommendationsQuery';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  rollData: RollData;
  playrollID: number;
  onSuccess: () => void;
}

export default class RecommendToFriendScreen extends React.Component<
  Props,
  State
> {
  dropdown: DropdownAlert;

  constructor(props: Props) {
    super(props);

    this.state = {
      rollData: {},
      playrollID: 0,
      onSuccess: () => {},
    };
  }

  componentDidMount() {
    const rollData =
      this.props.navigation && this.props.navigation.getParam('rollData');
    const playrollID =
      this.props.navigation && this.props.navigation.getParam('playrollID');
    const onSuccess =
      this.props.navigation && this.props.navigation.getParam('onSuccess');
    this.setState({ rollData, playrollID, onSuccess });
  }

  async createRecommendationWrapper(createRecommendation, receiver, sender) {
    try {
      await createRecommendation({
        variables: {
          input: {
            userID: receiver.id,
            recommenderID: sender.id,
            isActive: true,
            data: this.state.rollData,
            playrollID: this.state.playrollID,
          },
        },
      });
      NavigationService.goBack();
      this.state.onSuccess();
    } catch (err) {
      console.log(err);
      this.dropdown.alertWithType(
        'error',
        'Error',
        "We're sorry, Please try again."
      );
    }
  }
  render() {
    // return (
    //   <SubScreenContainer
    //     title={'My Friends'}
    //     contentContainerStyle={{ marginTop: 10 }}
    //   >
    //     <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
    //   </SubScreenContainer>
    // );
    const extractFriends = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listFriends;
    };
    const extractCurrentUser = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return {};
      }
      return data.private.currentUser;
    };
    return (
      <ListFriendsQuery>
        {({ loading, error, data, refetch, fetchMore }) => {
          const friends = extractFriends(data);
          return (
            <CreateRecommendationMutation
              refetchQueries={() => [
                LIST_SENT_RECOMMENDATIONS,
                LIST_EXCHANGED_RECOMMENDATIONS,
              ]}
            >
              {createRecommendation => {
                return (
                  <View style={{ flex: 1 }}>
                    <SubScreenContainer
                      title={'Recommend To Friend'}
                      flatList
                      contentContainerStyle={{
                        marginTop: 10,
                        paddingBottom: hp('16%'),
                      }}
                      data={friends}
                      keyExtractor={item => item.id}
                      renderFlatListHeader={() => {
                        return (
                          <>
                            {error && (
                              <Text style={{ paddingTop: 50 }}>
                                Error Loading Friends
                              </Text>
                            )}
                            <SearchSubHeader />
                          </>
                        );
                      }}
                      renderItem={({ item }) => {
                        return (
                          <GetCurrentUserQuery>
                            {({ data: currentUserData }) => {
                              const currentUser = extractCurrentUser(
                                currentUserData
                              );
                              return (
                                <FriendCard
                                  friend={item}
                                  onPress={() => {
                                    this.createRecommendationWrapper(
                                      createRecommendation,
                                      item,
                                      currentUser
                                    );
                                  }}
                                />
                              );
                            }}
                          </GetCurrentUserQuery>
                        );
                      }}
                      modal
                      refreshing={loading}
                      onRefresh={() => refetch()}
                      onEndReached={() => {
                        fetchMore({
                          variables: {
                            offset: friends.length,
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            const prevFriends = extractFriends(prev);
                            const fetchMoreFriends = extractFriends(
                              fetchMoreResult
                            );
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              private: {
                                listFriends: [
                                  ...prevFriends,
                                  ...fetchMoreFriends,
                                ],
                                __typename: 'PrivateQueryMethods',
                              },
                            });
                          },
                        });
                      }}
                      onEndReachedThreshold={0.5}
                    />
                    <DropdownAlert ref={ref => (this.dropdown = ref)} />
                  </View>
                );
              }}
            </CreateRecommendationMutation>
          );
        }}
      </ListFriendsQuery>
    );
  }
}
