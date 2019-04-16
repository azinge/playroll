/**
 * DefaultSocialScreen
 */

import * as React from 'react';
import { Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import MainScreenContainer from '../../shared/Containers/MainScreenContainer';
import { ListCurrentUserRecommendationsQuery } from '../../../graphql/requests/Recommendation/ListCurrentUserRecommendationsQuery';
import RecommendationCard from '../../shared/Cards/RecommendationCard';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import { Icon } from 'react-native-elements';

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
            <MainScreenContainer
              flatList={!loading && !error}
              contentContainerStyle={{ marginTop: 10 }}
              data={recommendations}
              keyExtractor={item => item.id}
              renderFlatListHeader={() => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'purple',
                      width: 300,
                      padding: 5,
                      borderRadius: 10,
                      alignItems: 'flex-start',
                    }}
                    onPress={() => {}}
                  >
                    <Icon
                      name='search'
                      color='white'
                      containerStyle={{ marginLeft: 5 }}
                    />
                  </TouchableOpacity>
                );
              }}
              renderItem={({ item }) => {
                return (
                  <RecommendationCard
                    recommendation={item}
                    onPress={() => {}}
                  />
                );
              }}
            >
              {loading && (
                <ActivityIndicator color={'gray'} style={{ paddingTop: 50 }} />
              )}
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
