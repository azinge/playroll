/**
 * SearchScreen
 */

import React from 'react';
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Icon, Overlay, ButtonGroup } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';

import SearchScreenContainer from '../../shared/Containers/SearchScreenContainer';
import { MusicSource } from '../../../graphql/types';
import styles, { pickerStyle } from './SearchScreen.styles';
import CreateModal from './CreateModal';
import { SearchSpotifyQuery } from '../../../graphql/requests/Spotify';
import NavigationService from '../../../services/NavigationService';
import ManageRollScreen from '../ManageRollScreen';
import { BlurView } from 'expo';
import Swipeout from 'react-native-swipeout';

export interface Props {
  playrollID?: any;
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  query: string;
  searchType: string;
  modalVisible: boolean;
  currentSource: MusicSource;
  isVisible: boolean;
  selectedIndex: number;
}
export default class SearchScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: '',
      searchType: 'Artist',
      modalVisible: false,
      currentSource: {},
      isVisible: false,
      selectedIndex: 0,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    const types = { 0: 'Artist', 1: 'Album', 2: 'Track', 3: 'Playlist' };
    this.setState({ selectedIndex, searchType: types[selectedIndex] });
  }

  render() {
    return (
      <SearchScreenContainer
        title={'Search'}
        onSubmitEditing={query => this.setState({ query })}
      >
        {this.renderOptionsBar()}
        {this.renderModal()}
        {this.renderSearch()}
      </SearchScreenContainer>
    );
  }

  renderOptionsBar() {
    const buttons = ['Artist', 'Album', 'Track', 'Playlist'];
    const { selectedIndex } = this.state;
    return (
      <View style={{ marginVertical: 10 }}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 30 }}
          selectedButtonStyle={{ backgroundColor: 'purple' }}
        />
      </View>
    );
  }

  renderModal() {
    return (
      <CreateModal
        currentSource={this.state.currentSource}
        modalVisible={this.state.modalVisible}
        closeModal={this.closeModal}
        playrollID={this.props.playrollID}
      />
    );
  }

  renderEmptySearch() {
    return (
      <View style={{ alignSelf: 'center' }}>
        <Text style={{ fontSize: 20 }}>No results found!</Text>
      </View>
    );
  }

  renderSearch() {
    const navigationOnPress =
      this.props.navigation && this.props.navigation.getParam('onPress');
    return (
      <BlurView blurType='light' blurAmount={10}>
        <SearchSpotifyQuery
          variables={{
            query: this.state.query,
            searchType: this.state.searchType,
          }}
        >
          {({ loading, error, data }) => {
            return (
              <View style={{ marginBottom: 15 }}>
                {loading ? (
                  <ActivityIndicator
                    color={'gray'}
                    style={{ marginTop: '5%' }}
                  />
                ) : (
                  <FlatList
                    data={data && data.private.searchSpotify}
                    contentContainerStyle={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item.providerID}
                    extraData={this.state}
                    ListEmptyComponent={this.renderEmptySearch}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          if (navigationOnPress) {
                            navigationOnPress(item);
                          } else {
                            this.props.playrollID
                              ? this.setModal(item)
                              : this.manageRoll(item);
                          }
                        }}
                        key={item.providerID}
                      >
                        <View
                          style={{ width: '100%', alignItems: 'center' }}
                          key={item.providerID}
                        >
                          <View style={{ flexDirection: 'row', width: '100%' }}>
                            <Image
                              style={styles.cover}
                              source={{ uri: item.cover }}
                            />
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                              <Text style={styles.artist} numberOfLines={2}>
                                {item.name}
                              </Text>
                              {item.creator ? (
                                <Text style={styles.noArtist} numberOfLines={2}>
                                  {item.creator}
                                </Text>
                              ) : null}
                            </View>
                          </View>
                          <View style={styles.spacing} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                )}
                <Overlay
                  isVisible={this.state.isVisible}
                  fullScreen={true}
                  animationType={'slide'}
                  onBackdropPress={() => this.setState({ isVisible: false })}
                  windowBackgroundColor='rgba(255, 255, 255, .5)'
                  overlayStyle={{ opacity: 0.9 }}
                >
                  <ManageRollScreen source={this.state.currentSource} />
                </Overlay>
              </View>
            );
          }}
        </SearchSpotifyQuery>
      </BlurView>
    );
  }

  setModal(data: MusicSource) {
    // @ts-ignore
    delete data.__typename;
    this.setState({ modalVisible: true, currentSource: data });
  }

  closeModal(redirect?: boolean) {
    this.setState({ modalVisible: false, currentSource: {} });
  }

  manageRoll(source) {
    NavigationService.navigate('ManageRoll', {
      currentSource: source,
    });
  }
}
