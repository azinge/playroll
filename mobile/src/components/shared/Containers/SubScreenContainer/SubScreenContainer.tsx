/**
 * SubScreenContainer
 */

import * as React from "react";
import Collapsible from "react-native-collapsible-header";
import { isIphoneX } from "react-native-iphone-x-helper";
import SubScreenHeader from "../../Headers/SubScreenHeader";
import { HeaderIconType } from "../../../../themes/Icons";
import { RefreshControl, View } from "react-native";

interface HeaderProps {
  title?: string;
  modal?: boolean;
  icons?: HeaderIconType[];
}

interface ContainerProps extends HeaderProps {
  renderHeader?: () => JSX.Element;
  flatList?: boolean;
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
      key: `${this.props.title},${this.props.flatList}`
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
        )
      };
    }
  }
  render() {
    const {
      renderHeader,
      flatList,
      data,
      keyExtractor,
      renderItem
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Collapsible
          key={this.state.key}
          max={45}
          min={isIphoneX() ? 41 : 19}
          backgroundColor={"purple"}
          renderHeader={renderHeader ? renderHeader() : this.renderHeader()}
          renderContent={this.renderContent()}
          flatList={flatList}
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          {...this.getRefreshProps()}
        />
      </View>
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
