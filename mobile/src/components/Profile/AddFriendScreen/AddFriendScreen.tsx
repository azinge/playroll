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
  View,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
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
  users?: [User];
}

export default class AddFriendScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: undefined,
      renderUsers: false,
      username: '',
      users: [
        { id: '0', name: 'username0', avatar: '' },
        { id: '1', name: 'username1', avatar: '' },
        { id: '2', name: 'username2', avatar: '' },
        { id: '3', name: 'username3', avatar: '' },
        { id: '4', name: 'username0', avatar: '' },
        { id: '5', name: 'username1', avatar: '' },
        { id: '6', name: 'username2', avatar: '' },
        { id: '7', name: 'username3', avatar: '' },
        { id: '8', name: 'username0', avatar: '' },
        { id: '9', name: 'username1', avatar: '' },
        { id: '10', name: 'username2', avatar: '' },
        { id: '11', name: 'username3', avatar: '' },
        { id: '12', name: 'username1', avatar: '' },
        { id: '13', name: 'username2', avatar: '' },
        { id: '14', name: 'username3', avatar: '' },
        { id: '15', name: 'username0', avatar: '' },
        { id: '16', name: 'username1', avatar: '' },
        { id: '17', name: 'username2', avatar: '' },
        { id: '18', name: 'username3', avatar: '' },
      ],
    };

    this.renderUserRow = this.renderUserRow.bind(this);
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.segueToBrowseContainer}>
          <Icon
            name='arrow-left'
            type='font-awesome'
            color='#6A0070'
            underlayColor='rgba(255,255,255,0)'
            onPress={() => {
              this.props.navigation && this.props.navigation.goBack(null);
            }}
          />
          <Text style={styles.browseTitle}>Browse</Text>
        </View>
        <Text style={styles.headerTitle}>Add Friend</Text>
      </View>
    );
  }

  renderSearchBar() {
    return (
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder='@playroll'
          style={styles.searchInputContainer}
          onChangeText={username => this.setState({ username })}
          autoCapitalize={'none'}
          value={this.state.username}
        />
      </View>
    );
  }

  renderSearchButton() {
    return (
      <Button
        buttonStyle={styles.searchButton}
        title={'Search'}
        onPress={() => {
          this.setState({ renderUsers: !this.state.renderUsers });
        }}
      />
    );
  }

  renderSearchContainer() {
    return (
      <View style={styles.searchContainer}>
        {this.renderSearchBar()}
        {this.state.username.length > 0 && this.renderSearchButton()}
      </View>
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
          source={{
            uri:
              'https://i.pinimg.com/736x/45/b4/b2/45b4b229908ade31fb9fb53942fd3971--chow-chow-puppies-chien-chow-chow.jpg',
          }}
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
          title={'+'}
          onPress={() => this.sendFriendRequest()}
        />
      </View>
    );
  }

  renderUserRow({ item }) {
    return (
      <View style={styles.userRow}>
        {this.renderAvatar(item)}
        {this.renderUsername(item)}
        {this.renderAddUserButton()}
      </View>
    );
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
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.container}>
            {this.renderHeader()}
            {this.renderSearchContainer()}
            {this.renderUsers()}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
