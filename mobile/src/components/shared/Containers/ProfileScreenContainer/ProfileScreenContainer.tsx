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
} from 'react-native';
import ProfileScreenHeader from '../../Headers/ProfileScreenHeader';
import { ListCurrentUserPlayrollsQuery } from '../../../../graphql/requests/Playroll';
import NavigationService from '../../../../services/NavigationService';
import { ListItem, Button } from 'react-native-elements';

interface HeaderProps {
  title?: string;
  modal?: boolean;
  icons?: HeaderIconType[];
  image?: any;
  local?: boolean;
  name?: string;
}

interface ContainerProps extends HeaderProps {
  renderHeader?: () => JSX.Element;
  flatList?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  data?: any[];
  keyExtractor?: (item: any, i: number) => string;
  renderItem?: (obj: any) => any;
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
  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ marginHorizontal: 20, marginBottom: 5, marginTop: 10 }}
      onPress={() =>
        NavigationService.navigate('ViewPlayroll', { playroll: item })
      }
    >
      <ListItem
        title={item.name}
        titleStyle={{ color: 'purple' }}
        subtitle={item.type}
        leftAvatar={{
          source: { uri: item.cover },
        }}
        containerStyle={{
          borderColor: 'white',
          borderRadius: 10,
          shadowColor: 'gray',
          shadowOffset: {
            width: 2,
            height: 1,
          },
          shadowRadius: 3,
          shadowOpacity: 0.2,
          overflow: 'visible',
        }}
      />
    </TouchableOpacity>
  )

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
          renderItem={this.props.renderItem}
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
        image={this.props.image}
        local={this.props.local}
      />
    );
  }
  renderContent() {
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
      <View
        style={{ width: '100%', top: 200, marginBottom: '35%', height: '80%' }}
      >
        <View style={{ alignItems: 'center' }}>
          <View style={{ alignItems: 'center', marginVertical: 10 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: '#993399',
                top: 5,
              }}
            >
              {this.props.name}
            </Text>
          </View>
          {
            <Button
              raised
              containerStyle={{ width: '50%' }}
              buttonStyle={{
                borderRadius: 80,
                height: 40,
                backgroundColor: this.props.local ? 'grey' : 'purple',
              }}
              title={this.props.local ? 'Find Friends' : 'Add Friend'}
              titleStyle={{ fontSize: 16 }}
            />
            /* <Button
                linearGradientProps={{
                  colors: ['#DA22FF', '#00c6ff'],
                  start: { x: 0 },
                  end: { x: 1 },
                }}
                containerStyle={{
                  borderRadius: 80,
                  width: '75%',
                  position: 'absolute',
                  top: 20,
                  // bottom: 5,
                  height: 50,
                }}
                buttonStyle={{ borderRadius: 80, height: 50 }}
                raised
                title={'Create New Playroll'}
                titleStyle={{ fontWeight: 'bold' }}
                onPress={() => {
                  // createPlayroll();
                }}
              /> */
          }
        </View>

        <ListCurrentUserPlayrollsQuery>
          {({ loading, error, data }) => {
            const playrolls = extractPlayrolls(data);
            const success = !loading && !error;
            return (
              <View
                style={
                  {
                    // flex: 1,
                    // paddingBottom: 50
                    // TODO(ianlizzo): Fix this pls
                  }
                }
              >
                <View style={{ paddingTop: 20 }}>
                  <FlatList
                    data={playrolls}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this._renderItem}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    // style={{height: '100%'}}
                  />
                  {loading && (
                    <ActivityIndicator
                      color={'gray'}
                      style={{ paddingTop: 50 }}
                    />
                  )}
                  {error && (
                    <Text style={{ paddingTop: 50 }}>
                      Error Loading Playrolls
                    </Text>
                  )}
                  {/* <View style={{ margin: 10 }} /> */}
                  {playrolls.length === 0 && <Text> No Playrolls added</Text>}
                </View>
              </View>
            );
          }}
        </ListCurrentUserPlayrollsQuery>
      </View>
    );
  }
}
