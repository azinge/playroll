/**
 * SearchScreenContainer
 */

import * as React from 'react';
import Collapsible from 'react-native-collapsible-header';
import { isIphoneX } from 'react-native-iphone-x-helper';
import SearchScreenHeader from '../../Headers/SearchScreenHeader';
import { HeaderIconType } from '../../../../themes/Icons';
import { StyleProp, ViewStyle, RefreshControl } from 'react-native';

export interface HeaderProps {
  title?: string;
  icons?: HeaderIconType[];
  onChangeText?: (text: string) => void;
  onSubmitEditing?: (text: string) => void;
}

interface ContainerProps extends HeaderProps {
  renderHeader?: () => JSX.Element;
  flatList?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  data?: any[];
  keyExtractor?: (item: any, i: number) => string;
  renderFlatListHeader?: () => JSX.Element;
  renderFlatListFooter?: () => JSX.Element;
  renderItem?: (obj: any) => any;
  refreshing?: boolean;
  onRefresh?: () => void;
}

interface Props extends ContainerProps {}

interface State {
  key: string;
}

export default class SearchScreenContainer extends React.Component<
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
      <Collapsible
        key={this.state.key}
        max={45}
        min={isIphoneX() ? 48 : 20}
        backgroundColor={'purple'}
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
        ListHeaderComponent={
          this.props.renderFlatListHeader
            ? this.props.renderFlatListHeader()
            : undefined
        }
        ListFooterComponent={
          this.props.renderFlatListFooter
            ? this.props.renderFlatListFooter()
            : undefined
        }
        renderItem={this.props.renderItem}
        {...this.getRefreshProps()}
      />
    );
  }
  renderHeader() {
    return (
      <SearchScreenHeader
        title={this.props.title}
        icons={this.props.icons}
        onChangeText={this.props.onChangeText}
        onSubmitEditing={this.props.onSubmitEditing}
      />
    );
  }
  renderContent() {
    return this.props.children;
  }
}
