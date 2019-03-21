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
import { Icon } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';

import SearchScreenContainer from '../../shared/Containers/SearchScreenContainer';
import { MusicSource } from '../../../graphql/types';
import styles, { pickerStyle } from './SearchScreen.styles';
import CreateModal from './CreateModal';
import { SearchSpotifyQuery } from '../../../graphql/requests/Spotify';
import NavigationService from '../../../services/NavigationService';

export interface Props {
  playrollID?: any;
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  query: string;
  searchType: string;
  modalVisible: boolean;
  currentSource: MusicSource;
}
export default class SearchScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: 'Drake',
      searchType: 'Artist',
      modalVisible: false,
      currentSource: {},
    };
  }
  render() {
    return (
      <SearchScreenContainer
        title={'Search'}
        onSubmitEditing={query => this.setState({ query })}
      >
        {this.renderHeader()}
        {this.renderOptionsBar()}
        {this.renderModal()}
        {this.renderSearch()}
      </SearchScreenContainer>
    );
  }

  renderHeader() {
    return (
      <View style={styles.main}>
        <Icon
          name={'search'}
          size={35}
          color='lightgrey'
          underlayColor='lightgrey'
          containerStyle={{ paddingHorizontal: 5 }}
        />
        <TextInput
          style={{ flex: 1, fontSize: 16 }}
          selectionColor={'purple'}
          placeholder='What are you looking for?'
          // onChangeText={(text: string) => this.setState({ text })}
          // onSubmitEditing={() => {
          //   this.setState({ query: this.state.text });
          // }}
          value={this.state.query}
        />
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 7,
            height: '100%',
            margin: 0,
            paddingLeft: 20,
            borderLeftWidth: 1,
            borderLeftColor: 'lightgray',
            width: 100,
            // height: 100%,
          }}
        >
          <RNPickerSelect
            placeholder={{}}
            // hideIcon={true}
            items={[
              { label: 'Artist', value: 'Artist' },
              { label: 'Album', value: 'Album' },
              { label: 'Track', value: 'Track' },
              { label: 'Playlist', value: 'Playlist' },
            ]}
            onValueChange={value => {
              this.setState({
                searchType: value,
              });
            }}
            style={pickerStyle}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 16 }}>{this.state.searchType}</Text>
              <Icon name='arrow-drop-down' />
            </View>
          </RNPickerSelect>
        </View>
      </View>
    );
  }

  renderOptionsBar() {
    return (
      <View style={{ margin: 10, flexDirection: 'row' }}>
        <View style={{ paddingHorizontal: 7 }}>
          <Text
            style={[styles.options, { fontWeight: 'bold', color: '#993399' }]}
          >
            Popular
          </Text>
        </View>
        <View style={styles.nullOptions}>
          <Text style={[styles.options, { color: 'grey' }]}>New</Text>
        </View>
        <View style={styles.nullOptions}>
          <Text style={[styles.options, { color: 'grey' }]}>ABC</Text>
        </View>
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

  renderSearch() {
    const navigationOnPress =
      this.props.navigation && this.props.navigation.getParam('onPress');
    return (
      <SearchSpotifyQuery
        variables={{
          query: this.state.query,
          searchType: this.state.searchType,
        }}
      >
        {({ loading, error, data }) => {
          console.log(error);
          return (
            <View style={{ marginBottom: 145 }}>
              {loading ? (
                <ActivityIndicator color={'gray'} />
              ) : (
                <FlatList
                  data={data && data.private.searchSpotify}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => item.providerID}
                  extraData={this.state}
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
                          <Icon
                            size={35}
                            name='more-vert'
                            color='lightgrey'
                            onPress={() => NavigationService.goBack()}
                          />
                        </View>
                        <View style={styles.spacing} />
                      </View>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          );
        }}
      </SearchSpotifyQuery>
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