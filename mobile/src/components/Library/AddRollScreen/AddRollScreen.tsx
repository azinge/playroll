/**
 * AddRollScreen
 */

import * as React from 'react';
import { View, ScrollView, Text, TextInput, Image } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import styles, { rawStyles } from './AddRollScreen.styles';
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

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  editPlayrollName: string;
}

export default class AddRollScreen extends React.Component<Props, State> {
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

    console.log('ADD ROLL SCREEN > RENDER > START');
    return (
      <GetCurrentUserPlayrollQuery variables={{ id: playrollID }}>
        {({ loading, error, data, client: { cache } }) => {
          const playroll: any =
            (data && data.private && data.private.currentUserPlayroll) || {};
          return (
            <View style={{ flex: 1 }}>
              <SubScreenContainer renderHeader={this.renderHeader}>
                <View style={styles.screenContainer}>
                  {/* {this.renderHeader(playroll)} */}
                  {this.renderTitleBar(playroll)}
                  {this.renderSearchMusic(playroll)}
                </View>
              </SubScreenContainer>
              {/* {this.renderBottomBar(playroll)} */}
            </View>
          );
        }}
      </GetCurrentUserPlayrollQuery>
    );
    console.log('ADD ROLL SCREEN > RENDER > END');
  }
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
            onPress: () => generateTracklist(),
          };
          return (
            <SubScreenHeader
              title='Add a Roll'
              icons={[generateTracklistIcon]}
            />
          );
        }}
      </GenerateTracklistMutation>
    );
  }

  renderTitleBar(playroll: Playroll) {
    console.log(styles);
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
              Select an item below.
            </Text>
          )}
        </View>
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
}
