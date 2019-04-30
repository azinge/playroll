/**
 * GenerateTracklistScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import DropdownAlert from 'react-native-dropdownalert';
import { NavigationScreenProp } from 'react-navigation';

import styles from './GenerateTracklistScreen.styles';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import Heading from '../../shared/Text/Heading';
import { Playroll } from '../../../graphql/types';
import { ProgressiveGenerateTracklistMutation } from '../../../graphql/requests/Tracklist';
import NavigationService from '../../../services/NavigationService';
import { GetCurrentUserPlayrollQuery } from '../../../graphql/requests/Playroll';
import RollList from '../../shared/Lists/RollList';
import { GetPlayrollQuery } from '../../../graphql/requests/Playroll/GetPlayrollQuery';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  playroll: Playroll;
  triggerGenerateTracklist: boolean;
  isComplete: boolean;
  currentRollIndex: number;
  currentSourceIndex: number;
  tracklistID?: number;
}

export default class GenerateTracklistScreen extends React.Component<
  Props,
  State
> {
  dropdown: DropdownAlert;

  constructor(props: Props) {
    super(props);

    this.state = {
      playroll: {},
      triggerGenerateTracklist: false,
      isComplete: false,
      currentRollIndex: 0,
      currentSourceIndex: 0,
      tracklistID: undefined,
    };
  }

  componentDidMount() {
    const playroll =
      this.props.navigation && this.props.navigation.getParam('playroll');
    const triggerGenerateTracklist =
      this.props.navigation &&
      this.props.navigation.getParam('triggerGenerateTracklist');
    if (playroll) {
      this.setState({ playroll, triggerGenerateTracklist });
    }
  }

  async progressiveGenerateTracklistWrapper(progressiveGenerateTracklist) {
    const { playroll } = this.state;
    try {
      const result = await progressiveGenerateTracklist({
        variables: {
          playrollID: playroll.id,
          tracklistID: this.state.tracklistID,
          batchSize: 1,
        },
      });
      const {
        isComplete,
        currentRollIndex,
        currentSourceIndex,
        tracklistID,
      } = result.data!.private.progressiveGenerateTracklist!;
      this.setState(
        {
          isComplete,
          currentRollIndex,
          currentSourceIndex,
          tracklistID,
        },
        () => {
          setTimeout(() => {
            console.log(isComplete, tracklistID);
            if (!isComplete) {
              this.progressiveGenerateTracklistWrapper(
                progressiveGenerateTracklist
              );
            } else {
              NavigationService.navigate('ViewTracklist', {
                playrollName: playroll.name,
                tracklistID,
              });
            }
          }, 500);
        }
      );
    } catch (err) {
      console.log(err);
      this.dropdown.alertWithType(
        'error',
        'Error',
        "We're sorry, Please close this screen and try again."
      );
    }
  }

  render() {
    return (
      <ProgressiveGenerateTracklistMutation>
        {(progressiveGenerateTracklist, { error }) => {
          if (this.state.triggerGenerateTracklist) {
            this.setState({ triggerGenerateTracklist: false }, () => {
              setTimeout(() => {
                this.progressiveGenerateTracklistWrapper(
                  progressiveGenerateTracklist
                );
              }, 1000);
            });
          }
          return (
            <View style={{ flex: 1 }}>
              <SubScreenContainer
                title={'Generate Tracklist'}
                contentContainerStyle={{
                  marginTop: 10,
                  flex: 1,
                  alignItems: 'center',
                }}
                modal
              >
                {this.renderGenerateStatus()}
                {this.renderCurrentlyGeneratingDisplay()}
                {this.renderAdmobBanner()}
              </SubScreenContainer>
              <DropdownAlert ref={ref => (this.dropdown = ref)} />
            </View>
          );
        }}
      </ProgressiveGenerateTracklistMutation>
    );
  }

  renderGenerateStatus() {
    return (
      <View>
        <Heading type={'h9'} alignment={'left'}>
          Generating Tracklist for:
        </Heading>
        <Heading type={'h4'} bold>
          {this.state.playroll.name}
        </Heading>
        <Progress.Bar
          indeterminate={true}
          borderWidth={1}
          borderColor={'black'}
          borderRadius={10}
          width={300}
          color={'purple'}
          height={20}
          style={{ marginVertical: 10 }}
        />
        <Heading type={'h9'} alignment={'right'} opacity={0.7}>
          Ad playing in 5...
        </Heading>
      </View>
    );
  }

  renderCurrentlyGeneratingDisplay() {
    const extractPlayroll = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return {};
      }
      return data.private.playroll;
    };
    return (
      <GetPlayrollQuery variables={{ id: this.state.playroll.id }}>
        {({ data }) => {
          const playroll = extractPlayroll(data);
          const remainingRolls = (playroll.rolls || []).slice(
            this.state.currentRollIndex
          );
          return (
            <View style={{ width: 325 }}>
              {!this.state.isComplete && remainingRolls.length >= 0 ? (
                <View>
                  <Heading type={'h9'} alignment={'left'} opacity={0.7}>
                    Now Generating:
                  </Heading>
                  <RollList
                    rolls={remainingRolls || []}
                    readOnly
                    disableManage
                  />
                </View>
              ) : (
                <Heading type={'h9'} alignment={'left'} opacity={0.7}>
                  Tracklist Generated!
                </Heading>
              )}
            </View>
          );
        }}
      </GetPlayrollQuery>
    );
  }

  renderAdmobBanner() {
    return <View />;
  }
}
