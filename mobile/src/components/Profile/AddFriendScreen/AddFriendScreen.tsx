/**
 * AddFriendScreen
 */

import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Errors from '../../shared/Modals/Errors';
import { SearchUsersQuery } from '../../../graphql/requests/User/';
import { SendFriendRequestMutation } from '../../../graphql/requests/Relationships';
import { Header, Icon, Button } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { User } from '../../../graphql/types';
import styles from './AddFriendScreen.styles';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  renderUsers: boolean;
  searchForUsers: boolean;
  username: string;
  users?: [User];
  selectedUser?: User;
  error?: string;
  displayErrorModal?: boolean;
}

export default class AddFriendScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: undefined,
      renderUsers: false,
      searchForUsers: false,
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
        { id: '19', name: 'username3', avatar: '' },
        { id: '20', name: 'username0', avatar: '' },
        { id: '21', name: 'username1', avatar: '' },
        { id: '22', name: 'username2', avatar: '' },
        { id: '23', name: 'username3', avatar: '' },
        { id: '24', name: 'username0', avatar: '' },
        { id: '25', name: 'username1', avatar: '' },
        { id: '26', name: 'username2', avatar: '' },
        { id: '27', name: 'username3', avatar: '' },
        { id: '28', name: 'username0', avatar: '' },
        { id: '29', name: 'username1', avatar: '' },
        { id: '30', name: 'username2', avatar: '' },
      ],
      selectedUser: { id: 0 },
    };

    this.handleErrors = this.handleErrors.bind(this);
    this.renderErrorModal = this.renderErrorModal.bind(this);
    this.handleCloseErrorModal = this.handleCloseErrorModal.bind(this);
    this.renderUserRow = this.renderUserRow.bind(this);
    this.handleSearchQueryData = this.handleSearchQueryData.bind(this);
    this.handleUpdateUsers = this.handleUpdateUsers.bind(this);
    this.handleFriendRequest = this.handleFriendRequest.bind(this);
  }

  handleErrors(error) {
    this.setState({
      error,
      displayErrorModal: true,
    });
  }

  renderErrorModal(error) {
    return (
      <Errors
        displayErrorModal={this.state.displayErrorModal}
        error={error}
        onPress={this.handleCloseErrorModal}
      />
    );
  }

  handleCloseErrorModal() {
    this.setState({
      displayErrorModal: false,
      error: null,
    });
  }

  handleUpdateUsers(users) {
    return this.setState({
      users,
      searchForUsers: false,
    });
  }

  handleSearchQueryData(data) {
    if (!(data && data.private)) return;
    const { searchUsers } = data.private;
    if (searchUsers && this.state.searchForUsers) {
      return this.handleUpdateUsers(searchUsers);
    }
  }

  renderSegueIcon() {
    return (
      <Icon
        name='arrow-back'
        type='material'
        color='white'
        onPress={() => {
          this.props.navigation && this.props.navigation.goBack(null);
        }}
      />
    );
  }

  renderSearchBar() {
    return (
      <TextInput
        placeholder='@playroll'
        placeholderTextColor='#bdbdbd'
        style={styles.searchInputContainer}
        onChangeText={username => this.setState({ username })}
        autoCapitalize={'none'}
        value={this.state.username}
        onSubmitEditing={() =>
          this.setState({ renderUsers: true, searchForUsers: true })
        }
      />
    );
  }

  renderClearTextIcon() {
    return (
      <Icon
        name='clear'
        type='material'
        color='white'
        onPress={() => this.setState({ username: '' })}
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

  openOptions() {
    // TODO: Action to open options.
  }

  renderOptionIcon() {
    return (
      <Icon
        name='more-vert'
        type='material'
        color='white'
        onPress={this.openOptions}
      />
    );
  }

  renderHeader() {
    return (
      <Header
        backgroundColor='#6A0070'
        leftComponent={this.renderSegueIcon()}
        centerComponent={this.renderSearchContainer()}
        rightComponent={this.renderOptionIcon()}
      />
    );
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

  handleFriendRequest(sendFriendRequest) {
    console.log('handleFriendRequest()');
    sendFriendRequest()
      .then(result => {
        console.log('sendFriendRequest() promise resolved', result);
        if (result && result.data) {
          // TODO: change (+) to checkmark?
        }
      })
      .catch(error => {
        console.log('sendFriendRequest() promise rejected', error);
        this.handleErrors(error.message);
      });
  }

  renderAddUserButton() {
    return (
      <SendFriendRequestMutation
        variables={{
          userID: this.state.selectedUser.id,
        }}
      >
        {(sendFriendRequest, { loading }) => {
          return (
            <View style={styles.addUserButtonContainer}>
              {loading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Button
                  buttonStyle={styles.addUserButton}
                  title={'+'}
                  onPress={() => this.handleFriendRequest(sendFriendRequest)}
                />
              )}
            </View>
          );
        }}
      </SendFriendRequestMutation>
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
        <SearchUsersQuery
          variables={{
            query: this.state.username,
            offset: 0,
            count: 5,
          }}
        >
          {({ loading, data, error }) => {
            if (error) console.log('error', error);
            if (loading) console.log('loading...', loading);
            if (data) this.handleSearchQueryData(data);
            return (
              <ScrollView style={styles.usersContainer}>
                <FlatList
                  data={this.state.users}
                  keyExtractor={(user, i) => user.id}
                  renderItem={this.renderUserRow}
                />
              </ScrollView>
            );
          }}
        </SearchUsersQuery>
      );
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderHeader()}
        {this.renderUsers()}
        {this.renderErrorModal(this.state.error)}
      </View>
    );
  }
}
