/**
 * RecommendationCard
 */

import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import styles from './RecommendationCard.styles';
import { Recommendation } from '../../../../graphql/types';
import { Icon } from 'react-native-elements';
import NavigationService from '../../../../services/NavigationService';

export interface Props {
  recommendation: Recommendation;
  onPress?: (recommendation: Recommendation) => void;
}

interface State {}

export default class RecommendationCard extends React.Component<Props, State> {
  render() {
    const { recommendation } = this.props;
    const mainSource =
      (recommendation.data &&
        recommendation.data.sources &&
        recommendation.data.sources[0]) ||
      {};
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress(recommendation)}
        key={recommendation.id}
      >
        <View
          style={{ width: '100%', alignItems: 'center' }}
          key={recommendation.id}
        >
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <Image style={styles.cover} source={{ uri: mainSource.cover }} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.artist} numberOfLines={2}>
                {mainSource.name}
              </Text>
              <Text style={styles.noArtist} numberOfLines={2}>
                {mainSource.creator}
              </Text>
            </View>
            <Icon
              size={35}
              name='more-vert'
              color='lightgrey'
              underlayColor='rgba(255,255,255,0)'
              onPress={() => NavigationService.goBack()}
            />
          </View>
          <View style={styles.spacing} />
        </View>
      </TouchableOpacity>
    );
  }
}
