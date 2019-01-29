/**
 * Search
 */

import React from "react";
import {
  TextInput,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { pickerStyle } from "./Search.styles";
import { MusicSource } from "../../../graphql/types";
import {
  SEARCH_SPOTIFY_QUERY,
  SearchSpotifyQuery,
} from "../../../graphql/requests/Spotify/";
import CreateModal from "./CreateModal/CreateModal";

export interface Props {
  navigation: any;
}

interface State {
  text: string;
  query: string;
  searchType: string;
  modalVisible: boolean;
  currentSource: MusicSource;
}

export default class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: "Drake",
      query: "",
      searchType: "Artist",
      modalVisible: false,
      currentSource: {},
    };
    this.setModal = this.setModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  setModal(data: MusicSource) {
    delete data.__typename;
    this.setState({ modalVisible: true, currentSource: data });
  }

  closeModal(redirect?: boolean) {
    this.setState({ modalVisible: false, currentSource: {} });
    if (redirect) {
      this.props.navigation.navigate("Playrolls");
    }
  }

  render() {
    const nav = this.props.navigation;
    const playrollID =
      nav && nav.state && nav.state.params && nav.state.params.playrollID;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text: string) => this.setState({ text })}
          onSubmitEditing={() => {
            this.setState({ query: this.state.text });
          }}
          value={this.state.text}
        />
        <RNPickerSelect
          placeholder={{ label: "Search Type:", value: null }}
          items={[
            { label: "Artist", value: "Artist" },
            { label: "Album", value: "Album" },
            { label: "Track", value: "Track" },
            { label: "Playlist", value: "Playlist" },
          ]}
          onValueChange={value => {
            this.setState({
              searchType: value,
            });
          }}
          style={pickerStyle}
        />

        <CreateModal
          currentSource={this.state.currentSource}
          modalVisible={this.state.modalVisible}
          closeModal={this.closeModal}
          playrollID={playrollID}
        />
        <SearchSpotifyQuery
          query={SEARCH_SPOTIFY_QUERY}
          variables={{
            query: this.state.query,
            searchType: this.state.searchType,
          }}
        >
          {({ loading, error, data }) => {
            console.log(loading);
            console.log(error);
            console.log(data && data.searchSpotify);
            return (
              <ScrollView>
                {data &&
                  data.searchSpotify &&
                  data.searchSpotify.map((source: MusicSource) => {
                    return (
                      <TouchableOpacity
                        key={source.providerID}
                        onPress={() => this.setModal(source)}
                      >
                        <View style={{ height: 150, margin: 10 }}>
                          <Image
                            style={{ width: 100, height: 100 }}
                            source={{ uri: source.cover }}
                          />
                          <Text>{source.name}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            );
          }}
        </SearchSpotifyQuery>
      </SafeAreaView>
    );
  }
}
