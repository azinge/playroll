/**
 * FriendCard
 */

import * as React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Swipeout from "react-native-swipeout";

import { Icon } from "react-native-elements";
import NavigationService from "../../../../services/NavigationService";
// import { listFriends } from "../../../../graphql/types";

import styles from "./FriendCard.styles";

export interface Props {
  // friend: Friend;
}

interface State {}

export default class FriendCard extends React.Component<Props, State> {
  render() {
    // const { recommendation } = this.props;
    return (
      <Swipeout
        right={[
          {
            text: "Unfollow",
            backgroundColor: "#c70700"
          }
        ]}
        backgroundColor={"transparent"}
        autoClose={true}
      >
        <TouchableOpacity>
          <View style={{ width: "100%", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%"
              }}
            >
              <Image
                style={styles.cover}
                source={{
                  uri:
                    "https://d3c1jucybpy4ua.cloudfront.net/data/61086/big_picture/travis.jpg?1543404280"
                }}
              />
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                {/* Dummy Info */}
                <Text style={styles.artist} numberOfLines={2}>
                  Travis Scott
                </Text>
                {/* Dummy Info */}
                <Text style={styles.subInfo} numberOfLines={2}>
                  6 Followers
                </Text>
              </View>
              <Icon
                size={35}
                name="more-vert"
                color="lightgrey"
                underlayColor="rgba(255,255,255,0)"
                // onPress={() => NavigationService.goBack()}
              />
            </View>
            <View style={styles.spacing} />
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}
