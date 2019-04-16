/**
 * SocialMenuScreen
 */

import * as React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { ListCurrentUserRecommendationsQuery } from '../../../graphql/requests/Recommendation/ListCurrentUserRecommendationsQuery';
import RecommendationCard from '../../shared/Cards/RecommendationCard';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import MainScreenContainer from '../../shared/Containers/MainScreenContainer';

export default class SocialMenuScreen extends React.Component {
  render() {
    return (
      <MainScreenContainer>
        <PlaceholderList
          numItems={20}
          title={'My Recommendations'}
          overlayText={'Coming Soon...'}
        />
      </MainScreenContainer>
    );
  }
}
