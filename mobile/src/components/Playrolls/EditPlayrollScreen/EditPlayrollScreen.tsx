/**
 * EditPlayrollScreen
 */

import * as React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import styles, { rawStyles } from './EditPlayrollScreen.styles';
import Search from './Search';
import { Playroll, MusicSource } from '../../../graphql/types';

import {
  UpdatePlayrollMutation,
  GetCurrentUserPlayrollQuery,
} from '../../../graphql/requests/Playroll';
import { GenerateTracklistMutation } from '../../../graphql/requests/Tracklist';

import { GET_CURRENT_USER_PLAYROLL } from '../../../graphql/requests/Playroll/GetCurrentUserPlayrollQuery';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import SubScreenHeader from '../../shared/Headers/SubScreenHeader';
import Icons from '../../../themes/Icons';
import NavigationService from '../../../services/NavigationService';
import FooterButton from '../../shared/Buttons/FooterButton';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  editPlayrollName: string;
}

export default class EditPlayrollScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editPlayrollName: '',
    };
    // this.renderHeader = this.renderHeader.bind(this);
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
          const playroll: any =
            (data && data.private && data.private.currentUserPlayroll) || {};
          return (
            <View style={{ flex: 1 }}>
              <SubScreenContainer
                title='Edit Playroll'
                renderHeader={this.renderHeader}
              >
                <View style={styles.screenContainer}>
                  {/* Playroll Icon, Name and Subtitle */}
                  {this.renderPlayrollHeader(playroll)}

                  {/* Search Bar and Results */}
                  {/* TODO: This should be a list of current Rolls, not search results */}
                  {this.renderSearch(playroll)}
                </View>
              </SubScreenContainer>
              {this.renderNewRollButton(playroll)}
            </View>
          );
        }}
      </GetCurrentUserPlayrollQuery>
    );
  }

  // Header of the screen
  renderHeader() {
    const playroll: Playroll =
      (this.props &&
        this.props.navigation &&
        this.props.navigation.getParam('playroll')) ||
      {};
    return (
      <GenerateTracklistMutation
        variables={{ playrollID: playroll.id }}
        onCompleted={data =>
          this.props.navigation &&
          this.props.navigation.navigate('ViewTracklist', {
            playrollName: playroll.name,
            tracklistID:
              data &&
              data.private.generateTracklist &&
              data.private.generateTracklist.id,
          })
        }
      >
        {(generateTracklist, { data }) => {
          const generateTracklistIcon = {
            ...Icons.exportIcon,
            // onPress: () => generateTracklist(),
            onPress: () => NavigationService.navigate('GenerateTracklist'),
          };
          return (
            <SubScreenHeader
              title='Edit Playroll'
              icons={[generateTracklistIcon]}
            />
          );
        }}
      </GenerateTracklistMutation>
    );
  }

  // Thumbnail, Name, and Subtitle
  renderPlayrollHeader(playroll: Playroll) {
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
          refetchQueries={() => [GET_CURRENT_USER_PLAYROLL]}
        >
          {(updatePlayroll, { data }) => (
            <View style={styles.titleBarName}>
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
              {playroll && playroll.rolls && (
                <Text style={styles.subtitle}>
                  Select a roll below to add to this playroll.
                </Text>
              )}
            </View>
          )}
        </UpdatePlayrollMutation>
      </View>
    );
  }

  // Search Bar and Results
  renderSearch(playroll: Playroll) {
    return (
      <View style={styles.searchMusicContainer}>
        <Search playrollID={playroll.id} />
      </View>
    );
  }

  // Bottom Bar of Icons to display current list of Rolls
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
              // console.log(val);
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
                          underlayColor='rgba(255,255,255,0)'
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

  renderNewRollButton(playroll) {
    return (
      <FooterButton
        title={'Add a Roll'}
        onPress={() => {
          NavigationService.navigate('AddRoll', {
            managePlayroll: 'View Playroll',
            playroll,
          });
        }}
      />
    );
  }
}
