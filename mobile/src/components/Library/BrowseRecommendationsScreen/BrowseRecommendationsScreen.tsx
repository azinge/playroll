/**
 * BrowseRecommendationsScreen
 */

import * as React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import { ListCurrentUserRecommendationsQuery } from '../../../graphql/requests/Recommendation/ListCurrentUserRecommendationsQuery';
import RecommendationCard from '../../shared/Cards/RecommendationCard';
import PlaceholderList from '../../shared/Lists/PlaceholderList';

export default class BrowseRecommendationsScreen extends React.Component {
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
      <SubScreenContainer
        title={'My Recommendations'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
      </SubScreenContainer>
    );
    // return (
    //   <ListCurrentUserRecommendationsQuery>
    //     {({ loading, error, data }) => {
    //       const recommendations = extractRecommendations(data);
    //       return (
    //         <SubScreenContainer
    //           title={'My Recommendations'}
    //           flatList={!loading && !error}
    //           contentContainerStyle={{ marginTop: 10 }}
    //           data={recommendations}
    //           keyExtractor={item => item.id}
    //           renderItem={({ item }) => {
    //             return (
    //               <RecommendationCard
    //                 recommendation={item}
    //                 onPress={() => {}}
    //               />
    //             );
    //           }}
    //         >
    //           {loading && (
    //             <ActivityIndicator color={'gray'} style={{ paddingTop: 50 }} />
    //           )}
    //           {error && (
    //             <Text style={{ paddingTop: 50 }}>
    //               Error Loading Recommendation
    //             </Text>
    //           )}
    //         </SubScreenContainer>
    //       );
    //     }}
    //   </ListCurrentUserRecommendationsQuery>
    // );
  }
}
