/**
 * AddFriendScreen
 */

import * as React from 'react';
import { 
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
 } from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { User } from '../../../graphql/types';
import styles from './AddFriendScreen.styles'; 

export interface Props {
  navigation?: NavigationScreenProp<{}>;
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
        {id: "4", name: "username0", avatar: ""},
        {id: "5", name: "username1", avatar: ""},
        {id: "6", name: "username2", avatar: ""},
        {id: "7", name: "username3", avatar: ""},
        {id: "8", name: "username0", avatar: ""},
        {id: "9", name: "username1", avatar: ""},
        {id: "10", name: "username2", avatar: ""},
        {id: "11", name: "username3", avatar: ""},
        {id: "12", name: "username1", avatar: ""},
        {id: "13", name: "username2", avatar: ""},
        {id: "14", name: "username3", avatar: ""},
        {id: "15", name: "username0", avatar: ""},
        {id: "16", name: "username1", avatar: ""},
        {id: "17", name: "username2", avatar: ""},
        {id: "18", name: "username3", avatar: ""},
      ]
    };

    this.renderUserRow = this.renderUserRow.bind(this);
  }
  
  renderSegueIcon() {
    return (
      <Icon
        name="arrow-left"
        type="font-awesome"
        color="white"
        onPress={() => {
          this.props.navigation && this.props.navigation.goBack(null);
        }}
      />
    );
  }

  renderClearTextIcon() {
    return (
      <Icon 
        name="clear"
        type="material"
        color="white"
        onPress={() => this.setState({ username: "" })}
      />
    );
  }

  renderSearchBar() {
    return (
      <TextInput
          placeholder="@playroll"
          placeholderTextColor="#fff"
          style={styles.searchInputContainer}
          onChangeText={username => this.setState({ username })}
          autoCapitalize={'none'}
          value={this.state.username}
          onSubmitEditing={() => this.setState({ renderUsers: true })}
        />
    );
  }

  renderSearchContainer() {
    return (
      <View style={styles.searchBarContainer}>
        {this.renderSearchBar()}
        {this.state.username.length > 0 && this.renderClearTextIcon()}
      </View>
    );
  }

  renderOptionIcon() {
    return (
      <Icon
        name="more-vert"
        type="material"
        color="white"
        onPress={() => {
          console.log('open options?');
        }}
      />
    );
  }

  renderHeader() {
    return (
      <Header
        backgroundColor="#6A0070"
        leftComponent={this.renderSegueIcon()}
        centerComponent={this.renderSearchContainer()}
        rightComponent={this.renderOptionIcon()}
        style={styles.header}
       />
    );
  }
  
  sendFriendRequest() {
    console.log('sendFriendRequest()');
  }

  renderAvatar(item) {
    return (
      <View style={styles.userAvatarContainer}>
        <Image
          style={styles.userAvatar}
          source={{uri: "https://i.pinimg.com/736x/45/b4/b2/45b4b229908ade31fb9fb53942fd3971--chow-chow-puppies-chien-chow-chow.jpg"}}
        />
      </View>
    );
  }

  renderUsername(item) {
    return (
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{item.name}</Text>
      </View>
    );
  }

  renderAddUserButton() {
    return (
      <View style={styles.addUserButtonContainer}>
        <Button 
          buttonStyle={styles.addUserButton} 
          title={"+"} 
          onPress={() => this.sendFriendRequest()}
        />
      </View>
    );
  }

  renderUserRow({item}) {
    return (
      <View style={styles.userRow}>
        {this.renderAvatar(item)}
        {this.renderUsername(item)}
        {this.renderAddUserButton()}
      </View>
    )
  }

  renderUsers() {
    if (this.state.renderUsers) {
      return (
        <ScrollView style={styles.usersContainer}>
          <FlatList 
            data={this.state.users}
            keyExtractor={(user, i) => user.id}
            renderItem={this.renderUserRow}
          />
        </ScrollView>
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
        <View style={styles.mainContainer}>
          {this.renderHeader()}
          {this.renderUsers()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
