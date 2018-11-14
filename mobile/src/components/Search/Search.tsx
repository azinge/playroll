/**
 * Search
 */

import React from "react";
import { TextInput, View, ScrollView, Text, Image } from "react-native";

import { musicSources, MusicSource } from "../../static/mockData";

export interface Props {}

interface State {
  results: MusicSource[];
  text: string;
}

export default class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      results: [],
      text: "SearchBar",
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text: string) => this.setState({ text })}
          onSubmitEditing={() =>
            this.setState({
              results: musicSources,
            })
          }
          value={this.state.text}
        />
        <ScrollView>
          {this.state.results.map((result: MusicSource, index: number) => {
            return (
              <View style={{ height: 150, margin: 10 }} key={index}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: result.cover }}
                />
                <Text>{result.name}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
