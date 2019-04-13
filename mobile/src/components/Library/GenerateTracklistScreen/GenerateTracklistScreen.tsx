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
import { GenerateTracklistMutation } from '../../../graphql/requests/Tracklist';
import NavigationService from '../../../services/NavigationService';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  playroll: Playroll;
  triggerGenerateTracklist: boolean;
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

  async generateTracklistWrapper(generateTracklist) {
    const { playroll } = this.state;
    try {
      const result = await generateTracklist({
        variables: { playrollID: playroll.id },
      });
      NavigationService.navigate('ViewTracklist', {
        playrollName: playroll.name,
        tracklistID: result.data!.private.generateTracklist!.id,
      });
    } catch (err) {
      console.log(err);
      this.dropdown.alertWithType(
        'error',
        'Error',
        "We're sorry, Please try again."
      );
    }
  }

  render() {
    return (
      <GenerateTracklistMutation>
        {(generateTracklist, { error }) => {
          if (this.state.triggerGenerateTracklist) {
            this.setState({ triggerGenerateTracklist: false }, () => {
              this.generateTracklistWrapper(generateTracklist);
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
      </GenerateTracklistMutation>
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
    return (
      <View style={{ width: 325 }}>
        <PlaceholderList numItems={6} overlayText={'Coming Soon...'} />
      </View>
    );
  }

  renderAdmobBanner() {
    return <View />;
  }
}
