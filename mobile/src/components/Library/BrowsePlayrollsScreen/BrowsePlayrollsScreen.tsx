/**
 * Application component for Playroll mobile application.
 */

import React from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Button } from 'react-native-elements';

import NavigationService from '../../../services/NavigationService';

import {
  ListCurrentUserPlayrollsQuery,
  CreatePlayrollMutation,
} from '../../../graphql/requests/Playroll/';

import DetailedPlayrollCard from '../../shared/Cards/DetailedPlayrollCard';
import PlayrollCard from '../../shared/Cards/PlayrollCard';
import SubScreenHeader from '../../shared/Headers/SubScreenHeader';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import { Playroll } from '../../../graphql/types';
import Icons from '../../../themes/Icons';
import { LIST_CURRENT_USER_PLAYROLLS } from '../../../graphql/requests/Playroll/ListCurrentUserPlayrollsQuery';

import styles from './BrowsePlayrollsScreen.styles';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  addPlayrollName: string;
}

export default class BrowsePlayrollsScreen extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      addPlayrollName: '',
    };
    this.renderHeader = this.renderHeader.bind(this);
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
          const playrolls = extractPlayrolls(data);
          const success = !loading && !error;
          return (
            <View
              style={{
                flex: 1,
                // TODO(ianlizzo): Fix this pls
                // marginBottom: 30,
              }}
            >
              <View style={{ flex: 1 }}>
                <SubScreenContainer
                  contentContainerStyle={{ paddingBottom: 120 }}
                  renderHeader={this.renderHeader}
                  flatList={success}
                  data={playrolls}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => {
                    const playroll = item as Playroll;
                    return (
                      <DetailedPlayrollCard
                        playroll={playroll}
                        editPlayroll={() =>
                          this.props.navigation &&
                          this.props.navigation.navigate('ViewPlayroll', {
                            managePlayroll: 'View Playroll',
                            playroll,
                          })
                        }
                        key={playroll.id}
                      />
                    );
                  }}
                >
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
                </SubScreenContainer>
                {/* {playrolls.length === 0 && <Text> No Playrolls added</Text>} */}
              </View>
              {this.renderNewPlayrollButton()}
            </View>
          );
        }}
      </ListCurrentUserPlayrollsQuery>
    );
  }

  renderHeader() {
    const extractPlayroll = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return null;
      }
      return data.private.createCurrentUserPlayroll;
    };
    return (
      <CreatePlayrollMutation
        variables={{
          input: { name: 'New Playroll' },
        }}
        onCompleted={data => {
          const playroll = extractPlayroll(data);
          NavigationService.navigate('ViewPlayroll', {
            playroll,
          });
        }}
        refetchQueries={[LIST_CURRENT_USER_PLAYROLLS]}
      >
        {createPlayroll => {
          const addPlayrollIcon = {
            ...Icons.addIcon,
            onPress: () => createPlayroll(),
          };
          return (
            <SubScreenHeader title={'My Playrolls'} icons={[addPlayrollIcon]} />
          );
        }}
      </CreatePlayrollMutation>
    );
  }
  renderNewPlayrollButton() {
    // return (
    const extractPlayroll = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return null;
      }
      return data.private.createCurrentUserPlayroll;
    };
    return (
      <CreatePlayrollMutation
        variables={{
          input: { name: 'New Playroll' },
        }}
        onCompleted={data => {
          const playroll = extractPlayroll(data);
          NavigationService.navigate('ViewPlayroll', {
            playroll,
          });
        }}
        refetchQueries={[LIST_CURRENT_USER_PLAYROLLS]}
      >
        {createPlayroll => {
          return (
            // <View style={styles.footerView}>
            //   <TouchableOpacity
            //     style={styles.newButton}
            //     onPress={() => {
            //       createPlayroll();
            //     }}
            //   >
            //     <Text style={styles.buttonText}>Create a Playroll</Text>
            //   </TouchableOpacity>
            // </View>
            <View
              style={{
                bottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
                // marginBottom: 20,
              }}
            >
              <Button
                linearGradientProps={{
                  colors: ['purple', '#4A00E0'],
                  start: { x: 0 },
                  end: { x: 1 },
                }}
                containerStyle={{
                  borderRadius: 80,
                  width: '75%',
                  position: 'absolute',
                  bottom: 5,
                  height: 50,
                }}
                buttonStyle={{ borderRadius: 80, height: 50 }}
                raised
                title={'Create New Playroll'}
                titleStyle={{ fontWeight: 'bold' }}
                onPress={() => {
                  createPlayroll();
                }}
              />
            </View>
          );
        }}
      </CreatePlayrollMutation>
    );
  }
}
