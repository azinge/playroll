/**
 * MainScreenContainer
 */

import * as React from 'react';
import Collapsible from 'react-native-collapsible-header';
import { isIphoneX } from 'react-native-iphone-x-helper';
import MainScreenHeader from '../../Headers/MainScreenHeader';
import { StyleProp, ViewStyle, RefreshControl } from 'react-native';

interface HeaderProps {
  hideBottomBar?: boolean;
  hideSearchIcon?: boolean;
  disableBounce?: boolean;
}

interface ContainerProps extends HeaderProps {
  renderHeader?: () => JSX.Element;
  renderSubHeader?: () => JSX.Element;
  flatList?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  data?: any[];
  keyExtractor?: (item: any, i: number) => string;
  renderFlatListHeader?: () => JSX.Element;
  renderFlatListFooter?: () => JSX.Element;
  renderFlatListEmptyComponent?: () => JSX.Element;
  renderItem?: (obj: any) => any;
  refreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

interface Props extends ContainerProps {}

interface State {
  key: string;
}

export default class MainScreenContainer extends React.Component<Props, State> {
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
        max={45}
        min={isIphoneX() ? 48 : 20}
        backgroundColor={'purple'}
        renderHeader={
          this.props.renderHeader
            ? this.props.renderHeader()
            : this.renderHeader()
        }
        renderContent={this.renderContent()}
        bounces={!this.props.disableBounce}
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
        ListEmptyComponent={
          this.props.renderFlatListEmptyComponent
            ? this.props.renderFlatListEmptyComponent()
            : undefined
        }
        renderItem={this.props.renderItem}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={this.props.onEndReachedThreshold}
        {...this.getRefreshProps()}
      />
    );
  }
  renderHeader() {
    return (
      <MainScreenHeader
        hideBottomBar={this.props.hideBottomBar}
        hideSearchIcon={true}
      />
    );
  }
  renderContent() {
    return this.props.children;
  }
}
