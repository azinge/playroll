import React, { Component } from 'react';
import {
  TextInput,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Picker,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Search.styles';

import RNPickerSelect from 'react-native-picker-select';
import { MusicSource, Roll } from '../../../../graphql/types';
import { SearchSpotifyQuery } from '../../../../graphql/requests/Spotify/';
import CreateModal from './CreateModal';
import { render } from 'react-dom';
import NavigationService from '../../../../services/NavigationService';

const pickerStyle = StyleSheet.create({
  inputIOS: {
    width: 110,
    height: 40,
    // margin: 10,
    fontSize: 16,
    // padding: 10,
    // paddingTop: 13,
    // paddingHorizontal: 10,
    // paddingBottom: 12,
    // borderWidth: 1,
    // borderLeftWidth: 1,
    borderColor: '#6A0070',
    // borderRadius: 4,
    borderLeftColor: 'lightgray',
    textAlign: 'center',
    backgroundColor: '#f5eeed',
    color: 'black',
    alignItems: 'flex-end',
  },
});

export interface Props {
  query?: string;
  navigation?: NavigationScreenProp<{}>;
  playrollID?: any;
  onPress?: (roll: Roll) => void;
}

interface State {
  text: string;
  query: string;
  searchType: string;
  modalVisible: boolean;
  currentSource: MusicSource;
}

export default class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: 'Drake',
      query: 'Drake',
      searchType: 'Artist',
      modalVisible: false,
      currentSource: {},
    };
    this.setModal = this.setModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  render() {
    return (
      <View>
        {this.renderSearchBar()}

        {/* Options Bar (Popular, New, ABC, etc) */}
        {/* TODO: do we need this? */}
        {/* {this.renderOptionsBar()} */}

        {/* Modal to add selected roll */}
        {this.renderModal()}

        {/* Search Results */}
        {this.renderSearchResults()}
      </View>
    );
  }

  renderSearchBar() {
    return (
      <View style={styles.searchBar}>
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
          onChangeText={(text: string) => this.setState({ text })}
          onSubmitEditing={() => {
            this.setState({ query: this.state.text });
          }}
          value={this.state.text}
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
              <Icon
                name='arrow-drop-down'
                underlayColor='rgba(255,255,255,0)'
              />
            </View>
          </RNPickerSelect>
        </View>
      </View>
    );
  }

  renderOptionsBar() {
    return (
      <View style={{ marginTop: 10, flexDirection: 'row' }}>
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

  renderSearchResults() {
    return (
      <SearchSpotifyQuery
        variables={{
          query: this.state.query,
          searchType: this.state.searchType,
        }}
      >
        {({ loading, error, data }) => {
          // console.log(error);
          console.log('DATA');
          console.log(data.private);
          return (
            <View style={styles.resultsContainer}>
              {loading ? (
                <ActivityIndicator color={'gray'} />
              ) : (
                <FlatList
                  data={data && data.private.searchSpotify}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => item.providerID}
                  extraData={this.state}
                  renderItem={({ item }) => {
                    console.log(item);
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.props.playrollID
                            ? this.setModal(item)
                            : this.manageRoll(item);
                        }}
                        key={item.providerID}
                      >
                        <View style={styles.rowOuter} key={item.providerID}>
                          <View style={styles.rowInner}>
                            {/* Row thumbnail image */}
                            <Image
                              style={styles.cover}
                              source={{ uri: item.cover }}
                            />

                            {/* Row text */}
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                              <Text
                                style={[styles.text, styles.rollType]}
                                numberOfLines={2}
                              >
                                {item.type}
                              </Text>
                              <Text
                                style={[styles.text, styles.artistName]}
                                numberOfLines={2}
                              >
                                {item.name}
                              </Text>
                              {item.creator ? (
                                <View style={{ flexDirection: 'row' }}>
                                  <Text style={[styles.text, styles.creator]}>
                                    {item.creator}
                                  </Text>
                                  <Text style={[styles.text, styles.provider]}>
                                    &nbsp;&middot; {item.provider}
                                  </Text>
                                </View>
                              ) : (
                                <Text
                                  style={[styles.text, styles.provider]}
                                  numberOfLines={2}
                                >
                                  {item.provider}
                                </Text>
                              )}
                            </View>

                            <View style={styles.rowIcons}>
                              <Icon
                                size={25}
                                name='settings'
                                type='material'
                                color='lightgrey'
                                onPress={() => {
                                  NavigationService.navigate('EditRoll', {
                                    item,
                                  });
                                }}
                                iconStyle={styles.editIcon}
                              />
                              <Icon
                                size={25}
                                name='delete'
                                type='material'
                                color='lightgrey'
                                onPress={() => {
                                  NavigationService.navigate('EditRoll', {
                                    item,
                                  });
                                }}
                                iconStyle={styles.editIcon}
                              />
                            </View>
                          </View>
                          <View style={styles.spacing} />
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              )}
            </View>
          );
        }}
      </SearchSpotifyQuery>
    );
  }
}
