/**
 * HomeScreen
 */

import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Permissions, Notifications } from 'expo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import HomeCarousel from './HomeCarousel';
import MainScreenContainer from '../../shared/Containers/MainScreenContainer';
import HorizontalPlaceholderList from '../../shared/Lists/HorizontalPlaceholderList';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import Heading from '../../shared/Text/Heading';
import NavigationService from '../../../services/NavigationService';
import { Icon } from 'react-native-elements';
import DropdownAlert from 'react-native-dropdownalert';
import PlayrollList from '../../shared/Lists/PlayrollList';
import { ListPopularPlayrollsQuery } from '../../../graphql/requests/Playroll/ListPopularPlayrollsQuery';
import HorizontalPlayrollList from '../../shared/Lists/HorizontalPlayrollList';
import { ListNewReleasePlayrollsQuery } from '../../../graphql/requests/Playroll/ListNewReleasePlayrollsQuery';
import { ListFeaturedPlayrollsQuery } from '../../../graphql/requests/Playroll/ListFeaturedPlayrollsQuery';
import EmptyDataFiller from '../../shared/Text/EmptyDataFiller';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  triggerRefetchFeaturedPlayrolls: boolean;
  triggerRefetchNewReleasePlayrolls: boolean;
  triggerRefetchPopularPlayrolls: boolean;
}

export default class HomeScreen extends React.Component<Props, State> {
  dropdown: DropdownAlert;

  constructor(props: Props) {
    super(props);
    this.state = {
      triggerRefetchFeaturedPlayrolls: false,
      triggerRefetchNewReleasePlayrolls: false,
      triggerRefetchPopularPlayrolls: false,
    };
  }

  render() {
    const extractNewReleasePlayrolls = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listNewReleasePlayrolls;
    };
    const extractPopularPlayrolls = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listPopularPlayrolls;
    };
    const extractFeaturedPlayrolls = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listFeaturedPlayrolls;
    };
    return (
      <View style={{ flex: 1 }}>
        <MainScreenContainer
          onRefresh={() =>
            this.setState({
              triggerRefetchFeaturedPlayrolls: true,
              triggerRefetchNewReleasePlayrolls: true,
              triggerRefetchPopularPlayrolls: true,
            })
          }
          contentContainerStyle={{ paddingBottom: hp('10%') }}
          refreshing={false}
        >
          <View style={{ marginTop: 5, flex: 1 }}>
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Heading type={'h6'} alignment={'left'} style={{ flex: 2 }} bold>
                Featured Playrolls
              </Heading>
              <Icon
                name={'info-outline'}
                color={'purple'}
                onPress={() => {
                  this.dropdown.alertWithType(
                    'info',
                    '',
                    "The data provided here is currently a curated list. In a future update, you'll have more personalized suggestions!"
                  );
                }}
              />
            </View>
            <ListFeaturedPlayrollsQuery>
              {({ loading, data, error, refetch }) => {
                if (this.state.triggerRefetchFeaturedPlayrolls) {
                  this.setState(
                    { triggerRefetchFeaturedPlayrolls: false },
                    () => {
                      refetch();
                    }
                  );
                }
                if (loading) {
                  return (
                    <View style={{ height: 220 }}>
                      <ActivityIndicator />
                    </View>
                  );
                }
                const playrolls = extractFeaturedPlayrolls(data);
                if (playrolls.length <= 0) {
                  return (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        height: 220,
                      }}
                    >
                      <EmptyDataFiller
                        imgSize={70}
                        text={
                          error
                            ? 'Could not load Featured Playrolls'
                            : 'No Featured Playrolls Found'
                        }
                        textWidth={250}
                        horizontal
                      />
                    </View>
                  );
                }
                return <HomeCarousel numItems={5} playrolls={playrolls} />;
              }}
            </ListFeaturedPlayrollsQuery>

            <View
              style={{
                marginHorizontal: 10,
                marginTop: 5,
                marginBottom: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Heading type={'h6'} alignment={'left'} style={{ flex: 2 }} bold>
                New Releases
              </Heading>
              <Icon
                name={'info-outline'}
                color={'purple'}
                onPress={() => {
                  this.dropdown.alertWithType(
                    'info',
                    '',
                    "The data provided here is currently a curated list. In a future update, you'll have more personalized suggestions!"
                  );
                }}
              />
            </View>
            <ListNewReleasePlayrollsQuery>
              {({ data, loading, error, refetch }) => {
                if (this.state.triggerRefetchNewReleasePlayrolls) {
                  this.setState(
                    { triggerRefetchNewReleasePlayrolls: false },
                    () => {
                      refetch();
                    }
                  );
                }
                if (loading) {
                  return (
                    <View style={{ height: 150 }}>
                      <ActivityIndicator />
                    </View>
                  );
                }
                const playrolls = extractNewReleasePlayrolls(data);
                if (playrolls.length <= 0) {
                  return (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        height: 150,
                      }}
                    >
                      <EmptyDataFiller
                        imgSize={70}
                        text={
                          error
                            ? 'Could not load New Releases'
                            : 'No New Releases Found'
                        }
                        textWidth={250}
                        horizontal
                      />
                    </View>
                  );
                }
                return (
                  <HorizontalPlayrollList
                    playrolls={playrolls}
                    onPress={playroll => {
                      NavigationService.navigate('ViewExternalPlayroll', {
                        playroll,
                      });
                    }}
                  />
                );
              }}
            </ListNewReleasePlayrollsQuery>
            <View
              style={{
                marginHorizontal: 10,
                marginVertical: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Heading type={'h6'} alignment={'left'} style={{ flex: 2 }} bold>
                Popular Playrolls
              </Heading>
              <Icon
                name={'info-outline'}
                color={'purple'}
                onPress={() => {
                  this.dropdown.alertWithType(
                    'info',
                    '',
                    "The data provided here is currently a curated list. In a future update, you'll have more personalized suggestions!"
                  );
                }}
              />
            </View>
            <ListPopularPlayrollsQuery>
              {({ data, loading, error, refetch }) => {
                if (this.state.triggerRefetchPopularPlayrolls) {
                  this.setState(
                    { triggerRefetchPopularPlayrolls: false },
                    () => {
                      refetch();
                    }
                  );
                }
                if (loading) {
                  return <ActivityIndicator />;
                }
                const playrolls = extractPopularPlayrolls(data);
                if (playrolls.length <= 0) {
                  return (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                      }}
                    >
                      <EmptyDataFiller
                        imgSize={70}
                        text={
                          error
                            ? 'Could not load Popular Playrolls'
                            : 'No Popular Playrolls Found'
                        }
                        textWidth={250}
                        horizontal
                      />
                    </View>
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
                  />
                );
              }}
            </ListPopularPlayrollsQuery>
          </View>
        </MainScreenContainer>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </View>
    );
  }
}
