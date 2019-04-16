/**
 * RecommendationCard
 */

import * as React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Swipeout from "react-native-swipeout";

import styles from "./RecommendationCard.styles";
import { Recommendation } from "../../../../graphql/types";
import { Icon } from "react-native-elements";
import NavigationService from "../../../../services/NavigationService";
import ManageRollScreen from "../../../Search/ManageRollScreen";

export interface Props {
  recommendation: Recommendation;
  onPress?: (recommendation: Recommendation) => void;
}

interface State {}

export default class RecommendationCard extends React.Component<Props, State> {
  render() {
    const { recommendation } = this.props;
    const mainSource =
      (recommendation.data &&
        recommendation.data.sources &&
        recommendation.data.sources[0]) ||
      {};
    return (
      <Swipeout
        right={[
          {
            text: "Dismiss",
            backgroundColor: "#c70700"
          }
        ]}
        backgroundColor={"transparent"}
        autoClose={true}
      >
        <TouchableOpacity
          onPress={() => this.manageRoll(mainSource)}
          key={recommendation.id}
        >
          <View
            style={{ width: "100%", alignItems: "center" }}
            key={recommendation.id}
          >
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Image style={styles.cover} source={{ uri: mainSource.cover }} />
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                <Text style={styles.artist} numberOfLines={2}>
                  {mainSource.name}
                </Text>

                {/* ISSUE WITH RECOMMENDER */}
                <Text style={styles.manageRoll}>
                  Recommended by: {recommendation.id}
                  {/* {console.log(
                    "RECOMMENDER: " +
                      recommendation.recommender.name +
                      "\n" +
                      "length: " +
                      recommendation.recommender.name.length
                  )}
                  {recommendation &&
                    recommendation.recommender &&
                    recommendation.recommender.name} */}
                </Text>
              </View>
              <Icon
                size={35}
                name="more-vert"
                color="lightgrey"
                underlayColor="rgba(255,255,255,0)"
                onPress={() => NavigationService.goBack()}
              />
            </View>
            <View style={styles.spacing} />
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
  manageRoll(source) {
    NavigationService.navigate("ManageRoll", {
      currentSource: source
    });
  }
}
