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
import { RollData } from '../../../graphql/types';
import { GET_CURRENT_USER_PLAYROLL } from '../../../graphql/requests/Playroll/GetCurrentUserPlayrollQuery';
import SearchSubHeader from '../../shared/SubHeaders/SearchSubHeader';
import EmptyDataFiller from '../../shared/Text/EmptyDataFiller';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  rollData: RollData;
  onSuccess: () => void;
}

export default class AddToPlayrollScreen extends React.Component<Props, State> {
  dropdown: DropdownAlert;

  constructor(props: Props) {
    super(props);

    this.state = {
      rollData: {},
      onSuccess: () => {},
    };
  }

  componentDidMount() {
    const rollData =
      this.props.navigation && this.props.navigation.getParam('rollData');
    const onSuccess =
      this.props.navigation && this.props.navigation.getParam('onSuccess');
    this.setState({ rollData, onSuccess });
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
      return data.private.listCurrentUserPlayrolls;
    };
    return (
      <ListCurrentUserPlayrollsQuery variables={{ offset: 0, count: 20 }}>
        {({ loading, error, data, refetch, fetchMore }) => {
          let playrolls = [];
          if (!loading && !error) {
            playrolls = extractPlayrolls(data);
          }
          return (
            <View style={{ flex: 1 }}>
              <SubScreenContainer
                title={'Add To Playroll'}
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
                            listCurrentUserPlayrolls: [
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
      </ListCurrentUserPlayrollsQuery>
    );
  }

  async createRollWrapper(createRoll, playroll) {
    try {
      await createRoll({
        variables: {
          input: {
            playrollID: playroll.id,
            data: this.state.rollData,
            order: playroll.rolls.length,
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

  renderPlayrolls(playrolls, onEndReached, loading, error) {
    if (!loading && playrolls.length <= 0) {
      return (
        <EmptyDataFiller
          text={error ? 'Could not load Playrolls' : 'Create some Playrolls!'}
          textSize={'h5'}
          textWidth={250}
        />
      );
    }
    return (
      <CreateRollMutation>
        {(createRoll, { loading, error, data }) => {
          return (
            <PlayrollList
              playrolls={playrolls}
              onPress={playroll => {
                this.createRollWrapper(createRoll, playroll);
              }}
              hideCreator
              onEndReached={onEndReached}
              onEndReachedThreshold={0.5}
            />
          );
        }}
      </CreateRollMutation>
    );
  }
}
