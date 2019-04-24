/**
 * PlayrollCard
 */

import * as React from 'react';
import {
  View,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {
  DeletePlayrollMutation,
  GetCurrentUserPlayrollQuery,
} from '../../../../graphql/requests/Playroll/';

import { LIST_CURRENT_USER_PLAYROLLS } from '../../../../graphql/requests/Playroll/ListCurrentUserPlayrollsQuery';

import { Playroll, Roll, MusicSource } from '../../../../graphql/types';
import styles from './PlayrollCard.styles';
import Heading from '../../Text/Heading';
import HorizontalRule from '../../Text/HorizontalRule';
import { Card } from 'react-native-elements';

export interface Props {
  playroll?: Playroll;
  onPress?: (playroll) => void;
  hideCreator?: boolean;
}

interface State {}

export default class PlayrollCard extends React.Component<Props, State> {
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

  render() {
    const { onPress = () => {} } = this.props;
    console.log(this.props.playroll.id);
    return (
      <GetCurrentUserPlayrollQuery variables={{ id: this.props.playroll.id }}>
        {({ loading, error, data }) => {
          const playroll: any =
            (data && data.private.currentUserPlayroll) || {};
          let creator = '';
          if (playroll.user && playroll.user.name) {
            if (playroll.user.accountType === 'Managed') {
              creator = 'Playroll';
            } else {
              creator = playroll.user.name;
            }
          }
          return (
            <TouchableOpacity onPress={() => onPress(playroll)}>
              <Card
                containerStyle={{
                  height: 100,
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
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ marginTop: 7 }}>
                    {playroll.rolls && playroll.rolls.length > 0 ? (
                      <Carousel
                        data={playroll.rolls}
                        renderItem={this._renderItem}
                        hasParallaxImages={false}
                        sliderWidth={110}
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
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Heading type={'h6'} alignment={'left'}>
                      {playroll.name}
                    </Heading>
                    {!this.props.hideCreator && (
                      <Heading type={'h9'} alignment={'left'} color={'grey'}>
                        By {creator}
                      </Heading>
                    )}
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          );
        }}
      </GetCurrentUserPlayrollQuery>
    );
  }
}
