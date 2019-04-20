/**
 * ProfileScreenContainer
 */

import * as React from 'react';
import Collapsible from 'react-native-collapsible-header';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { HeaderIconType } from '../../../../themes/Icons';
import { SafeAreaView } from 'react-navigation';
import {
  ViewStyle,
  StyleProp,
  Image,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import ProfileScreenHeader from '../../Headers/ProfileScreenHeader';
import { ListCurrentUserPlayrollsQuery } from '../../../../graphql/requests/Playroll';
import NavigationService from '../../../../services/NavigationService';
import { ListItem, Button } from 'react-native-elements';
import { Playroll } from '../../../../graphql/types';
import PlaceholderList from '../../Lists/PlaceholderList';

interface HeaderProps {
  title?: string;
  modal?: boolean;
  icons?: HeaderIconType[];
  image?: any;
  local?: boolean;
  name?: string;
  userID?: number;
}

interface ContainerProps extends HeaderProps {
  renderHeader?: () => JSX.Element;
  flatList?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  data?: any[];
  keyExtractor?: (item: any, i: number) => string;
  renderFlatListHeader?: () => JSX.Element;
  renderItem?: (obj: any) => any;
  refreshing?: boolean;
  onRefresh?: () => void;
}

interface Props extends ContainerProps {}

interface State {
  key: string;
}

export default class ProfileScreenContainer extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      key: `${this.props.title},${this.props.flatList}`,
    };
  }
  componentWillReceiveProps(nextProps, prevState) {
    const key = `${nextProps.title}${this.props.flatList}`;
    if (key !== prevState.key) {
      this.setState({ key });
    }
  }

  getRefreshProps() {
    const { flatList, refreshing, onRefresh } = this.props;
    if (!onRefresh) {
      return {};
    }
    if (flatList) {
      return { refreshing, onRefresh };
    } else {
      return {
        refreshControl: (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ),
      };
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Collapsible
          key={this.state.key}
          max={45}
          min={isIphoneX() ? 48 : 20}
          backgroundColor={'white'}
          renderHeader={
            this.props.renderHeader
              ? this.props.renderHeader()
              : this.renderHeader()
          }
          // renderContent={this.renderContent()}
          contentContainerStyle={this.props.contentContainerStyle}
          flatList={this.props.flatList}
          data={this.props.data}
          keyExtractor={this.props.keyExtractor}
          ListHeaderComponent={
            this.props.renderFlatListHeader
              ? this.props.renderFlatListHeader()
              : undefined
          }
          renderItem={this.props.renderItem}
          {...this.getRefreshProps()}
        />
        {this.renderContent()}
      </View>
    );
  }
  renderHeader() {
    return (
      <ProfileScreenHeader
        title={this.props.title}
        modal={this.props.modal}
        icons={this.props.icons}
        local={this.props.local}
      />
    );
  }
  renderContent() {
    return this.props.children;
  }
}
