/**
 * Search
 */

import React from "react";
import { TextInput, View, ScrollView, Text } from "react-native";

export interface Props {}

interface State {
  results: any;
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
              results: [
                "Search Result 1",
                "Search Result 2",
                "Search Result 3",
                "Search Result 4",
                "Search Result 5",
                "Search Result 6",
              ],
            })
          }
          value={this.state.text}
        />
        <ScrollView>
          {this.state.results.map((result: any, index: number) => {
            return <Text key={index}>hello</Text>;
          })}
        </ScrollView>
      </View>
    );
  }
}
