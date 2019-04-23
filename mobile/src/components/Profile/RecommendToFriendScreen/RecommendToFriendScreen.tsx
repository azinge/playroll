/**
 * RecommendToFriendScreen
 */

import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
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

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  rollData: RollData;
  playrollID: number;
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
    };
  }

  componentDidMount() {
    const rollData =
      this.props.navigation && this.props.navigation.getParam('rollData');
    const playrollID =
      this.props.navigation && this.props.navigation.getParam('playrollID');
    this.setState({ rollData, playrollID });
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
      // this.dropdown.alertWithType(
      //   'info',
      //   'Recommended To Friend',
      //   'Successfully Recommended to Friend.'
      // );
      NavigationService.goBack();
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
        {({ loading, error, data }) => {
          const friends = extractFriends(data);
          return (
            <CreateRecommendationMutation>
              {createRecommendation => {
                return (
                  <View style={{ flex: 1 }}>
                    <SubScreenContainer
                      title={'Recommend To Friend'}
                      flatList={!loading && !error}
                      contentContainerStyle={{ marginTop: 10 }}
                      data={friends}
                      keyExtractor={item => item.id}
                      renderFlatListHeader={() => {
                        return <SearchSubHeader />;
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
                    >
                      {loading && (
                        <ActivityIndicator
                          color={'gray'}
                          style={{ paddingTop: 50 }}
                        />
                      )}
                      {error && (
                        <Text style={{ paddingTop: 50 }}>
                          Error Loading Friends
                        </Text>
                      )}
                    </SubScreenContainer>
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
