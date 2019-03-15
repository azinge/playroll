/**
 * HomeScreen
 */

import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Platform,
  StatusBar,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import DiscoverCarousel from './DiscoverCarousel';
import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper';
import { musicSources } from '../../../static/mockData';
import { Header, Icon } from 'react-native-elements';
import styles from './HomeScreen.styles';
import Collapsible from 'react-native-collapsible-header';
import MainScreenHeader from '../../shared/Headers/MainScreenHeader';
import HorizontalMusicSourceList from '../../shared/Lists/HorizontalMusicSourceList';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class HomeScreen extends React.Component<Props, State> {
  componentWillMount() {
    StatusBar.setBarStyle('light-content', true);
  }
  render() {
    return (
      //   <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Collapsible
        max={45}
        min={isIphoneX() ? 41 : 19}
        backgroundColor={'purple'}
        renderHeader={this.renderHeader()}
        // renderContent is not needed if using FlatList
        renderContent={this.renderContent()}

        // flatList
        // data={Array(10).fill()}
        // keyExtractor={(item, i) => String(i)}
        // renderItem={({ index }) => <Content gray={index % 2 !== 0} />}
      />
    );
  }

  renderHeader() {
    return <MainScreenHeader />;
  }

  renderContent() {
    return (
      <View style={{ marginTop: 5, flex: 1 }}>
        <View
          style={{
            marginVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.title}>Suggested Playrolls</Text>
        </View>

        <DiscoverCarousel />

        <HorizontalMusicSourceList
          title={'Discovery Queue'}
          musicSources={musicSources}
        />

        <HorizontalMusicSourceList
          title={'Recommendations'}
          musicSources={musicSources}
        />

        <HorizontalMusicSourceList
          title={'Friends'}
          musicSources={musicSources}
        />

        <View style={{ marginVertical: 10 }} />
      </View>
    );
  }
}
