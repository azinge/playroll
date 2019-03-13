/**
 * ManagePlayrollScreen
 */

import * as React from 'react';
import { View, TextInput, ScrollView, Image } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import styles, { rawStyles } from './ManagePlayrollScreen.styles';
import Search from '../../shared/Search';
import { Playroll, MusicSource } from '../../../graphql/types';

import {
  UpdatePlayrollMutation,
  GetCurrentUserPlayrollQuery,
} from '../../../graphql/requests/Playroll';
import { GenerateTracklistMutation } from '../../../graphql/requests/Tracklist';

import { GET_CURRENT_USER_PLAYROLL } from '../../../graphql/requests/Playroll/GetCurrentUserPlayrollQuery';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  editPlayrollName: string;
}

export default class ManagePlayrollScreen extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editPlayrollName: '',
    };
  }

  render() {
    const playrollID: number =
      (this.props &&
        this.props.navigation &&
        this.props.navigation.getParam('playroll').id) ||
      {};
    return (
      <GetCurrentUserPlayrollQuery variables={{ id: playrollID }}>
        {({ loading, error, data, client: { cache } }) => {
          const playroll: Playroll =
            (data && data.private.currentUserPlayroll) || {};
          return (
            <View style={styles.screenContainer}>
              {this.renderHeader(playroll)}
              {this.renderEditingBar(playroll)}
              {this.renderSearchMusic(playroll)}
              {this.renderBottomBar(playroll)}
            </View>
          );
        }}
      </GetCurrentUserPlayrollQuery>
    );
  }
  renderHeader(playroll: Playroll) {
    return (
      <GenerateTracklistMutation
        variables={{ playrollID: playroll.id }}
        onCompleted={data =>
          this.props.navigation &&
          this.props.navigation.navigate('Tracklist', {
            playrollName: playroll.name,
            tracklistID:
              data &&
              data.private.generateTracklist &&
              data.private.generateTracklist.id,
          })
        }
      >
        {(generateTracklist, { data }) => {
          return (
            <Header
              backgroundColor='purple'
              leftComponent={
                <Icon
                  name='arrow-back'
                  color='white'
                  onPress={() =>
                    this.props.navigation && this.props.navigation.goBack(null)
                  }
                  underlayColor='purple'
                />
              }
              centerComponent={{
                text: playroll.name,
                style: styles.headerCenterComponent,
              }}
              rightComponent={
                <Icon
                  name='save'
                  color='white'
                  onPress={() => generateTracklist()}
                />
              }
            />
          );
        }}
      </GenerateTracklistMutation>
    );
  }
  renderEditingBar(playroll: Playroll) {
    return (
      <View style={styles.editingBarContainer}>
        <Image
          style={rawStyles.editingBarImage}
          source={require('../../../assets/new_playroll.png')}
        />
        <UpdatePlayrollMutation
          variables={{
            id: playroll.id,
            input: {
              name: this.state.editPlayrollName,
              userID: playroll.userID,
            },
          }}
          refetchQueries={[GET_CURRENT_USER_PLAYROLL]}
        >
          {(updatePlayroll, { data }) => (
            <View style={styles.editingBarNameContainer}>
              <TextInput
                selectionColor={'purple'}
                placeholder='Name Your Playroll'
                placeholderTextColor='lightgrey'
                style={styles.editingBarNameInput}
                onChangeText={name => this.setState({ editPlayrollName: name })}
                onSubmitEditing={() => updatePlayroll()}
              >
                {playroll.name}
              </TextInput>
              <View style={styles.horizontalRule} />
              <TextInput
                selectionColor={'purple'}
                placeholder='#Existential #Chill #Help'
                placeholderTextColor='lightgrey'
                style={styles.editingBarTagInput}
              />
            </View>
          )}
        </UpdatePlayrollMutation>
      </View>
    );
  }

  renderSearchMusic(playroll: Playroll) {
    return (
      <View style={styles.searchMusicContainer}>
        <Search playrollID={playroll.id} />
      </View>
    );
  }

  renderBottomBar(playroll: Playroll) {
    const iconMap: { [index: string]: string } = {
      Track: 'audiotrack',
      Album: 'album',
      Artist: 'mic',
      Playlist: 'playlist-play',
    };
    return (
      <View style={styles.bottomBarContainer}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.bottomBarScrollViewStyle}
        >
          {playroll.rolls &&
            playroll.rolls.map((roll, idx) => {
              const val: MusicSource =
                (roll.data && roll.data.sources && roll.data.sources[0]) || {};
              return (
                <View style={styles.bottomBarItemContainer} key={idx}>
                  <Image
                    style={rawStyles.bottomBarItemImage}
                    source={{ uri: val.cover }}
                  />
                  {val.type && (
                    <View style={styles.bottomBarIconContainer}>
                      {
                        <Icon
                          name={iconMap[val.type] || iconMap.Track}
                          size={20}
                          color='purple'
                          onPress={() =>
                            this.props.navigation &&
                            this.props.navigation.goBack(null)
                          }
                          underlayColor='purple'
                        />
                      }
                    </View>
                  )}
                </View>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}
