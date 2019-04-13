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
import RollList from '../../shared/Lists/RollList';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  editPlayrollName: string;
}

export default class ViewPlayrollScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editPlayrollName: '',
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

          // console.log(playroll)
          // console.log(playroll.rolls.length)

          // TODO: Re-do renderRolls() to match new XD Roll Display snippet
          // TODO: Edit roll button (pencil) on right of each Roll should show an Edit modal (currently shows bottom overlay screen)
          // TODO: Add New Roll button should overlay screen from bottom (currently swipes to Edit screen)
          return (
            <View style={styles.screenContainer}>
              <SubScreenContainer
                contentContainerStyle={{ paddingBottom: 80 }}
                title='View Playroll'
                renderHeader={this.renderHeader}
              >
                {/* Icon, Title, and Hashtags */}
                {this.renderTitleBar(playroll)}

                {/* List the Rolls */}
                {this.renderRolls(playroll)}
              </SubScreenContainer>
              {this.renderNewRollButton(playroll)}
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
      ...Icons.settingsIcon,
      onPress: () =>
        NavigationService.navigate('EditPlayroll', {
          managePlayroll: 'View Playroll',
          playroll,
        }),
    };
    const generateTracklistIcon = {
      ...Icons.exportIcon,
      onPress: () =>
        NavigationService.navigate('GenerateTracklist', {
          playroll,
          triggerGenerateTracklist: true,
        }),
    };
    return (
      <SubScreenHeader
        title={'View Playroll'} // visible screen title
        icons={[editPlayrollIcon, generateTracklistIcon]} // top right buttons
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
  renderRolls(playroll) {
    return (
      <RollList
        rolls={playroll.rolls || []}
        // onPress={() => {}}
      />
    );
  }
  renderNewRollButton(playroll) {
    return (
      <View
        style={{
          bottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          // linearGradientProps={{
          //   colors: ['#DA22FF', '#00c6ff'],
          //   start: { x: 0, y: 0.5 },
          //   end: { x: 1, y: 0.5 },
          // }}
          containerStyle={{ borderRadius: 80, width: '75%' }}
          buttonStyle={{ borderRadius: 80, height: 50 }}
          raised
          title={'Add New Rolls'}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={() => {
            NavigationService.navigate('EditPlayroll', {
              managePlayroll: 'View Playroll',
              playroll,
            });
          }}
        />
      </View>
    );
  }
}
