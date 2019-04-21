/**
 * RecommendationList
 */

import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import RecommendationCard from '../../Cards/RecommendationCard';
import { Recommendation } from '../../../../graphql/types';

export interface Props {
  recommendations: Recommendation[];
  onPress?: (recommendation) => void;
}

interface State {}

export default class RecommendationList extends React.Component<Props, State> {
  render() {
    const { recommendations, onPress } = this.props;
    return (
      <FlatList
        data={recommendations}
        showsVerticalScrollIndicator={false}
        keyExtractor={recommendation => `${recommendation.id}`}
        extraData={this.state}
        renderItem={({ item }) => (
          <RecommendationCard recommendation={item} onPress={onPress} />
        )}
      />
    );
  }
}
