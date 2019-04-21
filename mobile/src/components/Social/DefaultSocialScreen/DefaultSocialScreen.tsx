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
} from 'react-native';
import MainScreenContainer from '../../shared/Containers/MainScreenContainer';
import { ListCurrentUserRecommendationsQuery } from '../../../graphql/requests/Recommendation/ListCurrentUserRecommendationsQuery';
import RecommendationCard from '../../shared/Cards/RecommendationCard';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import { Icon } from 'react-native-elements';
import RecommendationList from '../../shared/Lists/RecommendationList';
import Heading from '../../shared/Text/Heading';
import HorizontalPlaceholderList from '../../shared/Lists/HorizontalPlaceholderList';
import NavigationService from '../../../services/NavigationService';

export default class DefaultSocialScreen extends React.Component {
  render() {
    const extractRecommendations = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listCurrentUserRecommendations;
    };
    return (
      <ListCurrentUserRecommendationsQuery>
        {({ loading, error, data }) => {
          const recommendations = extractRecommendations(data);
          return (
            <MainScreenContainer contentContainerStyle={{ marginTop: 10 }}>
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
                    type={'h6'}
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
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={Array(10).fill('')}
                    keyExtractor={(_, i) => `${i}`}
                    renderItem={() => (
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          marginHorizontal: 10,
                          backgroundColor: 'lightgrey',
                          borderRadius: 25,
                          opacity: 0.5,
                        }}
                      />
                    )}
                  />
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
                  type={'h6'}
                  alignment={'right'}
                  opacity={0.7}
                  style={{ flex: 1 }}
                  disabled
                >
                  See All..
                </Heading>
              </View>

              <View style={{ height: 175 }}>
                <HorizontalPlaceholderList
                  numItems={10}
                  overlayText={'Coming Soon...'}
                />
              </View>

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
                    type={'h6'}
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
                    recommendations={recommendations}
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
