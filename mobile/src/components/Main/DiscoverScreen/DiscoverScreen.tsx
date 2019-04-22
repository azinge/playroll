/**
 * DiscoverScreen
 */

import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo';
import { Icon } from 'react-native-elements';

import NavigationService from '../../../services/NavigationService';
import HorizontalMusicSourceList from '../../shared/Lists/HorizontalMusicSourceList';
import { musicSources } from '../../../static/mockData';
import MainScreenContainer from '../../shared/Containers/MainScreenContainer';
import HorizontalPlaceholderList from '../../shared/Lists/HorizontalPlaceholderList';
import { ListFeaturedPlayrollsQuery } from '../../../graphql/requests/Playroll/ListFeaturedPlayrollsQuery';
import HorizontalPlayrollList from '../../shared/Lists/HorizontalPlayrollList';
import { ListNewReleasePlayrollsQuery } from '../../../graphql/requests/Playroll/ListNewReleasePlayrollsQuery';
import { ListPopularPlayrollsQuery } from '../../../graphql/requests/Playroll/ListPopularPlayrollsQuery';
import Heading from '../../shared/Text/Heading';
import DropdownAlert from 'react-native-dropdownalert';

export interface Props {}

interface State {}

export default class DiscoverScreen extends React.Component<Props, State> {
  dropdown: DropdownAlert;
  render() {
    const extractFeaturedPlayrolls = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listFeaturedPlayrolls;
    };
    const extractNewReleasePlayrolls = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listNewReleasePlayrolls;
    };
    const extractPopularPlayrolls = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listPopularPlayrolls;
    };
    return (
      <View style={{ flex: 1 }}>
        <MainScreenContainer hideSearchIcon hideBottomBar disableBounce>
          <View style={{ flex: 1, marginBottom: 50 }}>
            <LinearGradient
              colors={['purple', 'white']}
              style={{ height: 200, alignItems: 'center', flex: 1 }}
            >
              <Text
                style={{
                  marginTop: 40,
                  marginBottom: 20,
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: 'white',
                }}
              >
                Discover
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: 'purple',
                  width: 300,
                  padding: 5,
                  borderRadius: 10,
                  alignItems: 'flex-start',
                }}
                onPress={() => NavigationService.navigate('Search')}
              >
                <Icon
                  name='search'
                  color='white'
                  containerStyle={{ marginLeft: 5 }}
                />
              </TouchableOpacity>
            </LinearGradient>
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
              {({ loading, data, error }) => {
                if (loading) {
                  return <ActivityIndicator />;
                }
                const playrolls = extractFeaturedPlayrolls(data);
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
            </ListFeaturedPlayrollsQuery>
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 15,
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
              {({ loading, data, error }) => {
                if (loading) {
                  return <ActivityIndicator />;
                }
                const playrolls = extractNewReleasePlayrolls(data);
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
                marginTop: 15,
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
              {({ loading, data, error }) => {
                if (loading) {
                  return <ActivityIndicator />;
                }
                const playrolls = extractPopularPlayrolls(data);
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
            </ListPopularPlayrollsQuery>
          </View>
        </MainScreenContainer>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </View>
    );
  }
}
