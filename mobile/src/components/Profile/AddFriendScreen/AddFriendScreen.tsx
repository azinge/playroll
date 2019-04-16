/**
 * AddFriendScreen
 */

import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  RefreshControl,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ApolloConsumer } from 'react-apollo';
import Errors from '../../shared/Modals/Errors';
import { SEARCH_USERS_QUERY } from '../../../graphql/requests/User/';
import { SendFriendRequestMutation } from '../../../graphql/requests/Relationships';
import { Header, Icon, Button } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import { User } from '../../../graphql/types';
import styles from './AddFriendScreen.styles';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  error?: string;
  displayErrorModal: boolean;
  refreshing: boolean;
  username: string;
  fetchingUsers: boolean;
  dogAvatar: string;
  users?: User[];
}

export default class AddFriendScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: undefined,
      displayErrorModal: false,
      refreshing: false,
      username: '',
      fetchingUsers: false,
      dogAvatar:
        'https://i.pinimg.com/736x/45/b4/b2/45b4b229908ade31fb9fb53942fd3971--chow-chow-puppies-chien-chow-chow.jpg',
      users: [],
    };

    this.handleErrors = this.handleErrors.bind(this);
    this.renderErrorModal = this.renderErrorModal.bind(this);
    this.handleCloseErrorModal = this.handleCloseErrorModal.bind(this);
    this.renderRefreshControl = this.renderRefreshControl.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchQueryData = this.handleSearchQueryData.bind(this);
    this.renderUserRow = this.renderUserRow.bind(this);
    this.handleAddFriendButtonStyle = this.handleAddFriendButtonStyle.bind(
      this
    );
    this.handleAddFriendButtonTitle = this.handleAddFriendButtonTitle.bind(
      this
    );
    this.handleUpdateUsers = this.handleUpdateUsers.bind(this);
    this.handleFriendRequest = this.handleFriendRequest.bind(this);
    this.handleFriendRequestMutationData = this.handleFriendRequestMutationData.bind(
      this
    );
  }

  shouldComponentUpdate() {
    return true;
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
    });
  }

  handleSearchQueryData(data) {
    if (!(data && data.private)) return;
    const { searchUsers } = data.private;
    if (searchUsers) {
      this.setState({ fetchingUsers: false, refreshing: false }, () => {
        return this.handleUpdateUsers(searchUsers);
      });
    }
  }

  renderSegueIcon() {
    return (
      <Icon
        name='arrow-back'
        type='material'
        color='white'
        onPress={() => {
          return this.props.navigation && this.props.navigation.goBack(null);
        }}
      />
    );
  }

  handleSearch(client) {
    if (this.state.username.length === 0) {
      return;
    }
    client
      .query({
        query: SEARCH_USERS_QUERY,
        variables: {
          query: this.state.username,
          offset: 0,
          count: 10,
        },
      })
      .then(({ error, data, loading }) => {
        console.log(
          'validateSearchInput() client.query promise resolved(data):',
          data
        );
        if (error) {
          throw error;
        }
        if (loading) {
          this.setState({ fetchingUsers: true });
        }
        if (data) {
          this.handleSearchQueryData(data);
        }
      })
      .catch(error => {
        console.log(
          'validateSearchInput() client.query promise rejected:',
          error
        );
        if (this.state.fetchingUsers) {
          this.setState({ fetchingUsers: false });
        }
        if (this.state.refreshing) {
          this.setState({ refreshing: false });
        }
        this.handleErrors(error.message);
      });
  }

  renderSearchBar() {
    return (
      <ApolloConsumer>
        {client => (
          <TextInput
            placeholder='@playroll'
            placeholderTextColor='#bdbdbd'
            style={styles.searchInputContainer}
            onChangeText={username => this.setState({ username })}
            autoCapitalize={'none'}
            value={this.state.username}
            onSubmitEditing={() => this.handleSearch(client)}
          />
        )}
      </ApolloConsumer>
    );
  }

  renderClearTextIcon() {
    if (this.state.fetchingUsers) {
      return <ActivityIndicator color={'white'} />;
    }
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

  renderAvatar(user) {
    return (
      <View style={styles.userAvatarContainer}>
        <Image
          style={styles.userAvatar}
          source={{
            uri: user.avatar.length > 0 ? user.avatar : this.state.dogAvatar,
          }}
        />
      </View>
    );
  }

  renderUsername(user) {
    return (
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{user.name}</Text>
      </View>
    );
  }

  handleFriendRequestMutationData(selectedUser, response) {
    const { data } = response;
    if (!(data && data.private)) return;
    const { sendFriendRequest } = data.private;
    if (sendFriendRequest) {
      // NOTE: display modal? [friend request sent]
    }
  }

  handleFriendRequest(user, sendFriendRequest) {
    console.log('handleFriendRequest()');
    sendFriendRequest()
      .then(response => {
        console.log('sendFriendRequest() promise resolved', response);
        return this.handleFriendRequestMutationData(user, response);
      })
      .catch(error => {
        console.log('sendFriendRequest() promise rejected', error);
        this.handleErrors(error.message);
      });
  }

  handleAddFriendButtonStyle(user) {
    // NOTE: Handle if friend request is pending
    // styles.addUserButtonPending
    return styles.addUserButtonStatic;
  }

  handleAddFriendButtonTitle(user) {
    // NOTE: Handle if friend request is pending
    // return '...' || {symbol for pending}
    return '+';
  }

  renderAddUserButton(user) {
    return (
      <SendFriendRequestMutation
        variables={{
          userID: user.id,
        }}
      >
        {(sendFriendRequest, { loading }) => {
          return (
            <View style={styles.addUserButtonContainer}>
              {loading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Button
                  buttonStyle={this.handleAddFriendButtonStyle(user)}
                  title={this.handleAddFriendButtonTitle(user)}
                  onPress={() =>
                    this.handleFriendRequest(user, sendFriendRequest)
                  }
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
        {this.renderAddUserButton(item)}
      </View>
    );
  }

  handleRefresh(client) {
    console.log('handleRefresh()');
    this.setState({ refreshing: true }, () => {
      this.handleSearch(client);
    });
  }

  renderRefreshControl() {
    return (
      <ApolloConsumer>
        {client => (
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.handleRefresh(client)}
          />
        )}
      </ApolloConsumer>
    );
  }

  renderUsers() {
    if (this.state.users.length > 0) {
      return (
        <ScrollView
          style={styles.usersContainer}
          refreshControl={this.renderRefreshControl()}
        >
          <FlatList
            data={this.state.users}
            keyExtractor={user => user.id}
            renderItem={this.renderUserRow}
          />
        </ScrollView>
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
