/**
 * ManageRollScreen
 */

import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { LinearGradient } from 'expo';

import { NavigationScreenProp } from 'react-navigation';
import { MusicSource } from '../../../graphql/types';
import { Button, Overlay, Header, Icon } from 'react-native-elements';
import styles from './ManageRollScreen.styles';

import { ListCurrentUserPlayrollsQuery } from '../../../graphql/requests/Playroll/';
import { LIST_CURRENT_USER_PLAYROLLS } from '../../../graphql/requests/Playroll/ListCurrentUserPlayrollsQuery';
import PlayrollCard from '../../shared/Cards/PlayrollCard';
import { CreateRollMutation } from '../../../graphql/requests/Roll';
import { GET_CURRENT_USER_PLAYROLL } from '../../../graphql/requests/Playroll/GetCurrentUserPlayrollQuery';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import NavigationService from '../../../services/NavigationService';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
  source?: any;
}

interface State {
  isVisible: boolean;
}

export default class ManageRollScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  render() {
    const currentSource =
      this.props.navigation && this.props.navigation.getParam('currentSource');
    delete currentSource.__typename;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <LinearGradient colors={['#9333CC', 'white']} style={{ flex: 1 }}>
          <View style={styles.coverContainer}>
            <Icon
              name='close'
              type='material-community'
              color='white'
              onPress={() => NavigationService.goBack()}
              containerStyle={{ alignSelf: 'flex-start', marginLeft: 20 }}
              underlayColor='transparent'
            />

            <ImageBackground
              source={{
                uri: currentSource.cover,
              }}
              style={styles.cover}
            />
          </View>
          <View style={styles.source}>
            <Text style={styles.sourceTitle}>{currentSource.name}</Text>
            <Text style={styles.sourceSubtitle}>{currentSource.type}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title='Add To Playroll'
              containerStyle={{ margin: 10 }}
              buttonStyle={styles.button}
              titleStyle={{ color: 'purple', fontSize: 16 }}
              onPress={() =>
                NavigationService.navigate('AddToPlayroll', {
                  rollData: {
                    sources: [currentSource],
                    filters: [
                      {
                        type: 'Source',
                        name: 'Union',
                        modifications: ['0'],
                      },
                      {
                        type: 'Order',
                        name: 'Random',
                      },
                      {
                        type: 'Length',
                        name: 'NumberOfSongs',
                        modifications: ['0', '10'],
                      },
                    ],
                  },
                })
              }
              raised
            />
            {/* <Button
                title='Add To Discovery Queue'
                containerStyle={{ margin: 10 }}
                buttonStyle={styles.button}
                titleStyle={{ color: 'purple', fontSize: 16 }}
                onPress={() => {}}
                raised
              /> */}
            <Button
              title='Recommend'
              containerStyle={{ margin: 10 }}
              buttonStyle={styles.button}
              titleStyle={{ color: 'purple', fontSize: 16 }}
              onPress={() => {}}
              raised
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
}
