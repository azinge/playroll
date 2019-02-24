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
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import styles from './Search.styles';

import RNPickerSelect from 'react-native-picker-select';
import { MusicSource } from '../../../graphql/types';
import { SearchSpotifyQuery } from '../../../graphql/requests/Spotify/';
import CreateModal from '../../Home/SearchScreen/CreateModal/CreateModal';

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
  navigation?: NavigationScreenProp<{}>;
  playrollID?: any;
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
    // if (redirect) {
    //   this.props &&
    //     this.props.navigation &&
    //     this.props.navigation.navigate('Tracklist');
    // }
  }

  render() {
    return (
      <View>
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
            onChangeText={(text: string) => this.setState({ text })}
            onSubmitEditing={() => {
              this.setState({ query: this.state.text });
            }}
            value={this.state.text}
          />
          {/* <View
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
              hideIcon={true}
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
          </View> */}
        </View>
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

        <CreateModal
          currentSource={this.state.currentSource}
          modalVisible={this.state.modalVisible}
          closeModal={this.closeModal}
          playrollID={this.props.playrollID}
          navigation={this.props.navigation}
        />
        <SearchSpotifyQuery
          variables={{
            query: this.state.query,
            searchType: this.state.searchType,
          }}
        >
          {({ loading, error, data }) => {
            return (
              <View style={{ marginBottom: 145 }}>
                <FlatList
                  data={data && data.searchSpotify}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => item.providerID}
                  extraData={this.state}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => this.setModal(item)}
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
                            onPress={() =>
                              this.props.navigation &&
                              this.props.navigation.goBack(null)
                            }
                          />
                        </View>
                        <View style={styles.spacing} />
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            );
          }}
        </SearchSpotifyQuery>
      </View>
    );
  }
}
