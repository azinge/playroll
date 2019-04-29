/**
 * RecommendationCard
 */

import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Swipeout from 'react-native-swipeout';
import Carousel from 'react-native-snap-carousel';

import styles from './RecommendationCard.styles';
import { Recommendation, MusicSource, Roll } from '../../../../graphql/types';
import { Icon } from 'react-native-elements';
import NavigationService from '../../../../services/NavigationService';
import { DismissRecommendationMutation } from '../../../../graphql/requests/Recommendation/DismissRecommendationMutation';
import { LIST_CURRENT_USER_RECOMMENDATIONS } from '../../../../graphql/requests/Recommendation/ListCurrentUserRecommendationsQuery';
import PlayrollCard from '../PlayrollCard';
import Heading from '../../Text/Heading';

export interface Props {
  recommendation: Recommendation;
  onPress?: (recommendation: Recommendation) => void;
  senderView?: boolean;
  readOnly?: boolean;
  hideRecommender?: boolean;
  disableManage?: boolean;
}

interface State {}

export default class RecommendationCard extends React.Component<Props, State> {
  render() {
    const { recommendation } = this.props;

    return (
      <DismissRecommendationMutation
        variables={{ recommendationID: recommendation.id }}
        refetchQueries={() => [LIST_CURRENT_USER_RECOMMENDATIONS]}
      >
        {dismissRecommendation => {
          return (
            <View
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: 'lightgrey',
              }}
            >
              <Swipeout
                right={[
                  {
                    text: 'Dismiss',
                    backgroundColor: '#c70700',
                    onPress: () => {
                      dismissRecommendation();
                    },
                  },
                ]}
                backgroundColor={'transparent'}
                autoClose={true}
                disabled={this.props.readOnly}
              >
                {recommendation.playrollID && recommendation.playrollID !== '0'
                  ? this.renderPlayrollRecommendation(recommendation)
                  : this.renderRollRecommendation(recommendation)}
                {/* <View style={styles.spacing} /> */}
              </Swipeout>
            </View>
          );
        }}
      </DismissRecommendationMutation>
    );
  }
  manageRoll(currentSource, rollData) {
    NavigationService.navigate('ManageRoll', {
      rollData,
      currentSource,
    });
  }
  _renderItem({ item, index }: { item: Roll; index: number }) {
    let source: MusicSource | null = null;
    if (item.data && item.data.sources && item.data.sources.length > 0) {
      source = item.data.sources[0];
    }
    return (
      <View style={{ height: 100 }} key={index}>
        {source && (
          <Image
            source={{ uri: source.cover }}
            style={{ height: 75, width: 75, borderRadius: 5, marginRight: 5 }}
          />
        )}
      </View>
    );
  }
  renderPlayrollRecommendation(recommendation: Recommendation) {
    const playroll = recommendation.playroll;
    let creator = '';
    if (playroll.user && playroll.user.name) {
      if (playroll.user.accountType === 'Managed') {
        creator = 'Playroll';
      } else {
        creator = playroll.user.name;
      }
    }
    console.log(recommendation);
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationService.navigate('ViewExternalPlayroll', {
            playroll: recommendation.playroll,
          });
        }}
        disabled={this.props.disableManage}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ margin: 7, height: 80 }}>
            {playroll.rolls && playroll.rolls.length > 0 ? (
              <Carousel
                data={playroll.rolls}
                renderItem={this._renderItem}
                hasParallaxImages={false}
                sliderWidth={100}
                itemWidth={70}
                itemHeight={70}
                loop={true}
              />
            ) : (
              <Image
                source={{
                  uri:
                    'https://www.unesale.com/ProductImages/Large/notfound.png',
                }}
                style={{ height: 75, width: 75, borderRadius: 5 }}
              />
            )}
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Heading type={'h7'} alignment={'left'} bold>
              {playroll.name}
            </Heading>
            <Heading type={'h10'} alignment={'left'} color={'grey'} bold>
              Playroll by {creator}
            </Heading>
            {!this.props.hideRecommender &&
              (this.props.senderView ? (
                <Text style={[styles.manageRoll, { marginTop: 5 }]}>
                  Recommended to {recommendation.user.name}
                </Text>
              ) : (
                <Text style={[styles.manageRoll, { marginTop: 5 }]}>
                  Recommended by {recommendation.recommender.name}
                </Text>
              ))}
          </View>
          <Icon
            size={35}
            name='more-vert'
            color='lightgrey'
            underlayColor='rgba(255,255,255,0)'
            // onPress={() => NavigationService.goBack()}
          />
        </View>
      </TouchableOpacity>
    );
  }
  renderRollRecommendation(recommendation: Recommendation) {
    const mainSource =
      (recommendation.data &&
        recommendation.data.sources &&
        recommendation.data.sources[0]) ||
      {};
    return (
      <TouchableOpacity
        onPress={() => this.manageRoll(mainSource, recommendation.data)}
        key={recommendation.id}
        disabled={this.props.disableManage}
      >
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: 5,
          }}
          key={recommendation.id}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              width: '100%',
            }}
          >
            <Image style={styles.cover} source={{ uri: mainSource.cover }} />
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <Text style={styles.artist} numberOfLines={2}>
                {mainSource.name}
              </Text>
              {!!mainSource.creator && (
                <Text
                  style={[styles.manageRoll, { fontWeight: 'bold' }]}
                  numberOfLines={1}
                >
                  {mainSource.creator}
                </Text>
              )}
              {!this.props.hideRecommender &&
                (this.props.senderView ? (
                  <Text style={[styles.manageRoll, { marginTop: 5 }]}>
                    Recommended to {recommendation.user.name}
                  </Text>
                ) : (
                  <Text style={[styles.manageRoll, { marginTop: 5 }]}>
                    Recommended by {recommendation.recommender.name}
                  </Text>
                ))}
            </View>
            <Icon
              size={35}
              name='more-vert'
              color='lightgrey'
              underlayColor='rgba(255,255,255,0)'
              // onPress={() => NavigationService.goBack()}
            />
          </View>
          <View style={styles.spacing} />
        </View>
      </TouchableOpacity>
    );
  }
}
