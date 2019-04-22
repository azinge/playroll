/**
 * ViewExternalPlayrollScreen
 */

import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import styles, { rawStyles } from './ViewExternalPlayrollScreen.styles';
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
import { CopyPlayrollMutation } from '../../../graphql/requests/Playroll/CopyPlayrollMutation';
import DropdownAlert from 'react-native-dropdownalert';
import { LIST_CURRENT_USER_PLAYROLLS } from '../../../graphql/requests/Playroll/ListCurrentUserPlayrollsQuery';
import { GetPlayrollQuery } from '../../../graphql/requests/Playroll/GetPlayrollQuery';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  editPlayrollName: string;
}

export default class ViewExternalPlayrollScreen extends React.Component<
  Props,
  State
> {
  dropdown: DropdownAlert;

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
      <GetPlayrollQuery variables={{ id: playrollID }}>
        {({ loading, error, data, client: { cache } }) => {
          const playroll: any =
            (data && data.private && data.private.playroll) || {};

          // console.log(playroll)
          // console.log(playroll.rolls.length)

          // TODO: Edit roll button (pencil) on right of each Roll should show an Edit modal (currently shows bottom overlay screen)
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
              <DropdownAlert ref={ref => (this.dropdown = ref)} />
            </View>
          );
        }}
      </GetPlayrollQuery>
    );
  }

  async copyPlayrollWrapper(copyPlayroll, playroll) {
    try {
      await copyPlayroll({
        variables: {
          playrollID: playroll.id,
        },
      });
      this.dropdown.alertWithType(
        'info',
        'Copied Playroll',
        'Successfully Copied Playroll.'
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

  renderHeader() {
    return (
      <CopyPlayrollMutation
        refetchQueries={() => [LIST_CURRENT_USER_PLAYROLLS]}
      >
        {(copyPlayroll, { loading }) => {
          const playroll: Playroll =
            (this.props &&
              this.props.navigation &&
              this.props.navigation.getParam('playroll')) ||
            {};
          const copyPlayrollIcon = {
            ...Icons.saveIcon,
            onPress: () => this.copyPlayrollWrapper(copyPlayroll, playroll),
            render: undefined,
          };
          if (loading) {
            copyPlayrollIcon.render = () => {
              return <ActivityIndicator />;
            };
          }
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
              icons={[copyPlayrollIcon, generateTracklistIcon]} // top right buttons
            />
          );
        }}
      </CopyPlayrollMutation>
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
        readOnly
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
          //   colors: ['purple', '#4A00E0'],
          //   start: { x: 0 },
          //   end: { x: 1 },
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
