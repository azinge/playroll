/**
 * AccountScreen
 */

import * as React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native";
import { ListItem } from "react-native-elements";

import styles from "./AccountScreen.styles";
import { SignOutMutation } from "../../../graphql/requests/Auth";
import { GetCurrentUserQuery } from "../../../graphql/requests/User";
import {
  NavigationScreenProp,
  StackActions,
  NavigationActions
} from "react-navigation";
import NavigationService from "../../../services/NavigationService";
import SubScreenContainer from "../../shared/Containers/SubScreenContainer";
import { Button } from "react-native-elements";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

const list = [{}];

export default class AccountScreen extends React.Component<Props, State> {
  // render() {
  //   return (
  //     <GetCurrentUserQuery>
  //       {({ loading, error, data }) => {
  //         if (loading || error || Object.keys(data).length === 0) {
  //           return <SubScreenContainer title="My Account" modal />;
  //         }
  //         const currentUser = (data && data.private.currentUser) || {};
  //         return (
  //           <SubScreenContainer title="My Account" modal>
  //             <View style={{ alignItems: "left", marginVertical: 20 }}>
  //               <Image
  //                 source={{
  //                   uri: currentUser.avatar
  //                 }}
  //                 style={{ height: 100, width: 100, borderRadius: 5 }}
  //               />
  //               <Text
  //                 style={{
  //                   marginLeft: 20,
  //                   fontWeight: "bold",
  //                   fontSize: 20,
  //                   color: "#993399"
  //                 }}
  //               >
  //                 {currentUser.name}
  //               </Text>
  //             </View>
  //           </SubScreenContainer>
  //         );
  //       }}
  //     </GetCurrentUserQuery>
  //   );
  // }
  render() {
    return (
      <GetCurrentUserQuery>
        {({ loading, error, data }) => {
          if (loading || error || Object.keys(data).length === 0) {
            return <SubScreenContainer title="My Account" modal />;
          }
          const currentUser = (data && data.private.currentUser) || {};
          return (
            <SubScreenContainer title="My Account" modal>
              <View
                style={{
                  marginLeft: 15,
                  marginTop: 10,
                  flex: 1,
                  marginBottom: 5,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Image
                  source={{
                    // uri: currentUser.avatar
                    uri:
                      "https://media.pitchfork.com/photos/5b64cdcd0b743703a4982025/2:1/w_790/Travis-Scott.jpg"
                  }}
                  style={{ height: 60, width: 60, borderRadius: 30 }}
                />

                <Text
                  style={{
                    marginLeft: 15,
                    marginTop: 5,
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "#993399"
                  }}
                >
                  {/* {currentUser.name} */}
                  {"Nicolas Raymundo"}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 10
                }}
              >
                {/* View Profile */}
                <TouchableOpacity
                  onPress={() => {
                    NavigationService.navigate("ViewProfile");
                  }}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.enabledText}>View Profile</Text>
                  </View>
                </TouchableOpacity>

                {/* View Friends */}
                <TouchableOpacity
                  onPress={() => {
                    NavigationService.navigate("FriendsMenu");
                  }}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.enabledText}>View Friends</Text>
                  </View>
                </TouchableOpacity>

                {/* Edit Profile */}
                <TouchableOpacity
                  onPress={() => {
                    NavigationService.navigate("EditProfile");
                  }}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.enabledText}>Edit Profile</Text>
                  </View>
                </TouchableOpacity>

                {/* Settings */}
                <TouchableOpacity
                  onPress={() => {
                    NavigationService.navigate("Settings");
                  }}
                >
                  <View style={styles.textContainer}>
                    <Text style={styles.enabledText}>Settings</Text>
                  </View>
                </TouchableOpacity>

                {/* Sign Out */}

                <SignOutMutation>
                  {signOut => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          signOut().then(
                            () =>
                              this.props.navigation &&
                              this.props.navigation.dispatch(
                                StackActions.reset({
                                  key: null,
                                  index: 0,
                                  actions: [
                                    NavigationActions.navigate({
                                      routeName: "Auth"
                                    })
                                  ]
                                })
                              )
                          );
                        }}
                      >
                        <View style={styles.textContainer}>
                          <Text style={styles.signOut}>Sign Out</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                </SignOutMutation>
              </View>
            </SubScreenContainer>
          );
        }}
      </GetCurrentUserQuery>
    );
  }
}
// return (
//   <GetCurrentUserQuery>
//     {({ loading, error, data }) => {
//       if (loading || error || Object.keys(data).length === 0) {
//         return <SubScreenContainer title="My Account" modal />;
//       }
//       const currentUser = (data && data.private.currentUser) || {};
//       return (
//         <SubScreenContainer title="My Account" modal>
//           <View style={{ alignItems: "left" }}>
//             <View style={{ alignItems: "center", marginVertical: 20 }}>
//               <Image
//                 source={{
//                   uri: currentUser.avatar
//                 }}
//                 style={{ height: 100, width: 100, borderRadius: 5 }}
//               />
//               <Text
//                 style={{
//                   fontWeight: "bold",
//                   fontSize: 20,
//                   color: "#993399"
//                 }}
//               >
//                 {currentUser.name}
//               </Text>
//             </View>

//             <Button
//               style={{ marginVertical: 3 }}
//               title="Connect Spotify"
//               onPress={() => {
//                 NavigationService.navigate("ConnectSpotify");
//               }}
//             />

//             <Button
//               style={{ marginVertical: 3 }}
//               title="My Public Profile"
//               onPress={() => {
//                 NavigationService.navigate("ViewProfile");
//               }}
//               disabled
//             />

//             <Button
//               style={{ marginVertical: 3 }}
//               title="My Friends"
//               onPress={() => {
//                 NavigationService.navigate("FriendsMenu");
//               }}
//               disabled
//             />

//             <Button
//               style={{ marginVertical: 3 }}
//               title="Edit Profile"
//               onPress={() => {
//                 NavigationService.navigate("EditProfile");
//               }}
//               disabled
//             />

//             <Button
//               style={{ marginVertical: 3 }}
//               title="Settings"
//               onPress={() => {
//                 NavigationService.navigate("Settings");
//               }}
//               disabled
//             />

//             <SignOutMutation>
//               {signOut => {
//                 return (
//                   <Button
//                     style={{ marginVertical: 50 }}
//                     title="Sign Out"
//                     onPress={() => {
//                       signOut().then(
//                         () =>
//                           this.props.navigation &&
//                           this.props.navigation.dispatch(
//                             StackActions.reset({
//                               key: null,
//                               index: 0,
//                               actions: [
//                                 NavigationActions.navigate({
//                                   routeName: "Auth"
//                                 })
//                               ]
//                             })
//                           )
//                       );
//                     }}
//                   />
//                 );
//               }}
//             </SignOutMutation>
//           </View>
//         </SubScreenContainer>
//       );
//     }}
//   </GetCurrentUserQuery>
// );
//   }
// }
