/**
 * Application component for Playroll mobile application.
 */

import React from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Button, Icon, SearchBar } from 'react-native-elements';

import NavigationService from '../../../services/NavigationService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  ListCurrentUserPlayrollsQuery,
  CreatePlayrollMutation,
} from '../../../graphql/requests/Playroll/';

import DetailedPlayrollCard from '../../shared/Cards/DetailedPlayrollCard';
import PlayrollCard from '../../shared/Cards/PlayrollCard';
import SubScreenHeader from '../../shared/Headers/SubScreenHeader';
import MainScreenContainer from '../../shared/Containers/MainScreenContainer';
import { Playroll } from '../../../graphql/types';
import Icons from '../../../themes/Icons';
import { LIST_CURRENT_USER_PLAYROLLS } from '../../../graphql/requests/Playroll/ListCurrentUserPlayrollsQuery';

import styles from './BrowsePlayrollsScreen.styles';
import FooterButton from '../../shared/Buttons/FooterButton';
import SearchSubHeader from '../../shared/SubHeaders/SearchSubHeader';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class BrowsePlayrollsScreen extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = {};
    this.renderHeader = this.renderHeader.bind(this);
  }

  render() {
    const extractPlayrolls = data => {
      if (
        !data ||
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listCurrentUserPlayrolls;
    };
    console.log('rerendered');
    return (
      <ListCurrentUserPlayrollsQuery variables={{ offset: 0, count: 20 }}>
        {({ loading, error, data, refetch, fetchMore }) => {
          const playrolls = extractPlayrolls(data);
          return (
            <View
              style={{
                flex: 1,
                // TODO(ianlizzo): Fix this pls
                // marginBottom: 30,
              }}
            >
              <View style={{ flex: 1 }}>
                <MainScreenContainer
                  contentContainerStyle={{ paddingBottom: hp('16%') }}
                  flatList
                  data={playrolls}
                  hideBottomBar
                  keyExtractor={item => item.id}
                  renderFlatListHeader={() => {
                    return <SearchSubHeader />;
                  }}
                  renderItem={({ item }) => {
                    const playroll = item as Playroll;
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          NavigationService.navigate('ViewPlayroll', {
                            managePlayroll: 'View Playroll',
                            playroll,
                          })
                        }
                      >
                        <DetailedPlayrollCard
                          playroll={playroll}
                          editPlayroll={() =>
                            NavigationService.navigate('EditPlayroll', {
                              managePlayroll: 'View Playroll',
                              playroll,
                            })
                          }
                          key={playroll.id}
                        />
                      </TouchableOpacity>
                    );
                  }}
                  refreshing={loading}
                  onRefresh={() => refetch()}
                  onEndReached={() => {
                    fetchMore({
                      variables: {
                        offset: playrolls.length,
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        const prevPlayrolls = extractPlayrolls(prev);
                        const fetchMorePlayrolls = extractPlayrolls(
                          fetchMoreResult
                        );
                        if (!fetchMoreResult) return prev;
                        return Object.assign({}, prev, {
                          private: {
                            listCurrentUserPlayrolls: [
                              ...prevPlayrolls,
                              ...fetchMorePlayrolls,
                            ],
                            __typename: 'PrivateQueryMethods',
                          },
                        });
                      },
                    });
                  }}
                  onEndReachedThreshold={0.5}
                >
                  {error && (
                    <Text style={{ paddingTop: 50 }}>
                      Error Loading Playrolls
                    </Text>
                  )}
                  {/* <View style={{ margin: 10 }} /> */}
                </MainScreenContainer>
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
          NavigationService.navigate('EditPlayroll', {
            playroll,
          });
        }}
        refetchQueries={() => [LIST_CURRENT_USER_PLAYROLLS]}
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
          NavigationService.navigate('EditPlayroll', {
            playroll,
          });
        }}
        refetchQueries={() => [LIST_CURRENT_USER_PLAYROLLS]}
      >
        {createPlayroll => {
          return (
            <FooterButton
              title={'Create New Playroll'}
              onPress={() => {
                createPlayroll();
              }}
            />
          );
        }}
      </CreatePlayrollMutation>
    );
  }
}
