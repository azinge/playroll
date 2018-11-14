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
import { Query } from "react-apollo";

import { GET_PLAYROLLS } from "./Playrolls.requests";
import styles from "./Playrolls.styles";

export default class Playrolls extends React.Component {
  render() {
    return (
      <Query query={GET_PLAYROLLS}>
        {({ loading, error, data }) => {
          error && console.log(error);
          return (
            <View style={{ flex: 1, marginTop: 20 }}>
              <View>
                <Text style={styles.headline}>Playrolls</Text>
              </View>
              {!loading &&
                !error && (
                  <ScrollView>
                    {data.listPlayrolls.map((item, index) => (
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
