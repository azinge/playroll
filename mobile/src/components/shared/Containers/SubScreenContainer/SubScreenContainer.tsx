/**
 * SubScreenContainer
 */

import * as React from 'react';
import Collapsible from 'react-native-collapsible-header';
import { isIphoneX } from 'react-native-iphone-x-helper';
import SubScreenHeader from '../../Headers/SubScreenHeader';
import { HeaderIconType } from '../../../../themes/Icons';
import { SafeAreaView } from 'react-navigation';
import { ViewStyle, StyleProp } from 'react-native';

interface HeaderProps {
  title?: string;
  modal?: boolean;
  icons?: HeaderIconType[];
}

interface ContainerProps extends HeaderProps {
  renderHeader?: () => JSX.Element;
  flatList?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  data?: any[];
  keyExtractor?: (item: any, i: number) => string;
  renderItem?: (obj: any) => any;
  refreshing?: boolean;
  onRefresh?: () => void;
}

interface Props extends ContainerProps {}

interface State {
  key: string;
}

export default class SubScreenContainer extends React.Component<Props, State> {
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
    const {
      renderHeader,
      flatList,
      data,
      keyExtractor,
      renderItem,
    } = this.props;
    return (
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
        renderContent={this.renderContent()}
        contentContainerStyle={this.props.contentContainerStyle}
        flatList={this.props.flatList}
        data={this.props.data}
        keyExtractor={this.props.keyExtractor}
        renderItem={this.props.renderItem}
      />
    );
  }
  renderHeader() {
    return (
      <SubScreenHeader
        title={this.props.title}
        modal={this.props.modal}
        icons={this.props.icons}
      />
    );
  }
  renderContent() {
    return this.props.children;
  }
}
