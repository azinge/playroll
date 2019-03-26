/**
 * ViewPlayrollScreen
 */

import * as React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
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
          // console.log(data)
          const playroll: any =
            (data && data.private && data.private.currentUserPlayroll) || {};

          console.log(playroll)
          return (
            <View style={styles.screenContainer}>
              <SubScreenContainer
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
            onPress: () => generateTracklist(),
          };
          return (
            <SubScreenHeader
              title={'View Playroll'}
              icons={[editPlayrollIcon, generateTracklistIcon]}
            />
          );
        }}
      </GenerateTracklistMutation>
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
          <Text
            selectionColor={'purple'}
            placeholder='Name Your Playroll'
            placeholderTextColor='lightgrey'
            style={styles.titleBarName}
            onChangeText={name => this.setState({ editPlayrollName: name })}
            onSubmitEditing={() => updatePlayroll()}
          >
            {playroll.name}
          </Text>
          <View style={styles.horizontalRule} />
          <Text
            selectionColor={'purple'}
            // placeholder='#Existential #Chill #Help #Test'
            // placeholderTextColor='lightgrey'
            style={styles.titleBarTags}
          >#Existential #Chill #Help #Test</Text>
        </View>
      </View>
    );
  }
  renderRolls(playroll) {
    return (
      <RollList
        rolls={playroll.rolls || []}
        onPress={roll => {
          NavigationService.navigate('EditRoll', {
            roll,
          });
        }}
      />
    );
  }
  renderNewRollButton(playroll) {
    return (
      <View style={styles.footerView}>
        <Button
          title='New Roll'
          containerStyle={styles.newRollButton}
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
