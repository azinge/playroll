/**
 * ViewPlayrollScreen
 */

import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import styles, { rawStyles } from './ViewPlayrollScreen.styles';
import { Playroll, MusicSource, Roll } from '../../../graphql/types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  UpdatePlayrollMutation,
  GetCurrentUserPlayrollQuery,
} from '../../../graphql/requests/Playroll';
import { GenerateTracklistMutation } from '../../../graphql/requests/Tracklist';
import { SafeAreaView } from 'react-navigation';
import { GET_CURRENT_USER_PLAYROLL } from '../../../graphql/requests/Playroll/GetCurrentUserPlayrollQuery';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import SubScreenHeader from '../../shared/Headers/SubScreenHeader';
import Icons from '../../../themes/Icons';
import NavigationService from '../../../services/NavigationService';
import RollList from '../../shared/Lists/RollList';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { CreateRollMutation } from '../../../graphql/requests/Roll';
import FooterButton from '../../shared/Buttons/FooterButton';
import DropdownAlert from 'react-native-dropdownalert';
import { ReorderPlayrollMutation } from '../../../graphql/requests/Playroll/ReorderPlayrollMutation';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  editPlayrollName: string;
  inEditMode: boolean;
}

export default class ViewPlayrollScreen extends React.Component<Props, State> {
  dropdown: DropdownAlert;
  constructor(props: Props) {
    super(props);
    const playroll: Playroll =
      (props && props.navigation && props.navigation.getParam('playroll')) ||
      {};
    const inEditMode: boolean =
      (props && props.navigation && props.navigation.getParam('inEditMode')) ||
      false;
    this.state = {
      editPlayrollName: playroll.name,
      inEditMode,
    };
    this.renderHeader = this.renderHeader.bind(this);
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
                contentContainerStyle={{
                  paddingBottom: isIphoneX() ? hp('11%') : hp('7%'),
                }}
                title='View Playroll'
                renderHeader={this.renderHeader}
              >
                {/* Icon, Title, and Hashtags */}
                {this.state.inEditMode
                  ? this.renderPlayrollHeader(playroll)
                  : this.renderTitleBar(playroll)}

                {/* List the Rolls */}
                {this.renderRolls(playroll)}
              </SubScreenContainer>
              {this.state.inEditMode && this.renderNewRollButton(playroll)}
              <DropdownAlert ref={ref => (this.dropdown = ref)} />
            </View>
          );
        }}
      </GetCurrentUserPlayrollQuery>
    );
  }
  renderHeader() {
    const playroll: Playroll =
      (this.props &&
        this.props.navigation &&
        this.props.navigation.getParam('playroll')) ||
      {};

    const addRollIcon = {
      ...Icons.addIcon,
      onPress: () => NavigationService.navigate('EditRoll'),
    };
    const editPlayrollIcon = {
      ...Icons.editIcon,
      onPress: () => this.setState({ inEditMode: true }),
    };
    const viewPlayrollIcon = {
      name: 'pencil-off',
      type: 'material-community',
      onPress: () => this.setState({ inEditMode: false }),
    };
    const generateTracklistIcon = {
      ...Icons.exportIcon,
      onPress: () =>
        NavigationService.navigate('GenerateTracklist', {
          playroll,
          triggerGenerateTracklist: true,
        }),
    };
    const recommendationIcon = {
      type: 'material',
      name: 'chat',
      onPress: () =>
        NavigationService.navigate('RecommendToFriend', {
          playrollID: playroll.id,
        }),
    };
    return (
      <SubScreenHeader
        title={this.state.inEditMode ? 'Edit Playroll' : 'View Playroll'} // visible screen title
        icons={
          this.state.inEditMode
            ? [viewPlayrollIcon]
            : [recommendationIcon, editPlayrollIcon, generateTracklistIcon]
        } // top right buttons
      />
    );
  }
  renderTitleBar(playroll: Playroll) {
    return (
      <View style={styles.titleBarContainer}>
        <Image
          style={rawStyles.titleBarImage}
          source={require('../../../assets/new_playroll.png')}
        />
        <View style={styles.titleBarNameContainer}>
          <Text style={styles.titleBarName}>{playroll.name}</Text>
          <View style={styles.horizontalRule} />
          {playroll && playroll.rolls && (
            <Text selectionColor={'purple'} style={styles.subtitle}>
              This playroll contains {playroll.rolls.length}{' '}
              {playroll.rolls.length === 1 ? 'roll' : 'rolls'}.
            </Text>
          )}
        </View>
      </View>
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
          refetchQueries={() => [GET_CURRENT_USER_PLAYROLL]}
        >
          {(updatePlayroll, { data }) => (
            <View style={styles.titleBarName}>
              <TextInput
                selectionColor={'purple'}
                placeholder='Name Your Playroll'
                placeholderTextColor='lightgrey'
                style={styles.editingBarNameInput}
                value={this.state.editPlayrollName}
                onChangeText={name => this.setState({ editPlayrollName: name })}
                onSubmitEditing={() =>
                  updatePlayroll({
                    variables: {
                      id: playroll.id,
                      input: {
                        name: this.state.editPlayrollName,
                        userID: playroll.userID,
                      },
                    },
                  })
                }
              />
              <View style={styles.horizontalRule} />
              {playroll && playroll.rolls && (
                <Text style={styles.subtitle}>
                  This playroll contains {playroll.rolls.length}{' '}
                  {playroll.rolls.length === 1 ? 'roll' : 'rolls'}.
                </Text>
              )}
            </View>
          )}
        </UpdatePlayrollMutation>
      </View>
    );
  }
  renderRolls(playroll) {
    return (
      <ReorderPlayrollMutation>
        {reorderPlayroll => {
          return (
            <RollList
              rolls={playroll.rolls || []}
              // onPress={() => {}}
              readOnly={!this.state.inEditMode}
              disableManage={this.state.inEditMode}
              onMoveEnd={({ data: rolls }) => {
                console.log(rolls);
                reorderPlayroll({
                  variables: {
                    playrollID: playroll.id,
                    rollIDs: rolls.map(roll => roll.id),
                    orders: rolls.map((_, i) => i),
                  },
                });
              }}
            />
          );
        }}
      </ReorderPlayrollMutation>
    );
  }

  async createRollWrapper(createRoll, playroll, musicSource) {
    try {
      NavigationService.goBack();
      delete musicSource.__typename;
      await createRoll({
        variables: {
          input: {
            playrollID: playroll.id,
            data: {
              sources: [musicSource],
              filters: [
                {
                  type: 'Source',
                  name: 'Union',
                  modifications: ['0'],
                },
                {
                  type: 'Order',
                  name: 'Default',
                },
                {
                  type: 'Length',
                  name: 'Default',
                },
              ],
            },
            order: playroll.rolls.length,
          },
        },
      });
      this.dropdown.alertWithType(
        'info',
        'Added to Playroll',
        'Roll successfully added to playroll.'
      );
    } catch (err) {
      console.log(err);
      this.dropdown.alertWithType(
        'error',
        'Error',
        "We're sorry, Please try again."
      );
    }
  }
  renderNewRollButton(playroll) {
    return (
      <CreateRollMutation refetchQueries={() => [GET_CURRENT_USER_PLAYROLL]}>
        {(createRoll, { data }) => (
          <FooterButton
            title={'Add a Roll'}
            onPress={() => {
              NavigationService.navigate('Search', {
                onPress: musicSource => {
                  this.createRollWrapper(createRoll, playroll, musicSource);
                },
              });
            }}
          />
        )}
      </CreateRollMutation>
    );
  }
}
