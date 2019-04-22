/**
 * HomeCarousel
 */

import React from 'react';
import {
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import styles from './HomeCarousel.styles';
import { Card, Icon } from 'react-native-elements';
import { DeletePlayrollMutation } from '../../../../graphql/requests/Playroll';
import { LIST_CURRENT_USER_PLAYROLLS } from '../../../../graphql/requests/Playroll/ListCurrentUserPlayrollsQuery';
import { MusicSource, Roll } from '../../../../graphql/types';
import { ListFeaturedPlayrollsQuery } from '../../../../graphql/requests/Playroll/ListFeaturedPlayrollsQuery';
import Heading from '../../../shared/Text/Heading';
import NavigationService from '../../../../services/NavigationService';

export interface Props {
  title?: string;
  overlayText?: string;
  numItems: number;
}

interface State {}

export default class HomeCarousel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this._renderPlayroll = this._renderPlayroll.bind(this);
    this._renderRoll = this._renderRoll.bind(this);
  }

  _renderRoll({ item, index }: { item: Roll; index: number }) {
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

  _renderPlayroll({ item: playroll }) {
    let creator = '';
    if (playroll.user && playroll.user.name) {
      if (playroll.user.accountType === 'Managed') {
        creator = 'Playroll';
      } else {
        creator = playroll.user.name;
      }
    }
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationService.navigate('ViewExternalPlayroll', { playroll });
        }}
      >
        <Card
          title={playroll.name}
          // image={require("../../assets/wack.jpg")}
          titleStyle={{
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: 28,
            margin: 0,
          }}
          key={playroll.id}
          containerStyle={{
            borderRadius: 12,
            borderColor: 'white',
            shadowColor: 'gray',
            shadowOffset: {
              width: 2,
              height: 3,
            },
            shadowRadius: 5,
            shadowOpacity: 0.5,
          }}
        >
          {playroll.rolls && playroll.rolls.length > 0 ? (
            <FlatList
              data={playroll.rolls}
              renderItem={this._renderRoll}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              style={{
                height: 80,
                width: 329,
                flexDirection: 'row',
                overflow: 'scroll',
              }}
            />
          ) : (
            <Image
              source={{
                uri: 'https://www.unesale.com/ProductImages/Large/notfound.png',
              }}
              style={{ height: 80, width: 80, borderRadius: 5 }}
            />
          )}
          <Heading type={'h10'} color={'grey'} alignment={'right'}>
            By {creator}
          </Heading>
        </Card>
      </TouchableOpacity>
    );
  }
  render() {
    const extractPlayrolls = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listFeaturedPlayrolls;
    };
    return (
      <ListFeaturedPlayrollsQuery>
        {({ loading, data, error }) => {
          if (loading) {
            return <ActivityIndicator />;
          }
          const playrolls = extractPlayrolls(data);
          return (
            <View>
              <View style={{ height: 220 }}>
                <Carousel
                  data={playrolls}
                  renderItem={this._renderPlayroll}
                  hasParallaxImages={false}
                  sliderWidth={Dimensions.get('window').width}
                  itemWidth={Dimensions.get('window').width}
                  itemHeight={250}
                  loop={true}
                />
              </View>
              <Text
                style={[
                  styles.title,
                  {
                    position: 'absolute',
                    bottom: 16,
                    right: 12,
                    opacity: 0.8,
                    textAlign: 'center',
                    color: 'grey',
                  },
                ]}
              >
                {this.props.overlayText}
              </Text>
            </View>
          );
        }}
      </ListFeaturedPlayrollsQuery>
    );
  }
}
