/**
 * HorizontalPlayrollList
 */

import * as React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { Playroll, Roll, MusicSource } from '../../../../graphql/types';

import styles from './HorizontalPlayrollList.styles';
import { Card } from 'react-native-elements';

export interface Props {
  title?: string;
  playrolls: Playroll[];
  onPress?: (playroll: Playroll) => void;
}

interface State {}

export default class HorizontalPlayrollList extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this._renderRoll = this._renderRoll.bind(this);
  }

  _renderRoll({ item, index }: { item: Roll; index: number }) {
    let source: MusicSource | null = null;
    if (item.data && item.data.sources && item.data.sources.length > 0) {
      source = item.data.sources[0];
    }
    return (
      <View style={{ height: 75 }} key={index}>
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
    return (
      <View style={{ flex: 1, height: 150 }}>
        <View style={{ marginVertical: 0, paddingHorizontal: 10 }}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <FlatList
          horizontal={true}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}
          data={this.props.playrolls.map((ms, i) => ({
            ...ms,
            key: `${i}`,
          }))}
          renderItem={({ item: playroll }) => {
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
                  wrapperStyle={{
                    marginVertical: 3,
                    marginHorizontal: 0,
                    paddingHorizontal: 0,
                  }}
                  containerStyle={{
                    borderRadius: 12,
                    borderColor: 'white',
                    shadowColor: 'gray',
                    shadowOffset: {
                      width: 2,
                      height: 3,
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.3,
                    padding: 0,
                    margin: 0,
                    marginHorizontal: 5,
                    marginVertical: 0,
                  }}
                >
                  <View
                    style={{
                      width: 125,
                      alignItems: 'center',
                    }}
                  >
                    {playroll.rolls && playroll.rolls.length > 0 ? (
                      <Carousel
                        data={playroll.rolls}
                        renderItem={this._renderRoll}
                        hasParallaxImages={false}
                        sliderWidth={100}
                        itemWidth={75}
                        itemHeight={75}
                        loop={true}
                        useScrollView
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
                    <Text style={styles.sourceTitle} numberOfLines={2}>
                      {playroll.name}
                    </Text>
                    {creator && (
                      <Text style={styles.sourceCreator} numberOfLines={1}>
                        By {creator}
                      </Text>
                    )}
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
