/**
 * DetailedPlayrollCard
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
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Card, Icon } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';

import {
  DeletePlayrollMutation,
  GetCurrentUserPlayrollQuery,
} from '../../../../graphql/requests/Playroll/';

import { LIST_CURRENT_USER_PLAYROLLS } from '../../../../graphql/requests/Playroll/ListCurrentUserPlayrollsQuery';

import { Playroll, Roll, MusicSource } from '../../../../graphql/types';
import styles from './DetailedPlayrollCard.styles';

export interface Props {
  playroll?: Playroll;
  editPlayroll?: () => void;
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class DetailedPlayrollCard extends React.Component<
  Props,
  State
> {
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
    const { editPlayroll = () => {} } = this.props;
    return (
      <GetCurrentUserPlayrollQuery
        variables={{ id: this.props.playroll.id }}
        // fetchPolicy='cache-only'
      >
        {({ loading, error, data }) => {
          // if (loading || error) {
          //   return (
          //     <Card
          //       title={'Loading'}
          //       // image={require("../../assets/wack.jpg")}
          //       key={''}
          //       containerStyle={{
          //         borderRadius: 12,
          //         borderColor: 'white',
          //         shadowColor: 'gray',
          //         shadowOffset: {
          //           width: 2,
          //           height: 3,
          //         },
          //         shadowRadius: 5,
          //         shadowOpacity: 0.2,
          //       }}
          //     />
          //   );
          // }
          const playroll: any =
            (data && data.private.currentUserPlayroll) || {};
          return (
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
              <View style={{ flexDirection: 'row' }}>
                <View style={{ height: 110 }}>
                  {playroll.rolls && playroll.rolls.length > 0 ? (
                    <FlatList
                      data={playroll.rolls}
                      renderItem={this._renderItem}
                      keyExtractor={item => item.id.toString()}
                      horizontal={true}
                      style={{ height: 80, width: 329 }}
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
                <View />
              </View>
              <View style={{ margin: -16, flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    editPlayroll();
                  }}
                  style={styles.submitButtonLeft}
                >
                  {loading ? (
                    <ActivityIndicator color={'white'} />
                  ) : (
                    // <Text style={styles.submitButtonText}>Sign In</Text>
                    <Icon
                      type='material-community'
                      name='playlist-edit'
                      color='white'
                      size={30}
                    />
                  )}
                </TouchableOpacity>
                <DeletePlayrollMutation
                  variables={{
                    id: playroll.id,
                  }}
                  refetchQueries={[LIST_CURRENT_USER_PLAYROLLS]}
                >
                  {deletePlayroll => (
                    <TouchableOpacity
                      onPress={() => deletePlayroll()}
                      style={styles.submitButtonRight}
                    >
                      {loading ? (
                        <ActivityIndicator color={'white'} />
                      ) : (
                        <Icon
                          type='material-community'
                          name='delete'
                          color='white'
                          containerStyle={{ top: 3 }}
                          size={25}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                </DeletePlayrollMutation>
              </View>
            </Card>
          );
        }}
      </GetCurrentUserPlayrollQuery>
    );
  }
}
