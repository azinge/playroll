/**
 * AddToPlayrollScreen
 */

import * as React from 'react';
import { Text, ActivityIndicator, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import { ListCurrentUserRecommendationsQuery } from '../../../graphql/requests/Recommendation/ListCurrentUserRecommendationsQuery';
import RecommendationCard from '../../shared/Cards/RecommendationCard';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import PlayrollList from '../../shared/Lists/PlayrollList';
import { ListCurrentUserPlayrollsQuery } from '../../../graphql/requests/Playroll';
import NavigationService from '../../../services/NavigationService';
import { CreateRollMutation } from '../../../graphql/requests/Roll';
import DropdownAlert from 'react-native-dropdownalert';
import { NavigationScreenProp } from 'react-navigation';
import { RollData, User } from '../../../graphql/types';
import { GET_CURRENT_USER_PLAYROLL } from '../../../graphql/requests/Playroll/GetCurrentUserPlayrollQuery';
import SearchSubHeader from '../../shared/SubHeaders/SearchSubHeader';
import { ListUserPlayrollsQuery } from '../../../graphql/requests/Playroll/ListUserPlayrollsQuery';
import EmptyDataFiller from '../../shared/Text/EmptyDataFiller';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  user: User;
}

export default class AddToPlayrollScreen extends React.Component<Props, State> {
  dropdown: DropdownAlert;

  constructor(props: Props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const user =
      this.props.navigation && this.props.navigation.getParam('user');
    this.setState({ user });
  }

  render() {
    const extractPlayrolls = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listUserPlayrolls;
    };
    return (
      <ListUserPlayrollsQuery
        variables={{ userID: this.state.user.id, offset: 0, count: 20 }}
      >
        {({ loading, error, data, refetch, fetchMore }) => {
          let playrolls = [];
          if (!loading && !error) {
            playrolls = extractPlayrolls(data);
          }
          return (
            <View style={{ flex: 1 }}>
              <SubScreenContainer
                title={`${this.state.user.name}'s Playrolls`}
                contentContainerStyle={{
                  marginTop: 10,
                  paddingBottom: hp('10%'),
                }}
                modal
                refreshing={loading}
                onRefresh={() => refetch()}
              >
                <SearchSubHeader />
                {this.renderPlayrolls(
                  playrolls,
                  () => {
                    fetchMore({
                      variables: {
                        offset: playrolls.length,
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        const prevPlayrolls = extractPlayrolls(prev);
                        const fetchMorePlayrolls = extractPlayrolls(
                          fetchMoreResult
                        );
                        if (!fetchMoreResult) return prev;
                        return Object.assign({}, prev, {
                          private: {
                            listUserPlayrolls: [
                              ...prevPlayrolls,
                              ...fetchMorePlayrolls,
                            ],
                            __typename: 'PrivateQueryMethods',
                          },
                        });
                      },
                    });
                  },
                  loading,
                  error
                )}
              </SubScreenContainer>
              <DropdownAlert ref={ref => (this.dropdown = ref)} />
            </View>
          );
        }}
      </ListUserPlayrollsQuery>
    );
  }

  renderPlayrolls(playrolls, onEndReached, loading, error) {
    if (!loading && playrolls.length <= 0) {
      return (
        <EmptyDataFiller
          text={
            error
              ? 'Could not load Playrolls'
              : `${this.state.user.name} has no Playrolls`
          }
          textSize={'h5'}
          textWidth={300}
        />
      );
    }
    return (
      <PlayrollList
        playrolls={playrolls}
        onPress={playroll => {
          NavigationService.navigate('ViewExternalPlayroll', {
            playroll,
          });
        }}
        hideCreator
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    );
  }
}
