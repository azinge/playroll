/**
 * AddToPlayrollScreen
 */

import * as React from 'react';
import { Text, ActivityIndicator, View } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import { ListCurrentUserRecommendationsQuery } from '../../../graphql/requests/Recommendation/ListCurrentUserRecommendationsQuery';
import RecommendationCard from '../../shared/Cards/RecommendationCard';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import PlayrollList from '../../shared/Lists/PlayrollList';
import { ListCurrentUserPlayrollsQuery } from '../../../graphql/requests/Playroll';
import NavigationService from '../../../services/NavigationService';
import { CreateRollMutation } from '../../../graphql/requests/Roll';
import DropdownAlert from 'react-native-dropdownalert';
import { NavigationScreenProp } from 'react-navigation';
import { RollData } from '../../../graphql/types';
import { GET_CURRENT_USER_PLAYROLL } from '../../../graphql/requests/Playroll/GetCurrentUserPlayrollQuery';
import SearchSubHeader from '../../shared/SubHeaders/SearchSubHeader';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  rollData: RollData;
}

export default class AddToPlayrollScreen extends React.Component<Props, State> {
  dropdown: DropdownAlert;

  constructor(props: Props) {
    super(props);

    this.state = {
      rollData: {},
    };
  }

  componentDidMount() {
    const rollData =
      this.props.navigation && this.props.navigation.getParam('rollData');
    this.setState({ rollData });
  }

  render() {
    const extractPlayrolls = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listCurrentUserPlayrolls;
    };
    return (
      <ListCurrentUserPlayrollsQuery>
        {({ loading, error, data }) => {
          let playrolls = [];
          if (!loading && !error) {
            playrolls = extractPlayrolls(data);
          }
          return (
            <View style={{ flex: 1 }}>
              <SubScreenContainer
                title={'My Recommendations'}
                contentContainerStyle={{ marginTop: 10 }}
                modal
              >
                <SearchSubHeader />
                {this.renderPlayrolls(playrolls)}
              </SubScreenContainer>
              <DropdownAlert ref={ref => (this.dropdown = ref)} />
            </View>
          );
        }}
      </ListCurrentUserPlayrollsQuery>
    );
  }

  async createRollWrapper(createRoll, playroll) {
    try {
      await createRoll({
        variables: {
          input: {
            playrollID: playroll.id,
            data: this.state.rollData,
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

  renderPlayrolls(playrolls) {
    return (
      <CreateRollMutation refetchQueries={[GET_CURRENT_USER_PLAYROLL]}>
        {(createRoll, { loading, error, data }) => {
          return (
            <PlayrollList
              playrolls={playrolls}
              onPress={playroll => {
                this.createRollWrapper(createRoll, playroll);
              }}
            />
          );
        }}
      </CreateRollMutation>
    );
  }
}
