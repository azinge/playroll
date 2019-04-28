/**
 * ChatRecommendationCard
 */

import * as React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Swipeout from 'react-native-swipeout';
import Carousel from 'react-native-snap-carousel';
import Moment from 'react-moment';

import styles from './ChatRecommendationCard.styles';
import { Recommendation, MusicSource, Roll } from '../../../../graphql/types';
import { Icon, Card } from 'react-native-elements';
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
  alignLeft?: boolean;
}

interface State {}

export default class ChatRecommendationCard extends React.Component<
  Props,
  State
> {
  render() {
    const { recommendation } = this.props;

    return (
      <DismissRecommendationMutation
        variables={{ recommendationID: recommendation.id }}
        refetchQueries={() => [LIST_CURRENT_USER_RECOMMENDATIONS]}
      >
        {dismissRecommendation => {
          const calendarStrings = {
            lastDay: '[Yesterday at] LT',
            sameDay: '[Today at] LT',
            lastWeek: '[Last] dddd [at] LT',
            nextWeek: 'dddd [at] LT',
            sameElse: 'L',
          };
          return (
            <View>
              {/* <Heading
                type={'h11'}
                alignment={this.props.alignLeft ? 'left' : 'right'}
                style={{ marginHorizontal: 15 }}
              > */}
              <Moment
                calendar={calendarStrings}
                element={props => (
                  <Heading
                    type={'h11'}
                    alignment={this.props.alignLeft ? 'left' : 'right'}
                    style={{ marginHorizontal: 15 }}
                    color={'grey'}
                  >
                    {props.children}
                  </Heading>
                )}
              >
                {recommendation.createdAt}
              </Moment>
              {/* </Heading> */}
              <Card
                containerStyle={[
                  {
                    marginTop: 0,
                    marginBottom: 15,
                    // height: 100,
                    padding: 5,
                    borderRadius: 12,
                    borderColor: 'white',
                    shadowColor: 'gray',
                    shadowOffset: {
                      width: 2,
                      height: 3,
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.3,
                  },
                  this.props.alignLeft
                    ? { marginRight: 100 }
                    : { marginLeft: 100 },
                ]}
              >
                {recommendation.playrollID && recommendation.playrollID !== '0'
                  ? this.renderPlayrollRecommendation(recommendation)
                  : this.renderRollRecommendation(recommendation)}
                {/* <View style={styles.spacing} /> */}
              </Card>
              {this.props.alignLeft && (
                <Image
                  style={[styles.profileAvatar, { top: -25 }]}
                  source={{ uri: recommendation.recommender.avatar }}
                />
              )}
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
            <Heading type={'h8'} alignment={'left'} bold numLines={2}>
              {playroll.name}
            </Heading>
            <Heading
              type={'h11'}
              alignment={'left'}
              color={'grey'}
              bold
              numLines={2}
            >
              Playroll by {creator}
            </Heading>
          </View>
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
              <Heading type={'h9'} alignment={'left'} bold numLines={2}>
                {mainSource.name}
              </Heading>
              {!!mainSource.creator && (
                <Heading
                  type={'h11'}
                  alignment={'left'}
                  color={'grey'}
                  bold
                  numLines={2}
                >
                  {mainSource.creator}
                </Heading>
              )}
            </View>
          </View>
          <View style={styles.spacing} />
        </View>
      </TouchableOpacity>
    );
  }
}
