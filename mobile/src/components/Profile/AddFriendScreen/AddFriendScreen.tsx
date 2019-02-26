/**
 * AddFriendScreen
 */

import * as React from 'react';
import { 
  Button,
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
 } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { User } from '../../../graphql/types';
import styles from './AddFriendScreen.styles'; 

export interface Props {
  navigation?: NavigationScreenProps<{}>;
}

interface State {
  error?: string;
  renderUsers: boolean;
  username: string;
  users?: [User],
}

export default class AddFriendScreen extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      error: undefined,
      renderUsers: false,
      username: "",
      users: [
        {id: "0", name: "username0", avatar: ""},
        {id: "1", name: "username1", avatar: ""},
        {id: "2", name: "username2", avatar: ""},
        {id: "3", name: "username3", avatar: ""},
      ]
    };
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Friend</Text>
      </View>
    )
  }

  renderSearchContainer() {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchBarContainer}>
          <TextInput
            placeholder="@playroll"
            style={styles.searchInputContainer}
            onChangeText={username => this.setState({ username })}
            autoCapitalize={'none'}
            value={this.state.username}
          />
        </View>
        <Button 
          style={styles.searchButton} 
          title={"Search"}
          onPress={() => {
            this.setState({ renderUsers: !this.state.renderUsers });
          }}
        />
      </View>
    );
  }

  extractUserId(user, index) {
    return user.id;
  }
  
  sendFriendRequest() {
    console.log('sendFriendRequest()');
  }

  renderUserRow({item}) {
    return (
      <View style={styles.userRow}>
        <View style={styles.userAvatarContainer}>
          <Text>Avatar</Text>
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{item.name}</Text>
        </View>
        <View style={styles.addUserButtonContainer}>
          <Button 
            style={styles.addUserButton} 
            title={"+"} 
            onPress={() => this.sendFriendRequest()}
          />
        </View>
      </View>
    )
  }

  renderUsers() {
    if (this.state.renderUsers) {
      return (
        <View style={styles.usersContainer}>
          <FlatList 
            data={this.state.users}
            keyExtractor={this.extractUserId}
            renderItem={this.renderUserRow}
          />
        </View>
      );
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.container}>
          {this.renderHeader()}
          {this.renderSearchContainer()}
          {this.renderUsers()}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
