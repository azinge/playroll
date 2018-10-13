/**
 * Application component for Playroll mobile application.
 */

import React from "react";
import { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import styles from "./Playrolls.styles";

const GET_PLAYROLLS = gql`
  {
    listPlayrolls {
      name
    }
  }
`;

// const data = [
//   {
//     title: "Playroll 1",
//     image: require("../../assets/wack.jpg"),
//     text: "Here's a sample playroll!",
//   },
//   {
//     title: "Playroll 2",
//     image: require("../../assets/wack.jpg"),
//     text: "Here's another sample playroll!",
//   },
//   {
//     title: "Playroll 3",
//     image: require("../../assets/wack.jpg"),
//     text: "I'm having fun with this.",
//   },
//   {
//     title: "Playroll 4",
//     image: require("../../assets/wack.jpg"),
//     text: "I'm having fun with this.",
//   },
// ];

export default class Playrolls extends React.Component {
  render() {
    return (
      <Query query={GET_PLAYROLLS}>
        {({ loading, error, data }) => {
          const playrolls = data.listPlayrolls;
          console.log(loading, error, data);
          return (
            <View style={{ flex: 1, marginTop: 20 }}>
              <View>
                <Text style={styles.headline}>Playrolls</Text>
              </View>
              {!loading &&
                !error && (
                  <ScrollView>
                    {playrolls.map((item, index) => (
                      <Card
                        title={`Playroll ${index + 1}`}
                        image={require("../../assets/wack.jpg")}
                        key={index}
                      >
                        <Button
                          icon={<Icon name="code" color="#ffffff" />}
                          backgroundColor="#03A9F4"
                          buttonStyle={{
                            borderRadius: 0,
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: 0,
                          }}
                          title={item.name}
                          onPress={() => {}}
                        />
                      </Card>
                    ))}
                  </ScrollView>
                )}
            </View>
          );
        }}
      </Query>
    );
  }
}
